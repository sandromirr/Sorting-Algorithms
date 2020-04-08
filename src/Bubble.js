let N = 10;
let values = [];
let time = 0;

let speed = 10;

let selected;
let min;

let game = false;

const itemDOM = document.querySelector(".items");
const maxDOM = document.querySelector(".max");

let tm1, tm2, tm3;

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
  tm1 = setTimeout(() => {
    const d = document.querySelectorAll(".item")[index];
    d.style.background = color;
  }, speed * time);
};

const mark_as_default = (index) => {
  time += 1;
  tm2 = setTimeout(() => {
    const d = document.querySelectorAll(".item")[index];
    d.style.background = "#bbb";
  }, speed * time);
};

const init = () => {
  values = [];
  itemDOM.innerHTML = "";
  time = 0;
  for (var i = 0; i < N; i++) {
    values.push(Math.floor(Math.random() * 90) + 10);
    itemDOM.appendChild(createItemElement(i, values[i]));
  }

  bubble_sort();
};

const swap = (i, j) => {
  time += 1;
  tm3 = setTimeout(() => {
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

const bubble_sort = () => {
  for (var i = 0; i < N; i += 1) {
    //mark_as_selected(i, "green");
    let swaped = false;
    for (var j = 0; j < N - i - 1; j += 1) {
      mark_as_selected(j, "blue");
      mark_as_selected(j + 1, "blue");
      swap(j, j + 1);
      if (values[j + 1] > values[j]) swaped = true;
      mark_as_default(j);
      mark_as_default(j + 1);
    }
    if (!swaped) return;
  }
};

const onClickSubmit = () => {
  //alert();
  // setTimeout(())
  restart();
  const countDocument = document.getElementById("element_count");
  const radios = document.getElementsByName("speed");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      speed = radios[i].value;
      break;
    }
  }

  N = countDocument.value;
  init();
};

const restart = () => {
  for (var i = 0; i < tm1; i++) {
    clearTimeout(i);
  }
  for (var i = 0; i < tm2; i++) {
    clearTimeout(i);
  }

  for (var i = 0; i < tm3; i++) {
    clearTimeout(i);
  }

  //alert();
};
