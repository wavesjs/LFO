import BaseLfo from '../core/BaseLfo';
import FFT from './FFT';
import Mel from './Mel';
import DCT from './DCT';


const definitions = {
  nbrBands: {
    type: 'integer',
    default: 24,
    meta: { kind: 'static' },
  },
  nbrCoefs: {
    type: 'integer',
    default: 12,
    meta: { kind: 'static' },
  },
  minFreq: {
    type: 'float',
    default: 0,
    meta: { kind: 'static' },
  },
  maxFreq: {
    type: 'float',
    default: null,
    nullable: true,
    meta: { kind: 'static' },
  }
};


/**
 * Compute the MFCC of the incomming `signal`. Is basically a wrapper around
 * [`FFT`]{@link module:common.operator.FFT}, [`Mel`]{@link module:common.operator.Mel}
 * and [`DCT`]{@link module:common.operator.DCT}.
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {nbrBands} [options.nbrBands=24] - Number of Mel bands.
 * @param {nbrCoefs} [options.nbrCoefs=12] - Number of output coefs.
 *
 * @see {@link module:common.operator.FFT}
 * @see {@link module:common.operator.Mel}
 * @see {@link module:common.operator.DCT}
 *
 * @example
 * import lfo from 'waves-lfo/node'
 *
 * const audioInFile = new lfo.source.AudioInFile({
 *   filename: 'path/to/file',
 *   frameSize: 512,
 * });
 *
 * const slicer = new lfo.operator.Slicer({
 *   frameSize: 256,
 * });
 *
 * const mfcc = new lfo.operator.MFCC({
 *   nbrBands: 24,
 *   nbrCoefs: 12,
 * });
 *
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * audioInFile.connect(slicer);
 * slicer.connect(mfcc);
 * mfcc.connect(logger);
 *
 * audioInFile.start();
 */
class MFCC extends BaseLfo {
  constructor(options) {
    super(definitions, options);
  }

  /** @private */
  processStreamParams(prevStreamParams) {
    this.prepareStreamParams(prevStreamParams);

    const nbrBands = this.params.get('nbrBands');
    const nbrCoefs = this.params.get('nbrCoefs');
    const minFreq = this.params.get('minFreq');
    const maxFreq = this.params.get('maxFreq');
    const inputFrameSize = prevStreamParams.frameSize;
    const inputFrameRate = prevStreamParams.frameRate;
    const inputSampleRate = prevStreamParams.sourceSampleRate;
    const nbrBins = inputFrameSize / 2 + 1;

    this.streamParams.frameSize = nbrCoefs;
    this.streamParams.frameType = 'vector';
    this.streamParams.description = [];

    this.fft = new FFT({
      window: 'hann',
      mode: 'power',
      norm: 'power',
      size: inputFrameSize,
    });

    this.mel = new Mel({
      nbrBands: nbrBands,
      log: true,
      power: 1,
      minFreq: minFreq,
      maxFreq: maxFreq,
    });

    this.dct = new DCT({
      order: nbrCoefs,
    });

    // init streams
    this.fft.initStream({
      frameType: 'signal',
      frameSize: inputFrameSize,
      frameRate: inputFrameRate,
      sourceSampleRate: inputSampleRate,
    });

    this.mel.initStream({
      frameType: 'vector',
      frameSize: nbrBins,
      frameRate: inputFrameRate,
      sourceSampleRate: inputSampleRate,
    });

    this.dct.initStream({
      frameType: 'vector',
      frameSize: nbrBands,
      frameRate: inputFrameRate,
      sourceSampleRate: inputSampleRate,
    });

    this.propagateStreamParams();
  }

  /**
   * Use the `MFCC` operator in `standalone` mode (i.e. outside of a graph).
   *
   * @param {Array} data - Signal chunk to analyse.
   * @return {Array} - MFCC coefficients.
   *
   * @example
   * const mfcc = new lfo.operator.MFCC();
   * // mandatory for use in standalone mode
   * mfcc.initStream({ frameSize: 256, frameType: 'vector' });
   * mfcc.inputSignal(signal);
   */
  inputSignal(data) {
    const output = this.frame.data;
    const nbrCoefs = this.params.get('nbrCoefs');

    const bins = this.fft.inputSignal(data);
    const melBands = this.mel.inputVector(bins);
    // console.log(melBands);
    const coefs = this.dct.inputSignal(melBands);

    for (let i = 0; i < nbrCoefs; i++)
      output[i] = coefs[i];

    return output;
  }

  /** @private */
  processSignal(frame) {
    this.inputSignal(frame.data);
  }
}

export default MFCC;
