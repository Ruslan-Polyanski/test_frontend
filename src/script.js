const box = document.querySelector(".block__checkbox");
const order = document.querySelector(".order");
const collection = document.querySelectorAll(".block__checkbox_input");
const mapData = new Map();

function getHash() {
  return window.location.hash;
}

function saveHashToMap(hash) {
  hash
    .split("#")
    .reduce((acc, id) => {
      return id ? [...acc, id] : acc;
    }, [])
    .forEach((item) => mapData.set(item, true));
}

function checkInput() {
  collection.forEach((item) => mapData.has(item.id) && (item.checked = true));
}

function updateMap(id) {
  mapData.has(id) ? mapData.delete(id) : mapData.set(id, true);
}

function updateHash() {
  const keys = mapData.keys();
  const hash = [...keys].reduce((acc, item) => {
    return acc + "#" + item;
  }, "");

  history.pushState(null, null, hash);
}

function renderList(data) {
  order.textContent = "";
  const ul = document.createElement("ol");
  [...mapData.keys()].forEach((item) => {
    const li = document.createElement("li");
    li.textContent = "id" + " " + item;
    ul.append(li);
  });

  order.prepend(ul);
}

if (getHash()) {
  const hash = getHash();
  saveHashToMap(hash);
  checkInput();
  renderList(mapData);
}

box.addEventListener(
  "click",
  (e) => {
    if (e.target.id) {
      updateMap(e.target.id);
      updateHash();
      renderList(mapData);
    }
  },
  true
);

export { getHash };
