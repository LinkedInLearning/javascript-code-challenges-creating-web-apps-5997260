const statEls = {
  hunger: document.getElementById("hunger"),
  energy: document.getElementById("energy"),
  happiness: document.getElementById("happiness"),
};

const petImage = document.getElementById("petImage");

const feedBtn = document.getElementById("feedBtn");
const playBtn = document.getElementById("playBtn");
const restBtn = document.getElementById("restBtn");
const reportBtn = document.getElementById("reportBtn");
const healthReportEl = document.getElementById("healthReport");

const pet = {
  hunger: 5,
  energy: 5,
  happiness: 5,
};

const moodImages = {
  happy: "assets/Happy_Axel_Tamagotchi.GIF",
  sad: "assets/Sad_Axel_Tamagotchi.GIF",
  dead: "assets/Dead_Axel_Tamagotchi.GIF",
};

function clampStat(value) {
  return Math.max(0, Math.min(10, value));
}

function getMood() {
  if (pet.hunger === 10 || pet.energy === 0 || pet.happiness === 0) {
    return "dead";
  } else if (pet.hunger > 8 || pet.energy < 3 || pet.happiness < 3) {
    return "sad";
  } else {
    return "happy";
  }
}

function updatePetImage() {
  petImage.src = moodImages[getMood()];
}

function updateStats() {
  Object.keys(statEls).forEach((stat) => {
    statEls[stat].textContent = pet[stat];
  });
  updatePetImage();
}

function performAction(changes) {
  if (getMood() === "dead") return;
  Object.entries(changes).forEach(([stat, delta]) => {
    pet[stat] = clampStat(pet[stat] + delta);
  });
  updateStats();
}

feedBtn.addEventListener("click", () => {
  performAction({ hunger: -2, happiness: +1 });
});

playBtn.addEventListener("click", () => {
  performAction({ happiness: +2, energy: -1, hunger: +1 });
});

restBtn.addEventListener("click", () => {
  performAction({ energy: +3, hunger: +1 });
});

function decayStats() {
  if (getMood() === "dead") return;
  pet.hunger = clampStat(pet.hunger + 1);
  pet.energy = clampStat(pet.energy - 1);
  pet.happiness = clampStat(pet.happiness - 1);
  updateStats();
}

reportBtn.addEventListener("click", () => {
  const html = getHealthReportHTML();
  healthReportEl.innerHTML = html;

  // Show + auto-hide after 4 seconds
  healthReportEl.classList.add("show");
  setTimeout(() => {
    healthReportEl.classList.remove("show");
  }, 4000);
});

function getHealthReportHTML() {

  return `
      <h2>Pet Health Report</h2>
  <ul>
    <li><strong>Hunger:</strong> ${pet.hunger} – ${
    pet.hunger > 8 ? "Very hungry" : "Okay"
  }</li>
    <li><strong>Energy:</strong> ${pet.energy} – ${
    pet.energy < 3 ? "Exhausted" : "Energized"
  }</li>
    <li><strong>Happiness:</strong> ${pet.happiness} – ${
    pet.happiness < 3 ? "Feeling sad" : "Feeling good"
  }</li>
  </ul>
`;
}

updateStats();
setInterval(decayStats, 10000);
