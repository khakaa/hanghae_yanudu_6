console.log('%c  Bucket List  ', 'font-size: 100px; font-weight:bolder; background-color:black; color:rgb(255,255,255,1);');


//로그아웃
// function logout(){
//     $.removeCookie("mytoken", { path: "/" });
//     return (window.location.href = "/");
// }

function logout(){
    let date = new Date();
    date.setDate(date.getDate() -1);
    expDate=date.toUTCString();
    document.cookie = `mytoken=expire; Expires=${expDate}`
    window.location.href ='/'
}

//사용권한 없음
function postingFail() {
    return alert("사용권한이 없습니다. 로그인을 해주세요.");
}
