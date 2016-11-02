import BaseLfo from '../../common/core/BaseLfo';


const definitions = {
  audioBuffer: {
    type: 'any',
    default: null,
    constant: true,
  },
  frameSize: {
    type: 'integer',
    default: 512,
    constant: true,
  },
  channel: {
    type: 'integer',
    default: 0,
    constant: true,
  },
  progressCallback: {
    type: 'any',
    default: null,
    nullable: true,
    constant: true,
  },
  progressCallback: {
    type: 'any',
    default: null,
    nullable: true,
    constant: true,
  },
};

const noop = function() {};

/**
 * Slice an `AudioBuffer` into signal blocks and propagate the resulting frames
 * through the graph.
 *
 * @param {Object} options - Override parameter' default values.
 * @param {AudioBuffer} [options.audioBuffer] - Audio buffer to process.
 * @param {Number} [options.frameSize=512] - Size of the output blocks.
 * @param {Number} [options.channel=0] - Number of the channel to process.
 * @param {Number} [options.progressCallback=null] - Callback to be excuted on each
 *  frame output, receive as argument the current progress ratio.
 *
 * @memberof module:client.source
 *
 * @todo - Allow to pass raw buffer and sampleRate (simplified use server-side)
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioInBuffer = new lfo.source.AudioInBuffer({
 *   audioBuffer: audioBuffer,
 *   frameSize: 512,
 * });
 *
 * const waveform = new lfo.sink.Waveform({
 *   canvas: '#waveform',
 *   duration: 1,
 *   color: 'steelblue',
 *   rms: true,
 * });
 *
 * audioInBuffer.connect(waveform);
 * audioInBuffer.start();
 */
class AudioInBuffer extends BaseLfo {
  constructor(options = {}) {
    super(definitions, options);

    const audioBuffer = this.params.get('audioBuffer');

    if (!audioBuffer)
      throw new Error('Invalid "audioBuffer" parameter');

    this.endTime = 0;
  }

  /**
   * Propagate the `streamParams` in the graph and start propagating frames.
   * When called, the slicing of the given `audioBuffer` starts immediately and
   * each resulting frame is propagated in graph.
   *
   * @see {@link module:common.core.BaseLfo#processStreamParams}
   * @see {@link module:common.core.BaseLfo#resetStream}
   * @see {@link module:client.source.AudioInBuffer#stop}
   */
  start() {
    this.initStream();

    const channel = this.params.get('channel');
    const audioBuffer = this.params.get('audioBuffer');
    const buffer = audioBuffer.getChannelData(channel);
    this.endTime = 0;

    this.processFrame(buffer);
  }

  /**
   * Finalize the stream and stop the whole graph. When called, the slicing of
   * the `audioBuffer` stops immediately.
   *
   * @see {@link module:common.core.BaseLfo#finalizeStream}
   * @see {@link module:client.source.AudioInBuffer#start}
   */
  stop() {
    this.finalizeStream(this.endTime);
  }

  /** @private */
  processStreamParams() {
    const audioBuffer = this.params.get('audioBuffer');
    const frameSize = this.params.get('frameSize');
    const sourceSampleRate = audioBuffer.sampleRate;
    const frameRate = sourceSampleRate / frameSize;

    this.streamParams.frameSize = frameSize;
    this.streamParams.frameRate = frameRate;
    this.streamParams.frameType = 'signal';
    this.streamParams.sourceSampleRate = sourceSampleRate;
    this.streamParams.sourceSampleCount = frameSize;

    this.propagateStreamParams();
  }

  /** @private */
  processFrame(buffer) {
    const sampleRate = this.streamParams.sourceSampleRate;
    const frameSize = this.streamParams.frameSize;
    const progressCallback = this.params.get('progressCallback') || noop;
    const length = buffer.length;
    const nbrFrames = Math.ceil(buffer.length / frameSize);
    const data = this.frame.data;
    const that = this;
    let i = 0;

    (function slice() {
      const offset = i * frameSize;
      const nbrCopy = Math.min(length - offset, frameSize);

      for (let j = 0; j < frameSize; j++)
        data[j] = j < nbrCopy ? buffer[offset + j] : 0;

      that.frame.time = offset / sampleRate;
      that.endTime = that.frame.time + nbrCopy / sampleRate;
      that.propagateFrame();

      i += 1;
      progressCallback(i / nbrFrames);

      if (i < nbrFrames)
        setTimeout(slice, 0);
      else
        that.finalizeStream(that.endTime);
    }());
  }
}

export default AudioInBuffer;
