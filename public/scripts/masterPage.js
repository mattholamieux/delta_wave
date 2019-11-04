
function toggleMasterPage() {
push();
  if (keyWentDown(16)){
    if (firstPress){
      if (!masterPage) {
        master.selector.y = -250;
        selectedSequencer = 0; //select sequencer using slider
        for (s of sequencers) {
          s.isSelected = false; //unselect all sequences
        }
        sequencers[selectedSequencer].isSelected = true;
        zoomTarget = 0; //set zoom target to selected sequencer
      }
      if (!synthPage && !masterPage2 && !startPage) {
        masterPage = !masterPage;
      }
    } else {
      firstPress = true;
      setTimeout(function() {
        firstPress = false;
      }, 500);
    }
  }


  if (masterPage) {
    if (keyWentDown(74)) {
      masterPage2 = !masterPage2;
      master.selector.y = -250;
    }
    if (masterPage2) {
      push();
      fill(100, 100, 20, 100);
      box(900, 600, 10);
      pop();
    } else {
      push();
      fill(100, 20, 100, 100);
      box(900, 600, 10);
      pop();
    }
    master.doSliderStuff();
    master.assignSliders();
    // translate(-currentZoom + 1500, 0, -2000);
  }
pop();
}

function keySet(scale, mode, numOctaves) {
  for (let i = 1; i < numOctaves; i++) {
    let singleOctave = getScaleRange(scale, mode, i);
    for (let k = 0; k < singleOctave.length; k++) {
      notes.push(singleOctave[k]);
    }
  }

  for (let j = 0; j < 7; j++) {
    let myChord = getChordbyDegree(scale, mode, 3, j);
    chords.push(myChord);
  }
}
