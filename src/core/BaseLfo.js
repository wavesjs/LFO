import parameters from 'parameters';

let id = 0;

/**
 * Base `lfo` class to be extended in order to create new nodes.
 *
 * Nodes are divided in 3 categories:
 * - **`source`** are responsible for acquering a signal and its properties
 *   (frameRate, frameSize, etc.)
 * - **`sink`** are endpoints of the graph, such nodes can be recorders,
 *   visualizers, etc.
 * - **`operator`** are used to make computation on the input signal and
 *   forward the results below in the graph.
 *
 * In most cases the methods to override / extend are:
 * - the **`constructor`** to define the parameters of the new lfo node.
 * - the **`processStreamParams`** method to define how the node modify the
 *   stream attributes (e.g. by changing the frame size)
 * - the **`process{FrameType}`** method to define the operations that the
 *   node apply on the stream. The type of input a node can handle is define
 *   by its implemented interface, if it implements `processSignal` a stream
 *   with `frameType === 'signal'` can be processed, `processVector` to handle
 *   an input of type `vector`.
 *
 * <span class="warning">_This class should be considered abstract and only
 * be used to be extended._</span>
 *
 * @memberof module:core
 */
class BaseLfo {
  constructor(definitions = {}, options = {}) {
    this.cid = id++;

    /**
     * Parameter bag containing parameter instances.
     *
     * @type {Object}
     * @name params
     * @instance
     * @memberof module:core.BaseLfo
     */
    this.params = parameters(definitions, options);
    // listen for param updates
    this.params.addListener(this.onParamUpdate.bind(this));

    /**
     * Description of the stream output of the node.
     * Set to `null` when the node is destroyed.
     *
     * @type {Object}
     * @property {Number} frameSize - Frame size at the output of the node.
     * @property {Number} frameRate - Frame rate at the output of the node.
     * @property {String} frameType - Frame type at the output of the node,
     *  possible values are `signal`, `vector` or `scalar`.
     * @property {Number} sourceSampleRate - Sample rate of the source of the
     *  graph. _The value should be defined by sources and never modified_.
     * @property {Array|String} description - If type is `vector`, describe
     *  the dimension(s) of output stream.
     * @name streamParams
     * @instance
     * @memberof module:core.BaseLfo
     */
    this.streamParams = {
      frameType: null,
      frameSize: 1,
      frameRate: 0,
      sourceSampleRate: 0,
      description: null,
    };

    /**
     * Current frame. This object and its data are updated at each incomming
     * frame without reallocating memory.
     *
     * @type {Object}
     * @name frame
     * @property {Number} time - Time of the current frame.
     * @property {Float32Array} data - Data of the current frame.
     * @property {Object} metadata - Metadata associted to the current frame.
     * @instance
     * @memberof module:core.BaseLfo
     */
    this.frame = {
      time: 0,
      data: null,
      metadata: {},
    };

    /**
     * List of nodes connected to the ouput of the node (lower in the graph).
     * At each frame, the node forward its `frame` to to all its `nextOps`.
     *
     * @type {Array<BaseLfo>}
     * @name nextOps
     * @instance
     * @memberof module:core.BaseLfo
     * @see {@link module:core.BaseLfo#connect}
     * @see {@link module:core.BaseLfo#disconnect}
     */
    this.nextOps = [];

    /**
     * The node from which the node receive the frames (upper in the graph).
     *
     * @type {BaseLfo}
     * @name prevOp
     * @instance
     * @memberof module:core.BaseLfo
     * @see {@link module:core.BaseLfo#connect}
     * @see {@link module:core.BaseLfo#disconnect}
     */
    this.prevOp = null;

    /**
     * When set to `true` the sub-graph starting at the current node is
     * reinitialized on the next incomming frame. This attribute is set to
     * `true` when a static parameter is updated.
     *
     * @type {Boolean}
     * @name _reinit
     * @instance
     * @memberof module:core.BaseLfo
     * @private
     */
    this._reinit = false;
  }

  /**
   * Returns an object describing each available parameter of the node.
   *
   * @return {Object}
   */
  getParamsDescription() {
    return this.params.getDefinitions();
  }

