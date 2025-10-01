const nameElem = document.getElementById("name");
const ageElem = document.getElementById("age");
const emailElem = document.getElementById("email");
const submit = document.getElementById("submit");
const container = document.getElementsByClassName("container");

function throttle(func, delay) {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}

function clicker() {
  if (nameElem.value.trim() === "") {
    alert("You need to fill the Name field!");
    return false;
  }
  if (ageElem.value.trim() === "") {
    alert("You need to fill the Age field!");
    return false;
  }
  if (emailElem.value.trim() === "") {
    alert("You need to fill the Email field!");
    return false;
  }
  return true;
}

const handleClick = () => {
  clicker();
  alert("Button has been clicked!");
};

submit.addEventListener("click", throttle(handleClick, 2000));
