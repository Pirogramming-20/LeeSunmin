// 초기 세팅
// 1. play 하는 게임 라운드 설정
let gameRound = 9;

// 2. 랜덤하게 숫자 3개 뽑기
let randomNumberArray = [];
let number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 0; i < 3; i++) {
  const index = Math.floor(Math.random() * (number.length - i));
  randomNumberArray.push(number[index]);
  number.splice(index, 1);
}
console.log("answer: " + randomNumberArray);

// 3. 결과 표시 창 초기화
function reset_result() {
  const resultBox = document.querySelector(".result-display");
  while (resultBox.firstChild) {
    resultBox.removeChild(resultBox.firstChild);
  }
}
reset_result();

// 결과 출력 함수
function add_result(inputList, play_output) {
  const flag = function (play_output) {
    return play_output.every(function (element) {
      return element == 0;
    });
  };
  if (flag(play_output)) {
    yes_out_result(inputList, play_output);
  } else {
    no_out_result(inputList, play_output);
  }
  const resultContainer = document.querySelector(".result-display");
  resultContainer.scrollTop = resultContainer.scrollHeight;
}

// 결과 출력 함수 1: out 이 없을 때 출력
function no_out_result(inputList, play_output) {
  const parentElement = document.querySelector(".result-display");

  const newResultDiv = document.createElement("div");
  newResultDiv.className = "check-result";

  const leftDiv = document.createElement("div");
  leftDiv.className = "left";
  leftDiv.innerText = inputList[0] + " " + inputList[1] + " " + inputList[2];

  const colonTextNode = document.createTextNode(" : ");
  const rightDiv = document.createElement("div");
  rightDiv.className = "right";

  const strikeTextNode = document.createTextNode(" " + play_output[0] + " ");
  const strikeDiv = document.createElement("div");
  strikeDiv.className = "strike num-result";
  strikeDiv.innerText = "S";

  const ballTextNode = document.createTextNode(" " + play_output[1] + " ");
  const ballDiv = document.createElement("div");
  ballDiv.className = "ball num-result";
  ballDiv.innerText = "B";

  rightDiv.appendChild(strikeTextNode);
  rightDiv.appendChild(strikeDiv);
  rightDiv.appendChild(ballTextNode);
  rightDiv.appendChild(ballDiv);

  newResultDiv.appendChild(leftDiv);
  newResultDiv.appendChild(colonTextNode);
  newResultDiv.appendChild(rightDiv);

  parentElement.appendChild(newResultDiv);
}

// 결과 출력 함수 2: out 이 있을 때 출력
function yes_out_result(inputList, play_output) {
  const parentElement = document.querySelector(".result-display");

  const newResultDiv = document.createElement("div");
  newResultDiv.className = "check-result";

  const leftDiv = document.createElement("div");
  leftDiv.className = "left";
  leftDiv.innerText = inputList[0] + " " + inputList[1] + " " + inputList[2];

  const colonTextNode = document.createTextNode(" : ");
  const rightDiv = document.createElement("div");
  rightDiv.className = "right";

  const outDiv = document.createElement("div");
  outDiv.className = "out num-result";
  outDiv.innerText = "O";

  rightDiv.appendChild(outDiv);

  newResultDiv.appendChild(leftDiv);
  newResultDiv.appendChild(colonTextNode);
  newResultDiv.appendChild(rightDiv);

  parentElement.appendChild(newResultDiv);
}

// 입력값 확인 함수
// 1. 입력값 초기화 함수
function reset_input() {
  const inputObj = document.querySelector(".input-box").children;
  for (let i = 0; i < 3; i++) {
    inputObj[i].value = "";
  }
}

//2. 입력값 확인 + 유효하면 입력값 list로 반환
function check_inputs() {
  const inputObj = document.querySelector(".input-box").children;
  const inputNumbers = [];
  for (let i = 0; i < 3; i++) {
    inputNumbers.push(inputObj[i].value);
  }
  if (inputNumbers.includes("")) {
    reset_input();
    return false;
  } else {
    reset_input();
    return inputNumbers;
  }
}

// 게임 진행 함수: [strike, ball] 반환
function play_game(inputList) {
  let strike = 0;
  let ball = 0;
  for (let i = 0; i < 3; i++) {
    if (inputList[i] == randomNumberArray[i]) {
      strike++;
    } else if (randomNumberArray.includes(Number(inputList[i]))) {
      ball++;
    }
  }
  return [strike, ball];
}

// 결과 image 출력 함수
function display_result(success_flag) {
  const resultDiv = document.querySelector(".game-result");
  const resultImg = document.createElement("img");
  if (success_flag) {
    resultImg.src = "./success.png";
  } else {
    resultImg.src = "./fail.png";
  }
  resultDiv.appendChild(resultImg);

  const myButton = document.querySelector(".submit-button");
  myButton.disabled = true;
}

// submit 버튼 누르면 실행되는 함수
function check_numbers() {
  let success_flag;
  let play_output;
  let inputList = check_inputs();
  if (inputList !== false) {
    gameRound--;
    play_output = play_game(inputList);
    add_result(inputList, play_output);
    // 성공 or 실패 여부 따라 이미지 띄우기
    if ((gameRound > 0) & (play_output[0] == 3)) {
      success_flag = true;
      display_result(success_flag);
    } else if (gameRound <= 0) {
      success_flag = false;
      display_result(success_flag);
    }
  }
  console.log("left game round: " + gameRound);
}
