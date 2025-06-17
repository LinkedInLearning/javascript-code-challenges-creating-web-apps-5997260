const hungerEl = document.getElementById("hunger");
const energyEl = document.getElementById("energy");
const happinessEl = document.getElementById("happiness");
const petImage = document.getElementById("petImage");

const feedBtn = document.getElementById("feedBtn");
const playBtn = document.getElementById("playBtn");
const restBtn = document.getElementById("restBtn");

let hunger = 5;
let energy = 5;
let happiness = 5;

function clampStat(value) {
  return Math.max(0, Math.min(10, value));
}

function getMood() {
  if (hunger === 10 || energy === 0 || happiness === 0) {
      return "dead";
  } else if (hunger > 8 || energy < 3 || happiness < 3) {
      return "sad";
  } else {
      return "happy";
  }
}

function updatePetImage() {
  const mood = getMood();
  switch (mood) {
      case "dead":
          petImage.src = "assets/Dead_Axel_Tamagotchi.GIF";
          break;
      case "sad":
          petImage.src = "assets/Sad_Axel_Tamagotchi.GIF";
          break;
      case "happy":
          petImage.src = "assets/Happy_Axel_Tamagotchi.GIF";
          break;
  }
}

function updateStats() {
  hungerEl.textContent = hunger;
  energyEl.textContent = energy;
  happinessEl.textContent = happiness;
  updatePetImage();
}

feedBtn.addEventListener("click", () => {
  hunger = clampStat(hunger - 2);
  happiness = clampStat(happiness + 1);
  updateStats();
});

playBtn.addEventListener("click", () => {
  happiness = clampStat(happiness + 2);
  energy = clampStat(energy - 1);
  hunger = clampStat(hunger + 1);
  updateStats();
});

restBtn.addEventListener("click", () => {
  energy = clampStat(energy + 3);
  hunger = clampStat(hunger + 1);
  updateStats();
});

updateStats();
