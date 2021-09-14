//변수 선언
const idCheck = document.querySelector('.idCheck')
const signUp = document.querySelector('.signup-btn')

//회원가입 중복체크

function is_nickname(asValue) {
    var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
    return regExp.test(asValue);
}

function is_password(asValue) {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
    return regExp.test(asValue);
}

function check_dup(){
    let username = $("#id-input").val();
    
    if(username == ""){
        $("#help-id").text("아이디를 입력해주세요.").addClass("warn").removeClass("pass");
        $("#id-input").focus();
        return;
    }else if(!is_nickname(username)){
        $("#help-id").text("아이디 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이").addClass("warn").removeClass("pass");
        $("#id-input").focus();
        return;
    }else{
        $.ajax({
            type: "POST",
            url: "/signup/check_dup",
            data:{
                id_give:username
            },
            success: function (response){
                if(response["exists"]){
                    $("help-id").text("이미 존재하는 아이디입니다.").addClass("warn").removeClass("pass");
                    $("#id-input").focus();
                }else{
                    $("#help-id").text("사용할 수 있는 아이디입니다.").addClass("pass").removeClass("warn");
                    return;
                }
            }
        })
    }
}

//회원가입
function signup(){
    let username = $("#id-input").val();
    let password = $("#password1").val();
    let password2 = $("#password2").val();

    if($("#help-id").hasClass("warn")){
        alert("아이디를 다시 확인해주세요.")
        return;
    }else if(!$("#help-id").hasClass("pass")){
        alert("아이디 중복확인을 해주세요.")
        return;
    }

    if(password==""){
        $("help-password").text("비밀번호를 입력해주세요.").addClass("warn").removeClass("pass");
        $("#password1").focus();
        return;
    }else if(is_password(password)){
        $("help-password").text("비밀번호 양식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*)사용가능").addClass("warn").removeClass("pass");
        $("#password1").focus();
        return;
    }else if(password != password2){
        $("help-password2").text("비밀번호를 확인해주세요").addClass("warn").removeClass("pass");
        $("#password1").focus();
        return;
    }else{
        $.ajax({
            type: "POST",
            url:"signup/post",
            data:{
                user_give: username,
                password_give:password
            },
            success:function(response){
                alert("회원가입을 축하드립니다!")
                window.location.replace("/login")
            }
        })

    }
}

//변수에 이벤트추가
idCheck.addEventListener('click',check_dup)
signUp.addEventListener('click', signup)