let hoursElem = document.getElementById("hours");
let minutesElem = document.getElementById("minutes");
let secondsElem = document.getElementById("seconds");

function countDown() {
  let hours = parseInt(prompt("Enter hours:") || 0);
  let minutes = parseInt(prompt("Enter minutes:") || 0);
  let seconds = parseInt(prompt("Enter seconds:") || 0);

  let totalSeconds = hours * 3600 + minutes * 60 + seconds;

  function updateDisplay() {
    let h = Math.floor((totalSeconds % 86400) / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = Math.floor(totalSeconds % 60);

    hoursElem.innerHTML = String(h).padStart(2, "0") + "h";
    minutesElem.innerHTML = String(m).padStart(2, "0") + "m";
    secondsElem.innerHTML = String(s).padStart(2, "0") + "s";
  }
  updateDisplay();

  let timer = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(timer);
      alert("Time's up!");
    }
  }, 1000);
}

countDown();
