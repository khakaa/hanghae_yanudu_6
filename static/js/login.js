//변수 설정
const loginBtn = document.querySelector('.loginBtn');

//로그인
function sign_in(){
    let id = $(".ID").val();
    let password = $(".PW").val();

    if(id ==""){
        $("#help-id-login").text("아이디를 입력해주세요").addClass('warn').removeClass('pass');
        $(".ID").focus();
        return;
    }else {
        $("#help-id-login").text("").removeClass("warn")
    }
    if(password ==""){
        $("#help-password-login").text("비밀번호를 입력해주세요").addClass('warn').removeClass('pass');
        $(".PW").focus();
        return;
    }else{
        $("#help-password-login").text("").removeClass("wawrn")
    }
    $.ajax({
        type:'POST',
        url:'/login/signin',
        data:{
            id_give:id,
            password_give:password
        },
        success:function(response){
            if(response['result']=='success'){
            $.cookie('mytoken', response['token'],{expires:(((1/24)/60)/60)*5}, {path:'/'});
            window.location.replace('/');
            }else{
                alert(response['msg']);
            }
        }
    })
}

//이벤트 추가
loginBtn.addEventListener('click', sign_in)

