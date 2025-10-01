// Task # 1
const getEmailValue = document.getElementById("email");
const getDomainValue = document.getElementById("domain");
const getEmailNameValue = document.getElementById("email_name");
const errMsg = document.getElementById("error-message");
document.getElementById("btnDomain").addEventListener("click", getDomain);
document.getElementById("btnEmail").addEventListener("click", emailName);
document.getElementById("btnClear").addEventListener("click", setClear);

const btnDomain = document.getElementById("btnDomain");
const btnEmail = document.getElementById("btnEmail");
const btnClear = document.getElementById("btnClear");

const regex =
  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

let tag = "";

function buttonDisabled() {
  btnDomain.disabled = true;
  btnEmail.disabled = true;
  btnClear.disabled = true;
  btnClear.style.cursor = "not-allowed";
  btnDomain.style.cursor = "not-allowed";
  btnEmail.style.cursor = "not-allowed";
}
buttonDisabled();

function buttonEnabled() {
  btnDomain.disabled = false;
  btnEmail.disabled = false;
  btnClear.disabled = false;
  btnClear.style.cursor = "pointer";
  btnDomain.style.cursor = "pointer";
  btnEmail.style.cursor = "pointer";
}

getEmailValue.addEventListener("input", (e) => {
  const typedValue = e.target.value;
  tag = typedValue;
  if (regex.test(tag)) {
    errMsg.innerHTML = "";
    buttonEnabled();
  } else {
    errMsg.innerHTML = "Please write valid email address!";
    buttonDisabled();
  }
});

function getDomain() {
  const domainPart = getEmailValue.value.split("@")[1];
  getDomainValue.value = domainPart || "";
}
function emailName() {
  const emailPart = getEmailValue.value.split("@")[0];
  getEmailNameValue.value = emailPart || "";
}

function setClear() {
  getEmailValue.value = "";
  getDomainValue.value = "";
  getEmailNameValue.value = "";
  buttonDisabled();
}

// Task # 2
function onPointerEnter() {
  const getNameInput = document.getElementById("name");
  getNameInput.style.backgroundColor = "gray";
  getNameInput.style.color = "white";
  getNameInput.style.border = "3px solid black";
}

function onPointerLeave() {
  const getNameInput = document.getElementById("name");
  getNameInput.style.backgroundColor = "white";
  getNameInput.style.color = "black";
  getNameInput.style.border = "1px solid black";
}