  /**
   * Reset all parameters to their initial value (as defined on instantication)
   */
  resetParams() {
    this.params.reset();
  }

  /**
   * Function called when a param is updated. By default set the `_reinit`
   * flag to `true` if the param is `static` one. This method should be
   * extended to handle particular logic bound to a specific parameter.
   *
   * @param {String} name - Name of the parameter.
   * @param {Mixed} value - Value of the parameter.
   * @param {Object} metas - Metadata associated to the parameter.
   */
  onParamUpdate(name, value, metas = {}) {
    if (metas.kind === 'static')
      this._reinit = true;
  }

  /**
   * Connect the current node (`prevOp`) to another node (`nextOp`).
   * A given node can be connected to several operators and propagate the
   * stream to each of them.
   *
   * @param {BaseLfo} next - Next operator in the graph.
   * @see {@link module:core.BaseLfo#process}
   * @see {@link module:core.BaseLfo#disconnect}
   */
  connect(next) {
    if (!(next instanceof BaseLfo))
      throw new Error('Invalid connection: child node is not an instance of `BaseLfo`');

    if (this.streamParams === null ||next.streamParams === null)
      throw new Error('Invalid connection: cannot connect a dead node');

    this.nextOps.push(next);
    next.prevOp = this;

    if (this.streamParams.frameType !== null) // graph has already been started
      next.processStreamParams(this.streamParams);
  }

  /**
   * Remove the given operator from its previous operators' `nextOps`.
   *
   * @param {BaseLfo} [next=null] - The operator to disconnect from the current
   *  operator. If `null` disconnect all the next operators.
   */
  disconnect(next = null) {
    if (next === null) {
      this.nextOps.forEach((next) => this.disconnect(next));
    } else {
      const index = this.nextOps.indexOf(this);
      this.nextOps.splice(index, 1);
      next.prevOp = null;
    }
  }

  /**
   * Destroy all the nodes in the sub-graph starting from the current node.
   * When detroyed, the `streamParams` of the node are set to `null`, the
   * operator is then considered as `dead` and cannot be reconnected.
   *
   * @see {@link module:core.BaseLfo#connect}
   */
  destroy() {
    // destroy all chidren
    let index = this.nextOps.length;

    while (index--)
      this.nextOps[index].destroy();

    // disconnect itself from the previous operator
    if (this.prevOp)
      this.prevOp.disconnect(this);

    // mark the object as dead
    this.streamParams = null;
  }

  /**
   * Reset the `frame.data` buffer by setting all its values to 0.
   * A source operator should call `processStreamParams` and `resetStream` when
   * started, each of these method propagate through the graph automaticaly.
   *
   * @see {@link module:core.BaseLfo#processStreamParams}
   */
  resetStream() {
    // buttom up
    for (let i = 0, l = this.nextOps.length; i < l; i++)
      this.nextOps[i].resetStream();

    // no buffer for `scalar` type or sink node
    if (this.streamParams.frameType !== 'scalar' && this.frame.data !== null)
      this.frame.data.fill(0);
  }

  /**
   * Finalize the stream. A source node should call this method when stopped,
   * `finalizeStream` is automatically propagated throught the graph.
   *
   * @param {Number} endTime - Logical time at which the graph is stopped.
   */
  finalizeStream(endTime) {
    for (let i = 0, l = this.nextOps.length; i < l; i++)
      this.nextOps[i].finalizeStream(endTime);
  }

  /**
   * Initialize or update the operator's `streamParams` according to the
   * previous operators `streamParams` values.
   *
   * When implementing a new operator this method should:
   * 1. call `this.prepareStreamParams` with the given `prevStreamParams`
   * 2. optionnally change values to `this.streamParams` according to the
   *    logic performed by the operator.
   * 3. optionnally allocate memory for ring buffers, etc.
   * 4. call `this.propagateStreamParams` to trigger the method on the next
   *    operators in the graph.
   *
   * @param {Object} prevStreamParams - `streamParams` of the previous operator.
   *
   * @see {@link module:core.BaseLfo#prepareStreamParams}
   * @see {@link module:core.BaseLfo#propagateStreamParams}
   */
  processStreamParams(prevStreamParams = {}) {
    this.prepareStreamParams(prevStreamParams);
    this.propagateStreamParams();
  }

