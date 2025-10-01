const noData = document.getElementById("no_data");
const container = document.getElementById("container");

let allData = [];
let currentIndex = 0;
let itemsPerScroll = 15;

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    if (!response.ok) {
      noData.innerHTML = `HTTP error!<br>Status: ${response.status}`;
    }
    return response.json();
  })
  .then((data) => {
    allData = data;
    loadMore();
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
  });

const throttle = (func, delay) => {
  let lastTime = 0;
  return (...args) => {
    let now = Date.now();
    if (now - lastTime >= delay) {
      func(...args);
      lastTime = now;
    }
  };
};

const loadMore = () => {
  if (currentIndex >= allData.length) {
    const alertBox = document.querySelector(".alert");
    const closeBtn = alertBox.querySelector(".closebtn");

    alertBox.style.display = "block";
    alertBox.querySelector(".message").textContent =
      "We have loaded all the data we got!";

    setTimeout(() => {
      alertBox.style.display = "none";
    }, 3000);

    closeBtn.addEventListener("click", () => {
      alertBox.style.display = "none";
    });
    return;
  }

  const slice = allData.slice(currentIndex, currentIndex + itemsPerScroll);
  slice.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `<b>ID:</b> ${item.id}<br><b>Title:</b> ${item.title}<br><b>Body:</b> ${item.body}<hr>`;
    div.style.padding = "5px 10px";
    container.appendChild(div);
  });
  currentIndex += itemsPerScroll;
};

function handleScroll() {
  if (
    container.scrollTop + container.clientHeight >=
    container.scrollHeight - 10
  ) {
    loadMore();
  }
}

window.addEventListener("scroll", throttle(handleScroll, 500));
