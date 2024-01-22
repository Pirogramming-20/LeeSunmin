// 댓글 작성
const requestComment = new XMLHttpRequest();
const onClickComment = (id, comment) => {
  const url = "/comments/create/";
  requestComment.open("POST", url, true);
  requestComment.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  requestComment.send(JSON.stringify({ id: id, comment: comment }));
};

requestComment.onreadystatechange = () => {
  if (requestComment.readyState === XMLHttpRequest.DONE) {
    if (requestComment.status < 400) {
      const { id, comment, writer, comment_id } = JSON.parse(
        requestComment.response
      );
      const commentTag = document.createElement("p");
      commentTag.innerHTML = `${writer}: ${comment} <button onclick="onClickDelete(${comment_id})" class="btn btn-outline-dark">삭제</button>`;
      commentTag.className = "post-comment";
      commentTag.id = `comment-${comment_id}`;
      const inputTag = document.querySelector(`#comment-content-${id}`);
      inputTag.value = "";
      const insertTag = document.querySelector(
        `#post-item-${id} .post-comment-write`
      );
      insertTag.insertAdjacentHTML("beforebegin", commentTag.outerHTML);
    }
  }
};

// 댓글 삭제
const requestDelete = new XMLHttpRequest();
const onClickDelete = (id) => {
  const url = `/comments/delete/${id}/`;
  requestDelete.open("POST", url, true);
  requestDelete.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  requestDelete.send(JSON.stringify({ comment_id: id }));
};

requestDelete.onreadystatechange = () => {
  if (requestDelete.readyState === XMLHttpRequest.DONE) {
    if (requestDelete.status < 400) {
      const { comment_id } = JSON.parse(requestDelete.response);
      if (comment_id === null) {
        return;
      }
      const commentTag = document.querySelector(`#comment-${comment_id}`);
      commentTag.remove();
    }
  }
};

// 좋아요 관리
const requestLike = new XMLHttpRequest();
const onClickLike = (post_id, request_user) => {
  const url = `/like/${post_id}/`;
  requestLike.open("POST", url, true);
  requestLike.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  requestLike.send(
    JSON.stringify({ post_id: post_id, request_user: request_user })
  );
};

requestLike.onreadystatechange = () => {
  if (requestLike.readyState === XMLHttpRequest.DONE) {
    if (requestLike.status < 400) {
      const { post_id, type } = JSON.parse(requestLike.response);
      const likeTag = document.querySelector(`#post-item-${post_id} .post-like`);
      const likeHTML = likeTag.innerHTML;
      const [likeText, likeCount] = likeHTML.split(" ");
      const likeBtn = document.querySelector(
        `#post-item-${post_id} .heart`
      );
      let count = likeCount;
      if (type === "like") {
        count = Number(likeCount) + 1;
        likeBtn.innerHTML = `<i class="ri-heart-3-fill"></i>`;
      }
      else {
        count = Number(likeCount) - 1;likeBtn.innerHTML = `<i class="ri-heart-3-line"></i>`;
      }
      likeTag.innerHTML = `${likeText} ${count}`;

    }
  }
};
