class DrumKit {
  constructor() {
    this.playBtn = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.beatsPerMin = 150;
    this.isPlaying = null;
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    const activeTiles = document.querySelectorAll(`.tile${step}`);
    //Looping through pads
    activeTiles.forEach((tile) => {
      tile.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

      //Checking for active pads
      if (tile.classList.contains("active")) {
        //Checking sound types
        if (tile.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        } else if (tile.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        } else if (tile.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.beatsPerMin) * 1000;

    //Checking if playing
    if (this.isPlaying == null) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      //Clearing interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  updateBtn() {
    if (this.isPlaying == null) {
      this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", () => {
    pad.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.start();
  drumKit.updateBtn();
});
