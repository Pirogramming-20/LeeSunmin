const BookMarkBtns = document.querySelectorAll(".bookmark-btn");

// 각 버튼에 대해 이벤트 리스너 등록
BookMarkBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const ideaId = this.value; // 클릭된 버튼의 value 가져오기
    getBookMark(ideaId);
  });
});

async function getBookMark(id) {
  const url = "/bookmark/" + id + "/";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      likeHandleResponse(id, data.bookmark);
    });
}

const likeHandleResponse = (id, bookmark) => {
  const element = document.querySelector(`#bookmark-btn-${id} i`);
  if (bookmark) {
    element.classList.remove("ri-star-line");
    element.classList.add("ri-star-fill");
  } else {
    element.classList.remove("ri-star-fill");
    element.classList.add("ri-star-line");
  }
};

async function changeInterest(ideaId, delta) {
  const url = `/change_interest/${ideaId}/${delta}/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const interestElement = document.getElementById(`interest-${ideaId}`);
      interestElement.innerText = data.interest;
    })
    .catch((error) => console.error("Error:", error));
}
