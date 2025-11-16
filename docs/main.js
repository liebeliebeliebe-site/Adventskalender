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

  sparklify(dayElement, "1rem", undefined, 700);
  sparklify(dayElement, "0.5rem", undefined, 400, 300);
  sparklify(dayElement, "0.5rem", undefined, 500, 400);
});

function canOpenDay(day) {
  const today = new Date().getDate();
  return today >= day;
}

function fetchData() {
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

function openDay(day) {
  if (!canOpenDay(day)) {
    location.hash = "";
    alert("You cannot open this day yet!");
    return;
  }

  if (!data.openedDays.includes(day)) {
    data.openedDays.push(day);
    saveData();
    document.querySelector(`.day[data-day="${day}"]`).classList.add("opened");
  }

  const modal = document.getElementById("modal");
  modal.showModal();
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
});

// open day if hash is present
if (location.hash) {
  const day = location.hash.substring(1);
  openDay(day);
}
