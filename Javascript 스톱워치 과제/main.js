const timer = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const second = document.getElementById("sec");
const milli_second = document.getElementById("milli-sec");
const recordList = document.getElementById("records-list");
const recordLiElements = recordList.querySelectorAll("li");

let seconds = 0;
let tenMill = 0;

startBtn.addEventListener("click", () => {
    console.log("startBtn action");
    intervalId = setInterval(operateTimer, 10);
});

stopBtn.addEventListener("click", () => {
    console.log("stopBtn action");
    clearInterval(intervalId);
    add_record();
});

resetBtn.addEventListener("click", () => {
    console.log("resetBtn action");
    seconds = 0;
    tenMill = 0;
    second.innerHTML = "00";
    milli_second.innerHTML = "00";
});

recordLiElements.forEach((liElement) => {
    liElement.addEventListener("click", add_check);
});


function operateTimer() {
  tenMill++;
  milli_second.textContent = tenMill > 9 ? tenMill : "0" + tenMill;
  if (tenMill > 99) {
    seconds++;
    second.textContent = seconds > 9 ? seconds : "0" + seconds;
    tenMill = 0;
    milli_second.textContent = "00";
  }
  if (seconds > 59) {
    console.log("seconds > 59");
    return;
  }
}

function add_record() {
  let formattedSecond = seconds.toString().padStart(2, "0");
  let formattedMill = tenMill.toString().padStart(2, "0");

  const li = document.createElement("li");
  const icon = document.createElement("i");
  icon.classList.add("ri-circle-line");
  li.innerHTML = `${icon.outerHTML} ${formattedSecond}:${formattedMill}`;

  recordList.appendChild(li);
  // 새로 생성된 li 태그에 이벤트 리스너 추가
  li.addEventListener("click", add_check);
}

function add_check(e) {
  console.log("liElement action");
  e.target.classList.remove("ri-circle-line");
  e.target.classList.add("ri-checkbox-circle-line");
}

