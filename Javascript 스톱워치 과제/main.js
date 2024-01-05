const timer = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const second = document.getElementById("sec");
const milli_second = document.getElementById("milli-sec");
const recordList = document.getElementById("records-list");
const recordLiElements = recordList.querySelectorAll("li");
const allDeleteBtn = document.getElementById("all-delete-button");

const binBtn = document.getElementById("bin-button");

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

binBtn.addEventListener("click", delete_record);

recordLiElements.forEach((liElement) => {
  liElement.addEventListener("click", add_check);
});

allDeleteBtn.addEventListener("click", delete_all_records);

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
  allDeleteBtn.addEventListener("click", delete_all_records);
}

function add_check(e) {
  console.log("liElement action");
  console.log(e.target.tagName);
  if (e.target.tagName === "I") {
    if (e.target.classList.contains("ri-checkbox-circle-line")) {
      e.target.classList.remove("ri-checkbox-circle-line");
      e.target.classList.add("ri-circle-line");

      // 전체 노드 체크 해제되도록
      if (allDeleteBtn.classList.contains("ri-checkbox-circle-line")) {
        allDeleteBtn.classList.remove("ri-checkbox-circle-line");
        allDeleteBtn.classList.add("ri-circle-line");
      }

      return;
    } else {
      e.target.classList.remove("ri-circle-line");
      e.target.classList.add("ri-checkbox-circle-line");

      //전체 노드 체크 되었는지 확인하고, 전체 체크되어있으면 전체 삭제 체크
      let flag = true;
      const currentLiElements = Array.from(recordList.querySelectorAll("li"));
      currentLiElements.forEach((liElement) => {
        if (liElement.children[0].classList.contains("ri-circle-line")) {
          flag = false;
          return;
        }
      });

      if (flag === true && allDeleteBtn.classList.contains("ri-circle-line")) {
        allDeleteBtn.classList.remove("ri-circle-line");
        allDeleteBtn.classList.add("ri-checkbox-circle-line");
      }
    }
  }
}

// 체크된 항목 삭제
function delete_record() {
  const checkedLiElements = recordList.querySelectorAll(
    ".ri-checkbox-circle-line"
  );
  const parentElements = Array.from(checkedLiElements).map(
    (element) => element.parentNode
  );
  console.log(parentElements);
  parentElements.forEach((liElement) => {
    console.log(liElement);
    liElement.remove();
  });
  if (allDeleteBtn.classList.contains("ri-checkbox-circle-line")) {
    allDeleteBtn.classList.remove("ri-checkbox-circle-line");
    allDeleteBtn.classList.add("ri-circle-line");
  }
  console.log("delete_record action");
  console.log(checkedLiElements);
}

// 전체 선택 및 해제
function delete_all_records(e) {
  console.log(e.target.tagName);
  if (e.target.tagName === "I") {
    const currentLiElements = Array.from(recordList.querySelectorAll("li"));
    // 체크가 안되어 있으면 체크되도록
    if (e.target.classList.contains("ri-circle-line")) {
      e.target.classList.remove("ri-circle-line");
      e.target.classList.add("ri-checkbox-circle-line");

      // 자식 노드들도
      currentLiElements.forEach((liElement) => {
        if (liElement.children[0].classList.contains("ri-circle-line")) {
          liElement.children[0].classList.remove("ri-circle-line");
          liElement.children[0].classList.add("ri-checkbox-circle-line");
          return;
        }
      });
    } else {
      //체크가 되어있으면 체크해제하도록
      e.target.classList.remove("ri-checkbox-circle-line");
      e.target.classList.add("ri-circle-line");

      //자식 노드들도
      currentLiElements.forEach((liElement) => {
        if (
          liElement.children[0].classList.contains("ri-checkbox-circle-line")
        ) {
          liElement.children[0].classList.remove("ri-checkbox-circle-line");
          liElement.children[0].classList.add("ri-circle-line");
          return;
        }
      });
    }
  }
}
