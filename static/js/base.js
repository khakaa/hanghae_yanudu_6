//로그아웃
function logout(){
    $.ajax({
        url: "user/logout",
        type: "GET",
        data: {},
        success: function (response) {
            $.removeCookie("mytoken", { path: "/" });
            return (window.location.href = "/");
        }
    });
}

//사용권한 없음
function postingFail() {
    return alert("사용권한이 없습니다. 로그인을 해주세요.");
}
