function initFX() {
  compressor = new Tone.Compressor({
    ratio: 12,
    threshold: -24,
    release: 0.25,
    attack: 0.003,
    knee: 30
  });
  compressor.connect(Tone.Master);
  reverb = new Tone.Freeverb().connect(compressor);
  delay = new Tone.PingPongDelay().connect(compressor);
  chorus = new Tone.Chorus().connect(compressor);
  fxSetting = {
    delayMix: 1,
    delayTime: 0.15,
    delayFeedback: 0.2,
    reverbMix: 1,
    reverbTime: 0.3,
    reverbDampening: 3000,
    chorusFreq: 3,
    chorusDelay: 3,
    chorusDepth: 1
  };

  delay.wet.value = fxSetting.delayMix;
  delay.delayTime.value = fxSetting.delayTime;
  delay.feedback.value = fxSetting.delayFeedback;
  reverb.wet.value = fxSetting.reverbMix;
  reverb.roomSize.value = fxSetting.reverbTime;
  reverb.dampening.value = fxSetting.reverbDampening;
  chorus.frequency.value = fxSetting.chorusFreq;
  chorus.delayTime = fxSetting.chorusDelay;
  chorus.depth = fxSetting.chorusDepth;
}

function initMeters() {
  for (let i = 0; i < 4; i++) {
    let meter = new Tone.Meter();
    meters.push(meter);
  }
}

function initMixer() {
  for (let i = 0; i < 4; i++) {
    let channel = new Tone.Channel();
    mixer.push(channel);
  }
}

function initSynths() {
  for (let i = 0; i < 4; i++) {
    let chorSend = new Tone.Gain(0);
    let delaySend = new Tone.Gain(0);
    let revSend = new Tone.Gain(0);
    chorSends.push(chorSend);
    delaySends.push(delaySend);
    revSends.push(revSend);
    let synth = new Tone.PolySynth(6, Tone.MonoSynth, {
      detune: 0,
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.3,
        release: 0.5
      },
      filter: {
        Q: 3,
        type: 'lowpass',
        rolloff: -24
      },
      filterEnvelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.5,
        release: 0.2,
        baseFrequency: 100,
        octaves: 4,
        exponent: 1
      }
    });
    // synth.chain(mixer[i], meters[i], chorus, delay, reverb);
    synth.chain(mixer[i], meters[i], compressor);
    synth.chain(chorSends[i], chorus);
    synth.chain(delaySends[i], delay);
    synth.chain(revSends[i], reverb);
    synths.push(synth);
  }
}

function initSeqs() {
  for (let i = 0; i < 4; i++) {
    let seq = new Sequencer(synths[i], i, mixer[i], chorSends[i], delaySends[i], revSends[i], -1000);
    sequencers.push(seq);
  }
}

function initText(){
  textGraphic = createGraphics(250, 100);
  textGraphic.fill(255);
  textGraphic.textFont(myFont);
  textGraphic.textAlign(CENTER);
  textGraphic.textSize(24);

  textGraphic2 = createGraphics(250, 100);
  textGraphic2.fill(255);
  textGraphic2.textFont(titleFont);
  textGraphic2.textAlign(LEFT);
  textGraphic2.textSize(18);

  titleText = createGraphics(500, 200);
  titleText.fill(50, 255, 155, 1);
  titleText.textFont(titleFont);
  titleText.textAlign(CENTER);
  titleText.textSize(48);
  titleText2 = createGraphics(500, 200);
  titleText2.fill(250, 55, 15, 1);
  titleText2.textFont(titleFont);
  titleText2.textAlign(CENTER);
  titleText2.textSize(48);
  titleText3 = createGraphics(500, 200);
  titleText3.fill(50, 255, 155, 1);
  titleText3.textFont(titleFontItalic);
  titleText3.textAlign(CENTER);
  titleText3.textSize(24);
  titleX = 500;
  instructionText = createGraphics(1000, 800);
  instructionText.fill(41, 222, 195, 250);
  instructionText.textFont(titleFont);
  instructionText.textAlign(LEFT);
  instructionText.textSize(18);
}