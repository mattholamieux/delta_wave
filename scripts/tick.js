class Tick {
  constructor(x, y, w, h, note, synth, dur, vel, synthOpts, kord) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.newX = 0;
    this.angle = 0;
    this.note = note;
    this.kord = kord;
    this.synth = synth;
    this.dur = dur;
    this.vel = vel;
    this.param1 = 0.01;
    this.param2 = 0.01;
    this.synthOpts = synthOpts;
    this.trigger = true;
  }

  show(spaceBetween) {
    push();
    rotateZ(this.angle);
    translate(spaceBetween, this.y);
    stroke(255);
    fill(255, 255, 255, 150);
    box(this.w, this.h);
    pop();
  }


  passSliderVals(opts) {
    this.synthOpts = opts;
  }


  move(other, time) {
    let maxX = other.pattern.length;
    this.angle += 2 * PI / other.pattern.length;
    if (other.pattern[this.newX] == 1) {
      for (let i=0; i<activeTicks.length;i++){
        if (this.note === activeTicks[i]){
          this.trigger = false;
        }
      }
      activeTicks.push(this.note);
      if (this.trigger){
        this.synth.set(this.synthOpts);
        if(this.kord === true){
          this.synth.triggerAttackRelease(chords[this.note], this.dur, time, this.vel);
        } else {
        this.synth.triggerAttackRelease(notes[this.note], this.dur, time, this.vel);
        }
      }
      // this.synth.set(this.synthOpts);
      // if(this.kord === true){
      //   this.synth.triggerAttackRelease(chords[this.note], this.dur, time, this.vel);
      // } else {
      // this.synth.triggerAttackRelease(notes[this.note], this.dur, time, this.vel);
      // }
    }
    this.newX += 1;
    if (this.newX >= maxX) {
      this.newX = 0;
    }
    this.trigger = true;
  }


}