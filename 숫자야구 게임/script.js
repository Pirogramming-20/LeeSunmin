// 초기 세팅
// 1. play 하는 게임 라운드 설정
let gameRound = 9; 

// 2. 랜덤하게 숫자 3개 뽑기
let randomNumberArray = []
let number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
for (let i=0; i<3; i++) {
    const index = Math.floor(Math.random() * (number.length-i));
    randomNumberArray.push(number[index]);
    number.splice(index, 1);
}
console.log("answer: " + randomNumberArray);

// 결과 표시 창 초기화
function reset_result() {
  const resultBox = document.querySelector(".result-display");
  while (resultBox.firstChild) {
    resultBox.removeChild(resultBox.firstChild);
  }
}
reset_result();

// 결과 출력 함수
function add_result (inputList, play_output) {
    const flag = function (play_output) {
      return play_output.every(function (element) { return element == 0; });
    };
    if (flag(play_output)) {
      yes_out_result(inputList, play_output);
    } else {
      no_out_result(inputList, play_output);
    }
    const resultContainer = document.querySelector(".result-display");
    resultContainer.scrollTop = resultContainer.scrollHeight;
}

// 결과 출력 함수
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


// check_numbers 함수에서 사용할 함수
function check_inputs(){
  const inputObj = document.querySelector(".input-box").children;
  const inputNumbers = [];
  for (let i = 0; i < 3; i++) {
    inputNumbers.push(inputObj[i].value);
  }
  // 1. 만일 숫자가 3개 모두 입력되지 않은 경우
  if (inputNumbers.includes('')){
    // input box 초기화
    for (let i = 0; i < 3; i++) {
      inputObj[i].value = '';
    }
    return false;
  }
  // 2. 만일 숫자가 3개 모두 입력된 경우 -> 리스트 출력
  else {
    return inputNumbers;
  }
}

function play_game(inputList) {
    let strike = 0;
    let ball = 0;
    // strike 와 ball 개수 세기
    for (let i=0; i<3; i++) {
        if (inputList[i] == randomNumberArray[i]) {
            strike++;
        }
        else if (randomNumberArray.includes(Number(inputList[i]))){
          ball++;
        }
    }
    return [strike, ball];
}

// submit 버튼 누르면 실행되는 함수
function check_numbers() {
    console.log("left game round: " + gameRound);
    let success_flag;
    let play_output;
    let inputList = check_inputs(); 
    if (inputList !== false) {
      gameRound--;
      play_output=play_game(inputList);
      add_result(inputList, play_output);
    }

    // 성공 or 실패 여부 따라 이미지 띄우기
    if (gameRound > 0 & play_output[0]==3) {
      success_flag = true;
      display_result(success_flag);
    }
    else if (gameRound <= 0) {
      success_flag = false;
      display_result(success_flag);
    }
}

function display_result(success_flag) {
  const resultDiv = document.querySelector(".game-result");
  const resultImg = document.createElement("img");
  if (success_flag) {
    resultImg.src = "./success.png";
  } else {
    resultImg.src = "./fail.png";
  }
  resultDiv.appendChild(resultImg);

  // 버튼 비활성화
  const myButton = document.querySelector(".submit-button"); 
  myButton.disabled = true;
}