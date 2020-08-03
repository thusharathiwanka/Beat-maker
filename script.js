class DrumKit {
  constructor() {
    this.playBtn = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.beatsPerMin = 150;
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
          this.kickAudio.play();
          this.kickAudio.currentTime = 0;
        } else if (tile.classList.contains("snare-pad")) {
          this.snareAudio.play();
          this.kickAudio.currentTime = 0;
        } else if (tile.classList.contains("hihat-pad")) {
          this.hihatAudio.play();
          this.kickAudio.currentTime = 0;
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.beatsPerMin) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval);
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
});
