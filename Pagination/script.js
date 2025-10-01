const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const goToInput = document.getElementById("goToInput");
let goToBtn = document.getElementById("goToBtn");
let totalItemNumber = document.getElementById("totalItemNumber");
const closeIcon = document.getElementById("close-icon");
const modalContainer = document.getElementById("modal-container");
const updateBtn = document.querySelector(".updateBtn");
const showItemsPerPage = document.getElementById("showItemsPerPage");
const errorMsg = document.getElementById("errorMsg");
const totalPagesNumber = document.getElementById("totalPagesNumber");
const close_msg_icon = document.getElementById("close_errormsg_icon");
const firstBtn = document.getElementById("firstBtn");
const lastBtn = document.getElementById("lastBtn");

const closeErrorMsgIcon = close_msg_icon.addEventListener("click", () => {
  errorMsg.style.display = "none";
});

errorMsg.style.display = "none";
modalContainer.style.display = "none";

let currentPage = 1;
let itemsPerPage = 10;
let optionsPerPage = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

let totalPages;

showItemsPerPage.innerHTML = "";

optionsPerPage.map((value) => {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = `${value} / page`;

  if (value === itemsPerPage) {
    option.selected = true;
  }

  option.className = "option";
  showItemsPerPage.appendChild(option);
});

showItemsPerPage.addEventListener("change", () => {
  const selectedValue = parseInt(showItemsPerPage.value, 10);
  itemsPerPage = selectedValue;
  currentPage = 1;
  content(currentPage);
});

goToInput.addEventListener("input", () => {
  const value = goToInput.value;

  if (value === "") {
    errorMsg.style.display = "none";
    return;
  }

  const numValue = Number(value);

  if (isNaN(numValue)) {
    errorMsg.style.display = "flex";
    return;
  }

  if (numValue < 1 || numValue > totalPages) {
    goToInput.value = "";

    errorMsg.style.display = "flex";
    setTimeout(() => {
      errorMsg.style.display = "none";
      closeErrorMsgIcon;
    }, 5000);
  } else {
    errorMsg.style.display = "none";
  }
});

async function content(page) {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  const comments = await response.json();
  const paginationPages = Math.ceil(comments.length / itemsPerPage);
  totalPages = paginationPages;

  totalItemNumber.innerHTML = comments.length;

  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  const firstIndex = (page - 1) * itemsPerPage;
  let lastIndex = firstIndex + itemsPerPage;
  const itemToShow = comments.slice(firstIndex, lastIndex);
  const result = itemToShow.reduce((prevItem, currentItem) => {
    const bodyTextLength = 60;
    const body = currentItem.body;
    const limitedText = body.slice(0, bodyTextLength);

    return `
    ${prevItem}
    <tr data-item-record="${encodeURIComponent(JSON.stringify(currentItem))}">

            <td class="tableId">${currentItem.id}</td>
          <td class="tableName" data-id=${currentItem.id}>${
      currentItem.name
    }</td>
          <td class="tableEmail" data-id=${currentItem.id}>${
      currentItem.email
    }</td>
          <td class="tableComment" data-id=${currentItem.id}>${
      limitedText + "..."
    }</td>
          <td class="tableActions">
          <svg data-edit=${
            currentItem.id
          } xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
          
          <svg data-delete=${
            currentItem.id
          } xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          
          </td>

      </tr>
            `;
  }, "");

  tableBody.innerHTML = result;

  document.querySelectorAll("tr[data-item-record]").forEach((item) => {
    let del = item.querySelector("[data-delete]");
    let deleteBtnStyling = del.style;
    deleteBtnStyling.fill = "#FA003F";
    deleteBtnStyling.fontWeight = "bold";
    deleteBtnStyling.cursor = "pointer";
    deleteBtnStyling.transition = "500ms all ease-in-out";

    del.addEventListener("mouseover", () => {
      deleteBtnStyling.fill = "#c40031ff";
      deleteBtnStyling.fontWeight = "bold";
      deleteBtnStyling.cursor = "pointer";
      deleteBtnStyling.transition = "500ms all ease-in-out";
    });

    del.addEventListener("mouseout", () => {
      deleteBtnStyling.fill = "#FA003F";
      deleteBtnStyling.fontWeight = "bold";
      deleteBtnStyling.cursor = "pointer";
      deleteBtnStyling.transition = "500ms all ease-in-out";
    });

    if (!del) return;
    del.addEventListener("click", () => {
      item.remove();
    });
  });

  document.querySelectorAll("tr[data-item-record]").forEach((item) => {
    let edit = item.querySelector("[data-edit]");

    let editBtnStyling = edit.style;
    editBtnStyling.fill = "#1E90FF";
    editBtnStyling.fontWeight = "bold";
    editBtnStyling.cursor = "pointer";
    editBtnStyling.transition = "500ms all ease-in-out";

    edit.addEventListener("mouseover", () => {
      editBtnStyling.fill = "#004687";
      editBtnStyling.fontWeight = "bold";
      editBtnStyling.cursor = "pointer";
      editBtnStyling.transition = "500ms all ease-in-out";
    });

    edit.addEventListener("mouseout", () => {
      editBtnStyling.fill = "#1E90FF";
      editBtnStyling.fontWeight = "bold";
      editBtnStyling.cursor = "pointer";
      editBtnStyling.transition = "500ms all ease-in-out";
    });

    edit.addEventListener("click", (e) => {
      modalContainer.style.display = "flex";
      e.stopPropagation();

      const rowDataString = item.getAttribute("data-item-record");
      const rowData = JSON.parse(decodeURIComponent(rowDataString));

      currentlyEditingRow = item;

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const body = document.getElementById("body");

      name.value = rowData.name;
      email.value = rowData.email;
      body.value = rowData.body;
    });
  });

  goToInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const inputPage = goToInput.value;
      if (!isNaN(inputPage) && inputPage >= 1 && inputPage <= totalPages) {
        currentPage = inputPage;
        content(currentPage);
      } else {
        goToInput.value = "";
        errorMsg.style.display = "flex";
        setTimeout(() => {
          errorMsg.style.display = "none";
        }, 5000);
      }
    }
  });

  goToBtn.addEventListener("click", () => {
    const inputPage = goToInput.value;
    if (!isNaN(inputPage) && inputPage >= 1 && inputPage <= totalPages) {
      currentPage = inputPage;
      content(currentPage);
    } else {
      goToInput.value = "";
      errorMsg.style.display = "flex";
      setTimeout(() => {
        errorMsg.style.display = "none";
      }, 5000);
    }
  });

  firstBtn.addEventListener("click", () => {
    currentPage = 1;
    content(currentPage);
  });

  lastBtn.addEventListener("click", () => {
    currentPage = totalPages;
    content(currentPage);
  });

  pagination();
}

