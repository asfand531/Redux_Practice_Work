function clock() {
  const time = new Date();

  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let am_pm = "AM";

  if (hours >= 12) {
    am_pm = "PM";
    if (hours > 12) {
      hours = hours - 12;
    }
  }
  if (hours === 0) hours = 12;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let digiTime = `${hours} : ${minutes} : ${seconds} ${am_pm}`;
  document.getElementById("digialClock").innerHTML = digiTime;
}

setInterval(() => {
  clock();
}, 1000);
