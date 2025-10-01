let timerDisplayElem = document.getElementById("timerDisplay");
let start_date_Elem = document.getElementById("start_date");
let end_date_Elem = document.getElementById("end_date");
let start_event_btn_Elem = document.getElementById("start_event_btn");
let toast_Elem = document.getElementById("toast");

document.getElementById("close_errormsg_icon").addEventListener("click", () => {
  toast_Elem.style.display = "none";
});

let timerInterval;

function showToast() {
  toast_Elem.classList.remove("hide");
  toast_Elem.classList.add("show");

  setTimeout(() => {
    hideToast();
  }, 5000);
}

function hideToast() {
  toast_Elem.classList.remove("show");
  toast_Elem.classList.add("hide");
}

close_errormsg_icon_Elem = document
  .getElementById("close_errormsg_icon")
  .addEventListener("click", hideToast);

function handleClick() {
  clearInterval(timerInterval);
  hideToast();

  let startValue = start_date_Elem.value;
  let endValue = end_date_Elem.value;

  if (!startValue || !endValue) {
    console.error("Please enter your starting and ending date.");
    return;
  }

  let startTime = new Date(startValue).getTime();
  let endTime = new Date(endValue).getTime();

  if (endTime <= startTime) {
    console.error("End-time must be greater than starting time!");
    return;
  }

  timerInterval = setInterval(() => {
    let currentTime = new Date().getTime();

    if (currentTime < startTime) {
      const diff = startTime - currentTime;
      timerDisplayElem.innerHTML = `Event is starting in ${timeFormat(diff)}`;
      start_event_btn_Elem.style.visibility = "hidden";
      hideToast();
    } else if (currentTime >= startTime && currentTime <= endTime) {
      const diff = endTime - currentTime;
      timerDisplayElem.innerHTML = `Time left ${timeFormat(diff)}`;
      start_event_btn_Elem.style.visibility = "hidden";
      hideToast();
    } else {
      clearInterval(timerInterval);
      timerDisplayElem.innerHTML = `Event ended`;
      document.getElementById("endMusic").play();
      start_event_btn_Elem.style.visibility = "visible";

      showToast();
    }
  }, 1000);
}

function timeFormat(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let days = Math.floor(totalSeconds / (3600 * 24))
    .toString()
    .padStart(2, "0");
  let hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
    .toString()
    .padStart(2, "0");
  let minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  let seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

start_event_btn_Elem.addEventListener("click", handleClick);
