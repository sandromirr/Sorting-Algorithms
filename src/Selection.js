const N = 10;
let values = [];
let time = 0;

const speed = 10;

let selected;
let min;

const itemDOM = document.querySelector(".items");
const maxDOM = document.querySelector(".max");

const createItemElement = (index, value) => {
  const size = 100 / N;
  const d = document.createElement("div");
  d.classList.add("item");
  d.setAttribute("id", `${index}_index`);
  d.innerText = value;
  d.style.height = 2 * value + "px";
  d.style.background = "#bbb";
  d.style.width = `calc(${size}% - 3px)`;
  d.style.left = `calc(${size * index}%)`;
  return d;
};

const mark_as_selected = (index, color) => {
  time += 1;
  setTimeout(() => {
    const d = document.querySelectorAll(".item")[index];
    d.style.background = color;
  }, speed * time);
};

const mark_as_default = (index) => {
  time += 1;
  setTimeout(() => {
    const d = document.querySelectorAll(".item")[index];
    d.style.background = "#bbb";
  }, speed * time);
};

const init = () => {
  for (var i = 0; i < N; i++) {
    values.push(Math.floor(Math.random() * 90) + 10);
    itemDOM.appendChild(createItemElement(i, values[i]));
  }

  select_sort();
};

const swap = (i, j) => {
  time += 1;
  setTimeout(() => {
    if (values[i] < values[j]) {
      const a = values[i];
      const b = values[j];

      const first = document.querySelectorAll(".item")[i];
      const second = document.querySelectorAll(".item")[j];

      first.style.height = `${2 * b}px`;
      first.innerHTML = `${b}`;
      second.style.height = `${2 * a}px`;
      second.innerHTML = `${a}`;

      const tmp = values[i];
      values[i] = values[j];
      values[j] = tmp;
    }
  }, speed * time + 100);
};

const select_sort = () => {
  let cnt = 0;
  for (var i = 0; i < N; i += 1) {
    mark_as_selected(i, "green");
    for (var j = i + 1; j < N; j += 1) {
      mark_as_selected(j, "blue");
      swap(i, j);
      mark_as_default(j);
    }
    mark_as_default(i);
  }
};

init();
