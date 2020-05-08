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
  console.log(values);
  console.log(merge_sort(values));
};

const change = (i, val) => {
  time += speed / 2;
  setTimeout(() => {
    values[i] = val;
    const first = document.querySelectorAll(".item")[i];
    first.style.height = `${2 * val}px`;
    first.innerHTML = `${val}`;
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

const merge_sort = (arr) => {
  if (arr.length === 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
  const left = arr.slice(0, middle); // items on the left side
  const right = arr.slice(middle); // items on the right side

  return merge(merge_sort(left), merge_sort(right));
};

const merge = (left, right) => {
  let result = [];
  let indexLeft = 0;
  let indexRight = 0;
  let cnt = 0;

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] < right[indexRight]) {
      result.push(left[indexLeft]);
      change(result.length - 1, left[indexLeft]);
      indexLeft++;
    } else {
      result.push(right[indexRight]);
      change(result.length - 1, right[indexRight]);
      indexRight++;
    }
    cnt += 1;
  }

  let ll = left.slice(indexLeft);
  //console.log(ll);
  for (var i = 0; i < ll.length; i++) {
    change(cnt, ll[i]);
    cnt += 1;
  }
  let rr = right.slice(indexRight);
  //console.log(ll);
  for (var i = 0; i < rr.length; i++) {
    change(cnt, rr[i]);
    cnt += 1;
  }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
};
