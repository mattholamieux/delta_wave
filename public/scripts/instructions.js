
function toggleInstructions() {
  if (keyWentDown(13)) {
    if (!startPage) {
      instructions = !instructions;
      instructionsFirstTime = false;
    }
  }
}
function keyPressed(){
  if (instructionsFirstTime){
    loop();
  }
}

function showInstructions() {
  if (instructions) {
    if (instructionsFirstTime){
      noLoop();
    instructionText.background(0,0,0,0);
    instructionText.text('press Enter on any page to view instructions', 250, 500);
  } else {
    instructionText.background(0);
  }
      instructionText.fill(255);
    if (synthPage){
      push();
      instructionText.text('wasd: change sliders', 250, 200);
      instructionText.text('j: change oscillator', 250, 225);
      instructionText.text('K: change filter', 250, 250);
      instructionText.text('l: toggle chord mode', 250, 275);
      instructionText.text('Shift+L: return to sequencer', 250, 300);
      rotateX(-xRot);
      translate(0,80,200);
      texture(instructionText);
      plane(1000, 800);
      pop();
    } else if (masterPage){
    translate(currentZoom - 1500, 0, 2000);
      if (masterPage2){
        push();
        instructionText.text('J: FX controls', 250, 300);
        instructionText.text('K: scale mode', 250, 325);
        translate(0,80,200);
        texture(instructionText);
        plane(1000, 800);
        pop();
      } else {
        push();
        instructionText.text('J: master controls', 250, 300);
        instructionText.text('2x shift: return to sequencer', 250, 325);
        translate(0,80,200);
        texture(instructionText);
        plane(1000, 800);
        pop();
      }
    }else {
      push();
      instructionText.text('J: create ring', 250, 150);
      instructionText.text('Shift+J: change ring speed', 250, 175);
      instructionText.text('K: create trigger', 250, 200);
      instructionText.text('Shift+K: remove trigger', 250, 225);
      instructionText.text('L: select ring', 250, 250);
      instructionText.text('Shift+L: view synth params', 250, 275);
      instructionText.text('a d: change sequencer', 250, 300);
      instructionText.text('w s: add/remove steps', 250, 325);
      instructionText.text('2x shift: FX controls', 250, 350);
      // instructionText.text('press Enter on any page to view instructions', 250, 500);
      translate(0,80,200);
      texture(instructionText);
      plane(1000, 800);
      pop();
    }
  }
}

function showText() {
  if (masterPage) {
    if (!masterPage2) {
      if (master.selector.y === -250 || master.selector.y === -251 || master.selector.y === 100 || master.selector.y === 101) {
        message = 'volume';
      } else if (master.selector.y === -200 || master.selector.y === -201 || master.selector.y === 150 || master.selector.y === 151) {
        message = 'chorus send';
      } else if (master.selector.y === -150 || master.selector.y === -151 || master.selector.y === 200 || master.selector.y === 201) {
        message = 'delay send';
      } else if (master.selector.y === -100 || master.selector.y === -101 || master.selector.y === 250 || master.selector.y === 251) {
        message = 'reverb send';
      }
    } else {
      if (master.selector.y === -250) {
        message = 'chorus frequency';
      } else if (master.selector.y === -200) {
        message = 'chorus delay';
      } else if (master.selector.y === -150) {
        message = 'delay time';
      } else if (master.selector.y === -100) {
        message = 'delay feedback';
      } else if (master.selector.y === 100) {
        message = 'reverb size';
      } else if (master.selector.y === 150) {
        message = 'reverb dampening';
      } else if (master.selector.y === 200) {
        if (master.modeCounter === 0) {
          message = 'scale (major)';
        } else {
          message = 'scale (minor)';
        }
      } else if (master.selector.y === 250) {
        message = 'tempo';
      }

    }
    push();
    textGraphic.text(message, 125, 50);
    translate(0, 0, 200);
    texture(textGraphic);
    plane(250, 100);
    textGraphic.background(0);
    pop();
  }

  if (synthPage) {
    textGraphic.textSize(18);
    let trans = 0;
    if (sequencers[selectedSequencer].selector.z === 250) {
      message = 'pitch';
      trans = 250;
    } else if (sequencers[selectedSequencer].selector.z === 200) {
      message = 'velocity';
      trans = 200;
    } else if (sequencers[selectedSequencer].selector.z === 150) {
      message = 'attack';
      trans = 150;
    } else if (sequencers[selectedSequencer].selector.z === 100) {
      message = 'sustain';
      trans = 100;
    } else if (sequencers[selectedSequencer].selector.z === 50) {
      message = 'release';
      trans = 50;
    } else if (sequencers[selectedSequencer].selector.z === -50) {
      message = 'base freq';
      trans = -50;
    } else if (sequencers[selectedSequencer].selector.z === -100) {
      message = 'target freq';
      trans = -100;
    } else if (sequencers[selectedSequencer].selector.z === -150) {
      message = 'resonance';
      trans = -150;
    } else if (sequencers[selectedSequencer].selector.z === -200) {
      message = 'filt attack';
      trans = -200;
    } else if (sequencers[selectedSequencer].selector.z === -250) {
      message = 'filt release';
      trans = -250;
    }
    push();
    rotateX(xRot);
    if (xRot > 1.3) {
      textGraphic.text(message, 125, 50);
      translate(230, 0, 260);
      texture(textGraphic);
      rotateX(-xRot);
      plane(250, 100);
      textGraphic.background(0);
    }
    pop();
  }
}