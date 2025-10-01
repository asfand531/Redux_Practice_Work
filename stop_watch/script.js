let themeTogglerElem = document.getElementById("themeToggler");
let stopWatchDisplayElem = document.getElementById("stopWatchDisplay");
let startStopBtnElem = document.getElementById("start_stop_btn");
let resetBtnElem = document.getElementById("reset_btn");
let headingElem = document.getElementById("heading");

let startTime;
let timeInterval;
let elapsedTime = 0;
let isRunning = false;
let optionsData = ["Default", "Theme 1", "Theme 2", "Theme 3", "Theme 4"];

optionsData.map((item) => {
  let optionsElem = document.createElement("option");
  optionsElem.textContent = item;
  optionsElem.value = item.toLowerCase().split(" ").join("");
  themeTogglerElem.appendChild(optionsElem);
});

themeTogglerElem.value = "default";
document.documentElement.removeAttribute("data-theme");

themeTogglerElem.addEventListener("change", (event) => {
  let headingStyle = headingElem.style;
  if (event.target.value === "default") {
    document.documentElement.removeAttribute("data-theme");
    headingElem.innerHTML = "";
  } else {
    headingElem.innerHTML = "Stop Watch";
    document.documentElement.dataset.theme = event.target.value;
  }
  if (event.target.value === "theme1") {
    headingStyle.textAlign = "center";
    headingStyle.position = "absolute";
    headingStyle.top = "20%";
    headingStyle.fontSize = "60px";
  }
});

const playIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="white">
  <path d="M360-840v-80h240v80H360ZM480-80q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Zm-80 160 240-160-240-160v320Z"/>
</svg>`;

const pauseIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="white">
  <path d="M360-840v-80h240v80H360ZM480-80q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm-120-200h80v-320h-80v320Zm160 0h80v-320h-80v320Z"/>
</svg>`;

function updateTime(s) {
  let hours = Math.floor(s / 3600000);
  s %= 3600000;
  let minutes = Math.floor(s / 60000);
  s %= 60000;
  let seconds = Math.floor(s / 1000);

  return (
    String(hours).padStart(2, "0") +
    "h " +
    String(minutes).padStart(2, "0") +
    "m " +
    String(seconds).padStart(2, "0") +
    "s "
  );
}

const startWatch = () => {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timeInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      stopWatchDisplayElem.innerHTML = updateTime(elapsedTime);
    }, 1000);

    startStopBtnElem.title = "Stop";
    startStopBtnElem.innerHTML = pauseIcon;
  } else {
    isRunning = false;
    startStopBtnElem.title = "Start";
    startStopBtnElem.innerHTML = playIcon;
    clearInterval(timeInterval);
  }
};

const resetWatch = () => {
  clearInterval(timeInterval);
  isRunning = false;
  startStopBtnElem.title = "Start";
  startStopBtnElem.innerHTML = playIcon;
  elapsedTime = 0;
  stopWatchDisplayElem.innerHTML = updateTime(elapsedTime);
};

startStopBtnElem.addEventListener("click", startWatch);
resetBtnElem.addEventListener("click", resetWatch);
