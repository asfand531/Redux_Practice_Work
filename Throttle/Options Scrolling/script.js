const city = document.getElementById("city");
const endOfList = document.getElementById("endOfList");

let currentIndex = 0;
let itemsPerScroll = 20;
let cities = [
  "Abbottabad",
  "Abdulla Khel",
  "Adda Sher Khan",
  "Adezai",
  "Afzal",
  "Ahmad Naro",
  "Ahmed Wali",
  "Ain",
  "Aitabar",
  "Akora Khattak",
  "Alipur",
  "Ali Pur",
  "Alikhel",
  "Alipur Chattha",
  "Amirabad",
  "Arifwala",
  "Attock",
  "Bannu",
  "Baqir Pur",
  "Barkhan",
  "Batkhela",
  "Bhakkar",
  "Bhimber",
  "Burewala",
  "Chaman",
  "Chakwal",
  "Chaman",
  "Chichawatni",
  "Chitral",
  "Dadu",
  "Dera Ghazi Khan",
  "Dera Ismail Khan",
  "Dijkot",
  "Faisalabad",
  "Ghotki",
  "Gilgit",
  "Gojra",
  "Gujranwala",
  "Gujrat",
  "Gwadar",
  "Hafizabad",
  "Hangu",
  "Haripur",
  "Hyderabad",
  "Islamabad",
  "Jacobabad",
  "Jhang",
  "Jhelum",
  "Kalat",
  "Kamalia",
  "Karachi",
  "Kasur",
  "Kech",
  "Khairpur",
  "Khushab",
  "Kohat",
  "Kohlu",
  "Kotli",
  "Kundian",
  "Lahore",
  "Larkana",
  "Layyah",
  "Lodhran",
  "Mandi Bahauddin",
  "Mardan",
  "Mian Channu",
  "Mirpur",
  "Mirpur Khas",
  "Mingora",
  "Multan",
  "Muzaffarabad",
  "Nawabshah",
  "Nowshera",
  "Okara",
  "Peshawar",
  "Quetta",
  "Rahim Yar Khan",
  "Rawalpindi",
  "Sadiqabad",
  "Sahiwal",
  "Sargodha",
  "Sialkot",
  "Skardu",
  "Sukkur",
  "Swabi",
  "Tando Adam",
  "Tando Allahyar",
  "Taxila",
  "Vehari",
  "Wah Cantonment",
  "Zhob",
];

function throttle(func, delay) {
  let lastTime = 0;

  return function (...args) {
    let now = Date.now();

    if (now - lastTime >= delay) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}

function show() {
  if (currentIndex >= cities.length) {
    if (!document.getElementById("end-message")) {
      let li = document.createElement("li");
      li.id = "end-message";
      li.innerHTML = "We have reached end of the list!";
      li.style.textAlign = "center";
      li.style.fontWeight = "bold";
      city.appendChild(li);
    }
    return;
  }

  let slice = cities.slice(currentIndex, currentIndex + itemsPerScroll);
  slice.forEach((item) => {
    let li = document.createElement("li");
    li.innerHTML = item;
    li.title = item;

    city.appendChild(li);
  });
  currentIndex += itemsPerScroll;
}

show();

function handleScroll() {
  if (city.scrollTop + city.clientHeight >= city.scrollHeight - 50) {
    show();
  }
}

const throttleScroll = throttle(handleScroll, 300);

city.addEventListener("scroll", throttleScroll);
