const clock = document.getElementById("clock");

for (let i = 1; i <= 12; i++) {
  const number = document.createElement("div");
  number.classList.add("number");
  number.innerText = i;

  number.style.transform = `rotate(${i * 30}deg) translateY(-130px) rotate(-${
    i * 30
  }deg)`;

  clock.appendChild(number);
}

function updateClock() {
  const now = new Date();

  const second = now.getSeconds();
  const minute = now.getMinutes();
  const hour = now.getHours();

  const secondDeg = (second / 60) * 360;
  const minuteDeg = (minute / 60) * 360 + (second / 60) * 6;
  const hourDeg = ((hour % 12) / 12) * 360 + (minute / 60) * 30;

  document.getElementById("second").style.transform = `rotate(${secondDeg}deg)`;
  document.getElementById("minute").style.transform = `rotate(${minuteDeg}deg)`;
  document.getElementById("hour").style.transform = `rotate(${hourDeg}deg)`;
}

setInterval(updateClock, 1000);
updateClock();
