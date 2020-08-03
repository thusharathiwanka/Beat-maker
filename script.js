class DrumKit {
  constructor() {
    this.playBtn = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/kick-acoustic.wav";
    this.currentHihat = "./sounds/kick-acoustic.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".temp-slider");
    this.index = 0;
    this.beatsPerMin = 150;
    this.isPlaying = null;
    this.isMuted = null;
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
        //Checking sound types and adding source to audio
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
      this.playBtn.classList.remove("active");
    } else {
      this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      this.playBtn.classList.add("active");
    }
  }

  changeSound(event) {
    const selectedName = event.target.name;
    const selectedValue = event.target.value;

    if (selectedName == "kick-select") {
      this.kickAudio.src = selectedValue;
    } else if (selectedName == "snare-select") {
      this.snareAudio.src = selectedValue;
    } else if (selectedName == "hihat-select") {
      this.hihatAudio.src = selectedValue;
    }
  }

  muteSound(event) {
    const muteIndex = event.target.getAttribute("data-track");
    event.target.classList.toggle("active");

    //Changing mute button icons
    if (this.isMuted == null && event.target.classList.contains("active")) {
      this.muteBtns[muteIndex].innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
      this.muteBtns[muteIndex].innerHTML = '<i class="fas fa-volume-up"></i>';
    }

    if (event.target.classList.contains("active")) {
      if (muteIndex == 0) {
        this.kickAudio.volume = 0;
      } else if (muteIndex == 1) {
        this.snareAudio.volume = 0;
      } else if (muteIndex == 2) {
        this.hihatAudio.volume = 0;
      }
    } else {
      if (muteIndex == 0) {
        this.kickAudio.volume = 1;
      } else if (muteIndex == 1) {
        this.snareAudio.volume = 1;
      } else if (muteIndex == 2) {
        this.hihatAudio.volume = 1;
      }
    }
  }

  changeTempo(event) {
    const tempoNumber = document.querySelector(".tempo-number");
    this.beatsPerMin = event.target.value;
    tempoNumber.innerText = event.target.value;
  }

  updateTempo(event) {
    clearInterval(this.isPlaying);
    this.isPlaying = null;

    const playBtn = document.querySelector(".play");

    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}
const drumKit = new DrumKit();

//Event listeners
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

drumKit.selects.forEach((select) => {
  select.addEventListener("change", (event) => {
    drumKit.changeSound(event);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    drumKit.muteSound(event);
    drumKit.updateBtn();
  });
});

drumKit.tempoSlider.addEventListener("input", (event) => {
  drumKit.changeTempo(event);
});

drumKit.tempoSlider.addEventListener("change", (event) => {
  drumKit.updateTempo(event);
});
