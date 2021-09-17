//변수 설정
const loginBtn = document.querySelector('.loginBtn');
const idInput = document.querySelector('.ID');
const pwInput = document.querySelector('.PW');
const idHelp = document.querySelector('#help-id-login');
const pwHelp = document.querySelector('#help-password-login')


//로그인
// function sign_in(){
//     let id = $(".ID").val();
//     let password = $(".PW").val();
//     let expTime = new Date();
//     expTime.setTime(expTime.getTime() + (12*60*60*1000));

//     if(id ==""){
//         $("#help-id-login").text("아이디를 입력해주세요").addClass('warn').removeClass('pass');
//         $(".ID").focus();
//         return;
//     }else {
//         $("#help-id-login").text("").removeClass("warn")
//     }
//     if(password ==""){
//         $("#help-password-login").text("비밀번호를 입력해주세요").addClass('warn').removeClass('pass');
//         $(".PW").focus();
//         return;
//     }else{
//         $("#help-password-login").text("").removeClass("warn")
//     }
//     $.ajax({
//         type:'POST',
//         url:'/login/signin',
//         data:{
//             id_give:id,
//             password_give:password
//         },
//         success:function(response){
//             if(response['result']=='success'){
//             $.cookie('mytoken', response['token'],{expires:expTime}, {path:'/'});
//             window.location.replace('/');
//             }else{
//                 alert(response['msg']);
//             }
//         }
//     })
// }

function sign_in(){
    let id = idInput.value;
    let password = pwInput.value;
    let expTime = new Date();
    expTime.setTime(expTime.getTime() + (12*60*60*1000));

    if(id === ""){
        idHelp.innerHTML = "아이디를 입력해주세요.";
        idHelp.classList.add('warn');
        idHelp.classList.remove('pass');
        idInput.focus();
        return;
    }else{
        idHelp.innerHTML = "";
        idHelp.classList.remove("warn");
    }
    if(password === ""){
        pwHelp.innerHTML = "비밀번호를 입력해주세요";
        pwHelp.classList.add('warn');
        pwHelp.classList.remove('pass');
        pwInput.focus();
        return;
    }else{
        pwHelp.innerHTML = "";
        pwHelp.classList.remove('warn');
    }fetch('/login/signin',{
        method: "POST",
        headers: { "Content-Type": "applcation/json"},
        body: JSON.stringify({
            id_give:id,
            password_give:password
        }),
    })
    .then((res) => {
        return res.json();
    })
    .then((data) =>{
        console.log(data)
        if(data.result === "success"){
            document.cookie = `mytoken=${data.token}; Expires=${expTime}`;
            window.location.href ='/'
        }else{
            alert(data.msg)
        }
    })
}


//이벤트 추가
loginBtn.addEventListener('click', sign_in)