content(1);

updateBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!currentlyEditingRow) return;

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const body = document.getElementById("body").value;

  const tds = currentlyEditingRow.querySelectorAll("td");

  tds[1].innerText = name;
  tds[2].innerText = email;
  tds[3].innerText = body;

  const updatedData = {
    id: tds[0].innerText,
    name,
    email,
    body,
  };

  currentlyEditingRow.setAttribute(
    "data-item-record",
    encodeURIComponent(JSON.stringify(updatedData))
  );

  currentlyEditingRow = null;
  modalContainer.style.display = "none";
});

closeIcon.addEventListener("click", () => {
  modalContainer.style.display = "none";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("body").value = "";
  currentlyEditingRow = null;
});

function firstButtonDisabled() {
  if (currentPage <= 1) {
    firstBtn.disabled = true;
    firstBtn.style.background = "darkgray";
    firstBtn.style.opacity = "0.5";
    firstBtn.style.cursor = "not-allowed";
  } else {
    firstBtn.disabled = false;
    firstBtn.style.background = "black";
    firstBtn.style.color = "#F5F5F5";
    firstBtn.style.opacity = "1";
    firstBtn.style.cursor = "pointer";
  }
}

function prevButtonDisabled() {
  if (currentPage <= 1) {
    prevBtn.disabled = true;
    prevBtn.style.background = "darkgray";
    prevBtn.style.opacity = "0.5";
    prevBtn.style.cursor = "not-allowed";
  } else {
    prevBtn.disabled = false;
    prevBtn.style.background = "black";
    prevBtn.style.color = "#F5F5F5";
    prevBtn.style.opacity = "1";
    prevBtn.style.cursor = "pointer";
  }
}

function nextButtonDisabled() {
  if (currentPage >= totalPages) {
    nextBtn.disabled = true;
    nextBtn.style.background = "darkgray";
    nextBtn.style.opacity = "0.5";
    nextBtn.style.cursor = "not-allowed";
  } else {
    nextBtn.disabled = false;
    nextBtn.style.background = "black";
    nextBtn.style.color = "#F5F5F5";
    nextBtn.style.opacity = "1";
    nextBtn.style.cursor = "pointer";
  }
}

function lastButtonDisabled() {
  if (currentPage >= totalPages) {
    lastBtn.disabled = true;
    lastBtn.style.background = "darkgray";
    lastBtn.style.opacity = "0.5";
    lastBtn.style.cursor = "not-allowed";
  } else {
    lastBtn.disabled = false;
    lastBtn.style.background = "black";
    lastBtn.style.color = "#F5F5F5";
    lastBtn.style.opacity = "1";
    lastBtn.style.cursor = "pointer";
  }
}

function pagination() {
  if (prevBtn) {
    firstButtonDisabled();
    prevButtonDisabled();

    prevBtn.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        content(currentPage);
      }
    };
  }

  if (nextBtn) {
    nextButtonDisabled();
    lastButtonDisabled();

    if (currentPage) {
      nextBtn.onclick = () => {
        if (currentPage < totalPages) {
          currentPage++;
          content(currentPage);
        }
      };
    }

    if (pageInfo) {
      totalPagesNumber.innerText = totalPages;
      pageInfo.innerHTML = `${currentPage} page of ${totalPages}`;
    }
  }
}
