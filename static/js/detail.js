//변수선언

//삭제버튼
const del_btn = document.querySelector('.btn_deletemodal')
//닫기버튼
const cancel_btn = document.querySelector('.btn-modalclose')
//오른쪽 위에 x버튼
const close_btn = document.querySelector('.btn-close')
//모달 전체
const modal = document.querySelector('.modal')
//예 삭제하겠습니다 버튼
const del_check_btn = document.querySelector('.btn-del')


//삭제 확인 모달창
// function delmodal(){
//     $('.modal').addClass('show')
// }
// function closeModal(){
//     $('.modal').removeClass('show')
// }


//삭제 확인 모달창 함수
function delmodal(){
  //모달에 show(display:block)클래스가 추가됨
    modal.classList.add('show');
}
function closeModal(){
  //모달에 show(display:block)클래스가 삭제됨
    modal.classList.remove('show');
}


//삭제
// function delete_post(){
//     let post_id = window.location.pathname.split('/')[2]
//     console.log(post_id)
//     $.ajax({
//         type: "POST",
//         url: "/api/list_detail",
//         data : {id_give : post_id},
//         // cache: false,
//         // contentType: false,
//         // processData: false,
    
//         success: function (response) {
//           alert(response['msg']);
//           window.location.href = '/';
//         },
//       });
// }

//삭제함수
function delete_post(){
  //url을 /로 나누고 그중 2번째값(posting의 id)을 가져옴
  let post_id = window.location.pathname.split('/')[2];
  //서버통신 시작 url은 /api/list_detail
  fetch('/api/list_detail',{
    //method는 post method
    method: "POST",
    //헤더 옵션으로 json포멧을 사용한다는 것을 알림
    headers: {"Content-Type": "application/json"},
    //자바스크립트의 값을 json 문자열로 변환하여 body옵션으로 설정
    body: JSON.stringify({
      id_give : post_id
    }),
  })
  //응답을 받는 부분 promise 방식으로 함수 실행이 끝나면 그 다음으로 할 일을 정해준다.
  .then((res)=>{
    //응답을 객체형태로 받아서 json()을 해줌.
    //json()는 응답 스트림을 가져와 읽고 다읽은 body의 텍스트를 promise 형태로 반환
    return res.json();
  }).then((data)=>{ 
    //반환받은 것에서 msg를 출력해서 alert
    alert(data.msg); 
    //홈페이지로 이동
    window.location.href ='/';
  })
}

//사용권한이 없을때 발생하는 함수.
function updateFail(){
  return alert('사용권한이 없습니다.')
}

//이벤트추가

//삭제버튼을 클릭하면 삭제확인모달이 뜨는 함수를 실행하는 클릭이벤트 발생
del_btn.addEventListener('click', delmodal);
//취소버튼을 누르면 삭제확인 모달이 닫히는 함수를 실행하는 클릭이벤트 발생
cancel_btn.addEventListener('click', closeModal);
//x버튼을 누르면 삭제확인 모달이 닫히는 함수를 실행하는 클릭이벤트 발생
close_btn.addEventListener('click', closeModal);
//모달이 아닌 함수를 누르면 삭제확인 모달이 닫히는 함수를 실행하는 클릭이벤트 발생 (이벤트 전파가 일어나서 막아야함)
modal.addEventListener('click', closeModal);
//예 삭제하겠습니다를 클릭하면 delete_post함수 발생
del_check_btn.addEventListener('click', delete_post);