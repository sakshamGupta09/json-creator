// Dom elements

const parentJsonElement = document.getElementById("parent-container");

// Event handlers

parentJsonElement.addEventListener("click", parentClickHandler);

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
