import { openModal, setModalTitle, setModalImage } from "./Modal.js";
import { sparklify } from "./Sparkle.js";

const closeButton = document.querySelector("#close-btn");
closeButton.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  modal.close();
  location.hash = "";
});

addEventListener("hashchange", () => {
  const day = location.hash.substring(1);
  if (day) {
    openDay(day);
  }
});

document.querySelectorAll(".day").forEach((dayElement) => {
  dayElement.addEventListener("click", () => {
    const day = dayElement.getAttribute("data-day");
    location.hash = day;
  });
});

function canOpenDay(day) {
  const isDebug = location.search.includes("debug=true");
  if (isDebug) {
    return true;
  }

  const lastDate = new Date("2025-12-24");
  if (new Date() >= lastDate) {
    return true;
  }
  const startDate = new Date("2025-12-01");
  if (new Date() <= startDate) {
    return false;
  }

  const today = new Date().getDate();
  return today >= day;
}

function fetchData() {
  const isReset = location.search.includes("reset=true");
  if (isReset) {
    localStorage.removeItem("adventskalender2025");
  }

  const sData = localStorage.getItem("adventskalender2025");
  const initialData = {
    openedDays: [],
  };
  try {
    return JSON.parse(sData) || initialData;
  } catch (e) {
    return initialData;
  }
}

const data = fetchData();

function openDay(day, skipAnimation) {
  if (!canOpenDay(day)) {
    location.hash = "";
    alert("Dieser Tag lässt sich noch nicht öffnen!");
    return;
  }

  const dayElement = document.querySelector(`.day[data-day="${day}"]`);

  const firstTime = !data.openedDays.includes(day);
  if (firstTime) {
    data.openedDays.push(day);
    saveData();
    dayElement.classList.add("opened");
  }

  setModalTitle(`${day}. Dezember`);
  setModalImage(`../assets/days/day${day}.png`);
  openModal(dayElement || document.body, skipAnimation);

  umami?.track(`open-day-${day}`, { firstTime });
}

function saveData() {
  localStorage.setItem("adventskalender2025", JSON.stringify(data));
}

// initialize already opened days
document.querySelectorAll(".day").forEach((dayElement) => {
  const day = dayElement.getAttribute("data-day");
  if (data.openedDays.includes(day)) {
    dayElement.classList.add("opened");
  }

  const lastDate = new Date("2025-12-24");
  const startDate = new Date("2025-12-01");

  const today = new Date().getDate();
  if (
    day === today.toString() &&
    new Date() >= startDate &&
    new Date() <= lastDate
  ) {
    dayElement.classList.add("today");

    sparklify(dayElement, "1rem", undefined, 700);
    sparklify(dayElement, "0.5rem", undefined, 400, 300);
    sparklify(dayElement, "0.5rem", undefined, 500, 400);
  }
});

// open day if hash is present
if (location.hash) {
  const day = location.hash.substring(1);
  openDay(day, true);
}
