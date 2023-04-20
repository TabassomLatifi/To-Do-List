let list = document.querySelector("#to-do-list");
let addInput = document.querySelector(".newItem Input");
let searchInput = document.querySelector(".searchBox Input");
let addBtn = document.querySelector(".newItem button");
let tempList = !localStorage.getItem("list")
  ? []
  : localStorage.getItem("list").split(",");
let doneItems = !localStorage.getItem("done")
  ? []
  : localStorage.getItem("done").split(",");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!addInput.value) {
    return;
  }
  if (document.querySelector("#emptyMsg")) {
    document.querySelector("#emptyMsg").remove();
  }
  list.appendChild(createListItem(addInput.value, "new"));
  if (!Array.from(tempList).some((item) => item === addInput.value)) {
    tempList.push(addInput.value);
  }
  localStorage.setItem("list", tempList);
  addInput.value = "";
});

function createListItem(itemValue, status) {
  let item = document.createElement("li");
  let title = document.createElement("span");
  let btn = document.createElement("button");
  let doneBtn = document.createElement("button");
  let div = document.createElement("div");
  title.innerText = itemValue;
  btn.innerText = "delete";
  btn.style.padding = "5px";
  doneBtn.style.padding = "3px";
  doneBtn.style.width = "50px";
  doneBtn.style.marginRight = "5px";

  if (status === "new") {
    doneBtn.innerText = "done";
    doneBtn.style.backgroundColor = "orange";
  } else {
    doneBtn.style.backgroundColor = "green";
    doneBtn.innerHTML = '<img src="check-solid.svg" width="15px">';
  }
  item.appendChild(title);
  item.appendChild(div);
  div.appendChild(doneBtn);
  div.appendChild(btn);
  return item;
}

list.addEventListener("click", (e) => {
  let deletedtask =
    e.target.parentNode.parentNode.querySelector("span").innerText;
  if (e.target.nodeName === "BUTTON" && e.target.innerText === "delete") {
    e.target.parentNode.parentNode.remove();
    let completeList = localStorage.getItem("list");
    completeList = completeList.replace(deletedtask, "");
    completeList = completeList.replace(",,", ",");

    if (completeList.endsWith(",")) {
      completeList = completeList.substring(0, completeList.length - 1);
    }

    if (completeList.startsWith(",")) {
      completeList = completeList.substring(1);
    }

    localStorage.setItem("list", completeList);

    if (doneItems.length > 0) {
      let doneList = localStorage.getItem("done");
      doneList = doneList.replace(deletedtask, "");
      doneList = doneList.replace(",,", ",");
      if (doneList.endsWith(",")) {
        doneList = doneList.substring(0, doneList.length - 1);
      }
      if (doneList.startsWith(",")) {
        doneList = doneList.substring(1);
      }
      localStorage.setItem("done", doneList);
    }

    if (list.children.length === 0) {
      createEmptyMsg();
      localStorage.removeItem("list");
    }
  } else if (e.target.nodeName === "BUTTON" && e.target.innerText === "done") {
    doneItems.push(
      e.target.parentNode.parentNode.querySelector("span").innerText
    );
    localStorage.setItem("done", doneItems);
    e.target.innerText = "";
    e.target.innerHTML = '<img src="check-solid.svg" width="15px">';
    e.target.style.backgroundColor = "green";
  }
});

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
  let doneArray = Array.from(doneItems);
  let listArray = Array.from(tempList);
  for (let item of listArray) {
    if (doneArray.some((i) => i === item)) {
      list.appendChild(createListItem(item, "done"));
    } else {
      list.appendChild(createListItem(item, "new"));
    }
  }
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
