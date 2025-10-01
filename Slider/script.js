let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let sliderContainer = document.getElementById("slider");
let caption = document.getElementById("caption");

let slides = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/4840134/pexels-photo-4840134.jpeg",
    alt: "Green Trees",
    caption: "High Angle View of Green Trees",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/1718337/pexels-photo-1718337.jpeg",
    alt: "Iași, Romania",
    caption: "Low Angle Photography Of Building, Iași, Romania",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/3312671/pexels-photo-3312671.jpeg",
    alt: "Kranj, Slovenia",
    caption: "Photo Of Building On Top Of Rocks, Kranj, Slovenia",
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/1242764/pexels-photo-1242764.jpeg",
    alt: "Half Moon and Silhouette of Trees",
    caption: "Half Moon and Silhouette of Trees",
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/2433985/pexels-photo-2433985.jpeg",
    alt: "Black Steering Wheel",
    caption: "Black Steering Wheel",
  },
];

slides.map((slide, index) => {
  const slideElem = document.createElement("div");
  slideElem.classList.add("slide");
  if (index === 0) {
    slideElem.classList.add("active");
  }

  slideElem.innerHTML = `
    <img src=${slide.url} alt=${slide.alt}>
    <figcaption class="caption">${slide.caption}</figcaption>
    `;
  sliderContainer.appendChild(slideElem);
  return;
});

let currentIndex = 0;
let autoSlideInterval;
let slide = document.querySelectorAll(".slide");

function showSlide(index) {
  slide.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
  currentIndex = index;
}

function prevSlide() {
  let newIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(newIndex);
}

function nextSlide() {
  let newIndex = (currentIndex + 1) % slides.length;
  showSlide(newIndex);
}

let progressInterval;
let paused = false;
let progressWidth = 0;

function move() {
  let elem = document.getElementById("progress");
  clearInterval(progressInterval);
  progressWidth = 0;
  elem.style.width = "0%";

  progressInterval = setInterval(frame, 100);
  function frame() {
    if (!paused) {
      if (progressWidth >= 50) {
        clearInterval(progressInterval);
      } else {
        progressWidth++;
        elem.style.width = progressWidth + "%";
      }
    }
  }
}

function startAutoSlide() {
  stopautoSlide();
  autoSlideInterval = setInterval(() => {
    if (!paused) {
      nextSlide();
      move();
    }
  }, 5000);
  move();
}

function stopautoSlide() {
  clearInterval(autoSlideInterval);
  clearInterval(progressInterval);
}

prevBtn.addEventListener("click", () => {
  prevSlide();
  stopautoSlide();
  startAutoSlide();
});
nextBtn.addEventListener("click", () => {
  nextSlide();
  stopautoSlide();
  startAutoSlide();
});

sliderContainer.addEventListener("mouseenter", () => {
  paused = true;
});

sliderContainer.addEventListener("mouseleave", () => {
  paused = false;
});

startAutoSlide();
