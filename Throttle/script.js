let showPosition = document.getElementById("showPosition");
let demo = document.getElementById("demo");
demo.addEventListener("mousedown", () => {
  demo.style.cursor = "grabbing";
});

demo.addEventListener("mouseup", () => {
  demo.style.cursor = "grab";
});

demo.addEventListener("mouseleave", () => {
  demo.style.cursor = "grab";
});

function throttle(func, delay) {
  let lastTime = 0;

  return (...args) => {
    const now = Date.now();
    if (now - lastTime >= delay) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}

function showScrollPosition() {
  showPosition.innerHTML = `Scroll Y: ${window.scrollY}`;
}

const throttledScroll = throttle(showScrollPosition, 500);

window.addEventListener("scroll", throttledScroll);
