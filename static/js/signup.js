//변수 선언

//중복체크 버튼
const idCheck = document.querySelector('.idCheck')
//회원가입 버튼
const signUp = document.querySelector('.signup-btn')

//회원가입 중복체크

//아이디 정규표현식
function is_nickname(asValue) {//아이디를 벨류값으로 받아옴
    //a~z,A~Z까지는 필수조건, a~z,A~Z,0~9,2~10글자
    var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
    //regExp로 벨류를 test해줌 (boolean값을 반환)
    return regExp.test(asValue);
}
//비밀번호 정규표현식
function is_password(asValue) {
    //정수,a~z,A~Z는 필수조건, 0~9,a~z,A~Z,!@#$%^&*은 선택조건, 8~20글자
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
    //regExp로 벨류를 test
    return regExp.test(asValue); //
}

//아이디 중복확인
function check_dup(){
    //id에 입력된 값을 username으로 변수선언
    let username = $("#id-input").val();
    
    //아이디를 입력하지 않았을때
    if(username == ""){
        //도움문구의 text를 바꿔주고(.text),warn클래스를 추가해주고(color:red),pass클래스를 제거(color:yellowgreen) 
        $("#help-id").text("아이디를 입력해주세요.").addClass("warn").removeClass("pass");
        //아이디 input에 포커싱
        $("#id-input").focus();
        //함수 종료
        return;
    }else if(!is_nickname(username)){//정규표현식에 맞지 않는 값일때
        //도움문구에 text를 바꿔주고(.text),warn클래스를 추가해주고, pass클래스 제거
        $("#help-id").text("아이디 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이").addClass("warn").removeClass("pass");
        //아이디 input에 포커싱
        $("#id-input").focus();
        //함수 종료
        return;
    }else{
        //통신 시작
        $.ajax({
            //포스트메소드
            type: "POST",
            //url
            url: "/signup/check_dup",
            //id를 username으로 받음
            data:{
                id_give:username
            },
            //success일때
            success: function (response){
                //중복일때
                if(response["exists"]){
                    //도움문구에 text바꿔주고 class추가및 제거
                    $("#help-id").text("이미 존재하는 아이디입니다.").addClass("warn").removeClass("pass");
                    //도움문구에 포커싱
                    $("#id-input").focus();
                }else{
                    //도움문구 text,class작업
                    $("#help-id").text("사용할 수 있는 아이디입니다.").addClass("pass").removeClass("warn");
                    //함수종료
                    return;
                }
            }
        })
    }
}

//회원가입
function signup(){
    //id input값
    let username = $("#id-input").val();
    //비밀번호 input값
    let password = $("#password1").val();
    //비밀번호 재확인 input값
    let password2 = $("#password2").val();

    //도움문구가 warn클래스를 가지고 있다면 (== id가 유효성을 가지지 않음. 없거나 정규표현식에 맞지않음)
    if($("#help-id").hasClass("warn")){
        //alert
        alert("아이디를 다시 확인해주세요.")
        //함수종료
        return;
    }else if(!$("#help-id").hasClass("pass")){//중복확인을 하지 않으면
        //alert
        alert("아이디 중복확인을 해주세요.")
        //함수종료
        return;
    }

    //패스워드 입력을 안하면
    if(password==""){
        //도움문구 text,클래스 변경
        $("#help-password").text("비밀번호를 입력해주세요.").addClass("warn").removeClass("pass");
        //패스워드 input에 포커싱
        $("#password1").focus();
        //함수종료
        return;
    }else if(!is_password(password)){//패스워드가 양식에 맞지 않으면
        //도움문구 text,클래스 변경
        $("#help-password").text("비밀번호 양식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*)사용가능").addClass("warn").removeClass("pass");
        //패스워드 input에 포커싱
        $("#password1").focus();
        //함수종료
        return;
    }else if(password != password2){ //패스워드와 패스워드 재확인 값이 다르면
        //비밀번호 재확인 text,클래스 변경
        $("#help-password2").text("비밀번호를 확인해주세요").addClass("warn").removeClass("pass");
        //비밀번호 input에 포커싱
        $("#password1").focus();
        //함수종료
        return;
    }else{
        //통신 시작
        $.ajax({
            //포스트 메소드
            type: "POST",
            //signup/post url로 연결
            url:"signup/post",
            //데이터 전송
            data:{
                id_give: username,
                password_give:password
            },
            //리스폰스
            success:function(response){
                //alert
                alert("회원가입을 축하드립니다!")
                //login페이지로 이동
                window.location.replace("/login")
            }
        })
    }
}

//변수에 이벤트추가
idCheck.addEventListener('click',check_dup)
signUp.addEventListener('click', signup)