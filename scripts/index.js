// Dom elements

const parentJsonElement = document.getElementById("parent-container");

const jsonContainerElement = document.querySelector(".json__container");

const getJsonBtnElement = document.getElementById("get-json-btn");

const displayJsonValueElement = document.getElementById("json-value");

// Event handlers

parentJsonElement.addEventListener("click", parentClickHandler);

getJsonBtnElement.addEventListener("click", getJSONClickHandler);

// Functions

function parentClickHandler(e) {
  if (e.target.nodeName === "BUTTON" && e.target.dataset.type === "add-row") {
    addNewJsonRow(e);
    return;
  }
  if (
    e.target.nodeName === "BUTTON" &&
    e.target.dataset.type === "delete-row"
  ) {
    deleteJsonRow(e);
    return;
  }
  if (e.target.nodeName === "SPAN" && e.target.dataset.type === "close-row") {
    collapseRow(e);
    return;
  }
}

function getJSONClickHandler() {
  const json = getJson();
  renderJSONToUi(json);
}

// Utilities

function addNewJsonRow(e) {
  const parent = e.target.parentNode;
  parent.appendChild(getJsonRowElement());
}

function deleteJsonRow(e) {
  const parent = e.target.closest(".json__sub-item");
  parent && parent.remove();
}

function getJsonRowElement() {
  const DIV_SUBITEM = document.createElement("div");
  DIV_SUBITEM.classList.add("json__sub-item");

  DIV_SUBITEM.innerHTML = `
  <div class="json__container">
    <span data-type="close-row" class="json__caret">&#9660;</span>
    <input type="text" placeholder="Key" name="key" class="json__input" />
    <input type="text" placeholder="Value" name="value" class="json__input" />
    <button data-type="add-row" class="json__btn">&#43;</button>
    <button data-type="delete-row" class="json__btn">&#215;</button>
  </div>
  `;

  return DIV_SUBITEM;
}

function collapseRow(e) {
  e.target.classList.toggle("json__caret--close");
}

function getJson(node = jsonContainerElement) {
  const object = {};

  const keyInputElement = node.querySelector('.json__input[name="key"]');
  const valueInputElement = node.querySelector('.json__input[name="value"]');

  const children = getChildrenWithClassName(node, ".json__sub-item");

  if (!children.length) {
    object[keyInputElement.value] = valueInputElement.value;
    return object;
  }
  let obj = {};

  for (let i = 0; i < children.length; i++) {
    obj = { ...obj, ...getJson(children[i]) };
  }
  object[keyInputElement.value] = obj;
  return object;
}

function getChildrenWithClassName(node, className) {
  let child = node.querySelector(className);

  if (!child) return [];

  const children = [child];
  while (child.nextElementSibling) {
    children.push(child.nextElementSibling);
    child = child.nextElementSibling;
  }
  return children;
}

function renderJSONToUi(json) {
  json = JSON.stringify(json);
  displayJsonValueElement.textContent = json;
}
