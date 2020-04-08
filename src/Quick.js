let N = 100;
let values = [];

let time = 0;

let speed = 2;

const itemDOM = document.querySelector(".items");
const maxDOM = document.querySelector(".max");
const pivotDOM = document.querySelector("#pivot");

const createItemElement = (index, value) => {
  const size = 100 / N;
  const d = document.createElement("div");
  d.classList.add("item");
  // d.classList.add("mark");
  d.setAttribute("id", `${index}_index`);
  d.innerText = value;
  d.style.height = 2 * value + "px";
  d.style.background = "#bbb";
  d.style.width = `calc(${size}% - 3px)`;
  d.style.left = `calc(${size * index}%)`;
  return d;
};

const mark_as_selected = (index, color, cl = "") => {
  time += speed / 2;
  setTimeout(() => {
    const d = document.querySelectorAll(".item")[index];
    d.style.background = color;
    if (cl != "") d.classList.add(cl);
  }, time);
};

const mark_as_default = (index) => {
  time += speed / 2;
  setTimeout(() => {
    const d = document.querySelectorAll(".item")[index];
    d.style.background = "#bbb";
    // d.classList.remove("mark");
  }, time);
};

const remove_border = (index) => {
  time += speed / 2;
  setTimeout(() => {
    const d = document.querySelectorAll(".item")[index];
    //d.style.background = "#bbb";
    d.classList.remove("mark");
  }, time);
};

const init = () => {
  values = [];
  itemDOM.innerHTML = "";
  time = 0;
  for (var i = 0; i < N; i++) {
    values.push(Math.floor(Math.random() * 90) + 10);
    itemDOM.appendChild(createItemElement(i, values[i]));
  }

  //select_sort();
  quick_sort(0, N - 1);
};

const swap = (i, j) => {
  time += speed;
  setTimeout(() => {
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
  }, time);
};

const onClickSubmit = () => {
  const countDocument = document.getElementById("element_count");
  const radios = document.getElementsByName("speed");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      speed = radios[i].value;
      break;
    }
  }
  N = countDocument.value;
  console.log(speed, time);
  init();
};

const quick_sort = (left, right) => {
  console.log(left, right);

  if (left < right) {
    time += 1;
    setTimeout(() => {
      const pivot = values[right];
      const p = partition(left, right, pivot);
      quick_sort(left, p - 1);
      quick_sort(p + 1, right);
    }, time);
  }
};

const partition = (left, right, pivot) => {
  pivotDOM.innerHTML = pivot;
  mark_as_selected(left, "black", "mark");
  mark_as_selected(right, "black", "mark");
  let x = left,
    y = right;
  let cnt = left;
  for (var i = left; i < right; i++) {
    if (values[i] < pivot) {
      mark_as_selected(i, "pink");
      mark_as_selected(cnt, "pink");
      swap(i, cnt);
      mark_as_default(i);
      mark_as_default(cnt);
      cnt += 1;
    }
  }
  remove_border(x);
  remove_border(y);
  swap(right, cnt);
  mark_as_default(right);
  mark_as_default(left);
  mark_as_selected(cnt, "yellow");
  mark_as_default(cnt);
  return cnt;
};
