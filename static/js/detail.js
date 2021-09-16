//변수선언
const del_btn = document.querySelector('.btn_deletemodal')
const cancel_btn = document.querySelector('.btn-cancel')
const close_btn = document.querySelector('.btn-close')
const modal = document.querySelector('.modal')


//삭제 확인 모달창
// function delmodal(){
//     $('.modal').addClass('show')
// }
// function closeModal(){
//     $('.modal').removeClass('show')
// }
function delmodal(){
    modal.classList.add('show');
}
function closeModal(){
    modal.classList.remove('show');
}


//삭제
function del(id){

}


//이벤트추가
del_btn.addEventListener('click', delmodal);
cancel_btn.addEventListener('click', closeModal);
close_btn.addEventListener('click', closeModal);
modal.addEventListener('click', closeModal);