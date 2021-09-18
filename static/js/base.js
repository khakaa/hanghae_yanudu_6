console.log('%c  Bucket List  ', 'font-size: 100px; font-weight:bolder; background-color:black; color:rgb(255,255,255,1);');


//로그아웃
// function logout(){
//     $.removeCookie("mytoken", { path: "/" });
//     return (window.location.href = "/");
// }

//로그아웃 기능
function logout(){
    //날짜 객체를 생성
    let date = new Date();
    //현재시간을 얻고(getDate) 과거(-1)로 세팅(setDate)
    date.setDate(date.getDate() -1);
    //숫자로 되어있는 날짜를 몇년 몇월 몇일로 변환
    expDate=date.toUTCString();
    //쿠키의 만료시간을 지난시간인 expDate로 갱신하여 쿠키를 만료시킴
    document.cookie = `mytoken=expire; Expires=${expDate}`
    //홈페이지로 이동
    window.location.href ='/'
}

//사용권한 없음
function postingFail() {
    return alert("사용권한이 없습니다. 로그인을 해주세요.");
}