  /**
   * Common logic to do at the beginning of the `processStreamParam`, must be
   * called at the beginning of any `processStreamParam` implementation.
   *
   * The method mainly check if the current node implement the interface to
   * handle the type of frame propagated by it's parent:
   * - to handle a `vector` frame type, the class must implement `processVector`
   * - to handle a `signal` frame type, the class must implement `processSignal`
   * - in case of a 'scalar' frame type, the class can implement any of the
   * following by order of preference: `processScalar`, `processVector`,
   * `processSignal`.
   *
   * @param {Object} prevStreamParams - `streamParams` of the previous operator.
   *
   * @see {@link module:core.BaseLfo#processStreamParams}
   * @see {@link module:core.BaseLfo#propagateStreamParams}
   */
  prepareStreamParams(prevStreamParams = {}) {
    Object.assign(this.streamParams, prevStreamParams);
    const prevFrameType = prevStreamParams.frameType;

    switch (prevFrameType) {
      case 'scalar':
        if (this.processScalar)
          this.processFunction = this.processScalar;
        else if (this.processVector)
          this.processFunction = this.processVector;
        else if (this.processSignal)
          this.processFunction = this.processSignal;
        else
          throw new Error(`${this.constructor.name} - no "process" function found`);
        break;
      case 'vector':
        if (!('processVector' in this))
          throw new Error(`${this.constructor.name} - "processVector" is not defined`);

        this.processFunction = this.processVector;
        break;
      case 'signal':
        if (!('processSignal' in this))
          throw new Error(`${this.constructor.name} - "processSignal" is not defined`);

        this.processFunction = this.processSignal;
        break;
      default:
        // defaults to processFunction
        break;
    }
  }

  /**
   * Create the `this.frame.data` buffer and forward the operator's `streamParam`
   * to all its next operators, must be called at the end of any
   * `processStreamParams` implementation.
   *
   * @see {@link module:core.BaseLfo#processStreamParams}
   * @see {@link module:core.BaseLfo#prepareStreamParams}
   */
  propagateStreamParams() {
    this.frame.data = new Float32Array(this.streamParams.frameSize);

    for (let i = 0, l = this.nextOps.length; i < l; i++)
      this.nextOps[i].processStreamParams(this.streamParams);
  }

  /**
   * Define the particular logic the operator applies to the stream.
   * According to the frame type of the previous node, the method calls one
   * of the following method `processVector`, `processSignal` or `processScalar`
   *
   * @param {Object} frame - Frame (time, data, and metadata) as given by the
   *  previous operator. The incomming frame should never be modified by
   *  the operator.
   *
   * @see {@link module:core.BaseLfo#prepareFrame}
   * @see {@link module:core.BaseLfo#propagateFrame}
   * @see {@link module:core.BaseLfo#processStreamParams}
   */
  processFrame(frame) {
    this.prepareFrame();

    // frameTime and frameMetadata defaults to identity
    this.frame.time = frame.time;
    this.frame.metadata = frame.metadata;

    this.processFunction(frame);
    this.propagateFrame();
  }

  /**
   * Pointer to the method called in `processFrame` according to the
   * frame type of the previous operator. Is dynamically assigned in
   * `prepareStreamParams`.
   *
   * @see {@link module:core.BaseLfo#prepareStreamParams}
   * @see {@link module:core.BaseLfo#processFrame}
   */
  processFunction(frame) {
    this.frame = frame;
  }

  /**
   * Common logic to perform at the beginning of the `processFrame`.
   *
   * @see {@link module:core.BaseLfo#processFrame}
   */
  prepareFrame() {
    if (this._reinit === true) {
      this.processStreamParams();
      this.resetStream();
      this._reinit = false;
    }
  }

  /**
   * Forward the current `frame` to the next operators, is called at the end of
   * `processFrame`.
   *
   * @see {@link module:core.BaseLfo#processFrame}
   */
  propagateFrame() {
    for (let i = 0, l = this.nextOps.length; i < l; i++)
      this.nextOps[i].processFrame(this.frame);
  }
}

export default BaseLfo;

