//변수선언
const del_btn = document.querySelector('.btn_deletemodal')
const cancel_btn = document.querySelector('.btn-cancel')
const close_btn = document.querySelector('.btn-close')
const modal = document.querySelector('.modal')
const del_check_btn = document.querySelector('.btn-del')
//삭제 확인 모달창
function delmodal(){
    $('.modal').addClass('show')
}
function closeModal(){
    $('.modal').removeClass('show')
}

//삭제
function delete_post(){
    let post_id = window.location.pathname.split('/')[2]
    console.log(post_id)
    $.ajax({
        type: "POST",
        url: "/api/list_detail",
        data : {id_give : post_id},
        // cache: false,
        // contentType: false,
        // processData: false,
    
        success: function (response) {
          alert(response['msg']);
          window.location.href = '/';
        },
      });
}

function updateFail(){
  return alert('사용권한이 없습니다.')
}

//이벤트추가
del_btn.addEventListener('click', delmodal);
cancel_btn.addEventListener('click', closeModal);
close_btn.addEventListener('click', closeModal);
modal.addEventListener('click', closeModal);
del_check_btn.addEventListener('click', delete_post);