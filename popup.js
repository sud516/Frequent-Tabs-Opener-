const addLinkBtn = document.getElementById("add-btn");
const openLinkBtn = document.getElementById("open");
let urls = [];

addLinkBtn.addEventListener("click", () => addTask());
chrome.storage.sync.get(["urls"], (res) => {
  urls = res.urls ? res.urls : [];
  renderTasks();
});
function saveTasks() {
  chrome.storage.sync.set({
    urls,
  });
}

function renderTask(taskNum) {
  const row = document.createElement("div");
  const inputEl = document.createElement("input");
  const deleteEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.placeholder = "Enter/Paste link";
  inputEl.value = urls[taskNum];
  inputEl.addEventListener("change", () => {
    urls[taskNum] = inputEl.value;
    saveTasks();
  });
  deleteEl.type = "button";
  deleteEl.value = "Delete";
  deleteEl.style.marginLeft = "2px";
  deleteEl.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  row.appendChild(inputEl);
  row.appendChild(deleteEl);
  const tabsContainer = document.getElementById("tabs-container");
  tabsContainer.appendChild(row);
}
function addTask() {
  let taskNum = urls.length;
  urls.push("");
  renderTask(taskNum);
  saveTasks();
}
function deleteTask(taskNum) {
  urls.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}
function renderTasks() {
  const tabsContainer = document.getElementById("tabs-container");
  tabsContainer.textContent = "";
  urls.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}

openLinkBtn.addEventListener("click", () => {
  for (let i = 0; i < urls.length; ++i) {
    if (urls[i].includes("https://")) {
      chrome.tabs.create({
        url: urls[i],
      });
    }
  }
});
