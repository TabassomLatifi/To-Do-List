let list = document.querySelector("#to-do-list");
let addInput = document.querySelector(".newItem Input");
let searchInput = document.querySelector(".searchBox Input");
let addBtn = document.querySelector(".newItem button");
let tempList = !localStorage.getItem("list") ? [] : localStorage.getItem("list").split(",");


list.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    e.target.parentNode.remove();
    let completeList = localStorage.getItem("list");
    let deletedtask = e.target.parentNode.querySelector("span").innerText;
    completeList = completeList.replace(deletedtask, "");
    completeList = completeList.replace(",,", ",");
    if (completeList.endsWith(",")) {
      completeList = completeList.substring(0, completeList.length - 1);
    }
    if (completeList.startsWith(",")) {
      completeList = completeList.substring(1);
    }
    localStorage.setItem("list", completeList);

    if (list.children.length === 0) {
      createEmptyMsg();
      localStorage.removeItem("list");
    }
  }
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!addInput.value) {
    return;
  }
  if (document.querySelector("#emptyMsg")) {
    document.querySelector("#emptyMsg").remove();
  }
  list.appendChild(createListItem(addInput.value));
  tempList.push(addInput.value);
  localStorage.setItem("list", tempList);
  addInput.value = "";
});

function createListItem(itemValue) {
  let item = document.createElement("li");
  let title = document.createElement("span");
  let btn = document.createElement("button");
  title.innerText = itemValue;
  btn.innerText = "delete";
  item.appendChild(title);
  item.appendChild(btn);
  return item;
}

searchInput.addEventListener("input", (e) => {
  Array.from(list.children).forEach((item) => {
    if (document.querySelector("#emptyMsg")) {
      return;
    }
    if (
      item
        .querySelector("span")
        .innerText.toLowerCase()
        .includes(e.target.value.toLowerCase())
    ) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

if (!localStorage.getItem("list")) {
  createEmptyMsg();
} else {
  localStorage
    .getItem("list")
    .split(",")
    .forEach((item) => {
      list.appendChild(createListItem(item));
    });
}

function createEmptyMsg() {
  let listEmptyMessage = document.createElement("div");
  listEmptyMessage.style.textAlign = "center";
  listEmptyMessage.style.color = "darkBlue";
  listEmptyMessage.style.fontFamily = "Tilt Neon";
  listEmptyMessage.innerText = "your list is empty!";
  listEmptyMessage.id = "emptyMsg";
  list.appendChild(listEmptyMessage);
}
