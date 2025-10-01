let displayValue = document.getElementById("displayValue");
let displayData = document.getElementById("displayData");
let searchInput = document.getElementById("search");

const data = ["Asfand Bilal", "Zeeshan", "Shahid", "Ahmed", "Ahmer"];

data.forEach((item) => {
  const list = document.createElement("li");
  list.innerHTML = item;
  displayData.appendChild(list);
});

// This debounce function will wait for the user to stop giving the input for specific amount of time to trigger the function. This is simple and most common debounce function.
// Use Case:
// 1. for Search bars
// 2. for Resize the window or frames
// 3. Scroll events etc
// function debounce(func, delay) {
//   let timer;
//   return function (...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => func.apply(this, args), delay);
//   };
// }

// Now here is the the case two, which we often use. This will work immediately for the first time and then wait for the some amount of time, like the simple one, if the user agian trigger the event after the given delay, it will again trigger on the  first call. This pattern is usually called leading & trailing debounce.
// immediate = true → first call executes instantly.
// After inactivity, the function is ready to fire immediately again.

function debounce(func, delay, immediate = false) {
  let timer;
  return function (...args) {
    const context = this;
    const callNow = immediate && !timer;

    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null; // Reset so next "immediate" can work.
      if (!immediate) func.apply(context, args);
    }, delay);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

function showData(value) {
  if (!value.trim()) {
    displayData.innerHTML = "";
    displayValue.innerHTML = "";
    data.forEach((item) => {
      const list = document.createElement("li");
      list.innerHTML = item;
      displayData.appendChild(list);
    });
    return;
  }

  displayData.innerHTML = `You searched: ${value.trim()}`;

  displayValue.innerHTML = "";

  const filteredData = data.filter((item) => {
    return item.toLowerCase().includes(value.toLowerCase());
  });

  if (filteredData.length === 0) {
    displayData.innerHTML = "<li>No data found!</li>";
  } else {
    filteredData.forEach((item) => {
      const list = document.createElement("li");
      list.innerHTML = item;
      displayData.appendChild(list);
    });
  }
}

const debounceSearch = debounce(showData, 1000);

searchInput.addEventListener("input", (e) => {
  debounceSearch(e.target.value.trim());
});
