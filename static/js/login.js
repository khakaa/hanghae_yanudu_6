//변수 설정

//로그인버튼
const loginBtn = document.querySelector('.loginBtn');
//아이디 input
const idInput = document.querySelector('.ID');
//패스워드 input
const pwInput = document.querySelector('.PW');
//아이디 input 아래있는 도움문구
const idHelp = document.querySelector('#help-id-login');
//패스워드 input 아래있는 도움문구
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


//로그인 함수
function sign_in(){
    //id는 아이디input 안에 들어간 value값
    let id = idInput.value;
    //password는 패스워드 input 안에 들어간 value값
    let password = pwInput.value;
    //date 객체 생성하여 만료시간으로 변수설정
    let expTime = new Date();
    //현재시간을 가져와서 거기에 12시간 (12*60*60*1000ms = 12시간)
    expTime.setTime(expTime.getTime() + (12*60*60*1000));

    //id에 아무것도 입력하지않으면
    if(id === ""){
        //도움문구가 아이디를 입력해달라는 문구로 대체
        idHelp.innerHTML = "아이디를 입력해주세요.";
        //도움문구에 warn클래스 추가(color:red)
        idHelp.classList.add('warn');
        //도움문구에 pass클래스 제거(color:yellowgreen)
        idHelp.classList.remove('pass');
        //id입력창에 포커스가 가게함
        idInput.focus();
        //함수 종료
        return;
    }else{ //id에 무언가를 입력 한다면
        //도움문구를 없앰
        idHelp.innerHTML = "";
        //도움문구에 warn클래스 제거
        idHelp.classList.remove("warn");
    }
    //패스워드에 아무것도 입력하지 않으면
    if(password === ""){
        //도움문구에 비밀번호를 입력해달라는 문구로 대체
        pwHelp.innerHTML = "비밀번호를 입력해주세요";
        //도움문구에 warn클래스 추가
        pwHelp.classList.add('warn');
        //도움문구에 pass클래스 제거
        pwHelp.classList.remove('pass');
        //패스워드 입력창에 포커스
        pwInput.focus();
        //함수종료
        return;
    }else{//비밀번호에 무언가 입력한다면
        //도움문구 없앰
        pwHelp.innerHTML = "";
        //도움문구에 warn클래스 없앰
        pwHelp.classList.remove('warn');
    }fetch('/login/signin',{ //비동기통신 시작
        //post Method
        method: "POST",
        //헤더 옵션으로 json포멧임을 명시
        headers: { "Content-Type": "applcation/json"},
        //객체를 문자열화 해줌
        body: JSON.stringify({
            id_give:id,
            password_give:password
        }),
    })
    //promise
    .then((res) => {
        //응답을 json()을 하여 데이터를 사용할 수 있도록 해줌
        return res.json();
    })
    .then((data) =>{
        //만약에 app.py에서 return값이 제대로 내려왔다면
        if(data.result === "success"){
            //쿠키에 토큰(data.token)을 담아서 쿠키만료시간은 12시간으로 설정(expTime)함
            document.cookie = `mytoken=${data.token}; Expires=${expTime}`;
            //홈페이지로 이동
            window.location.href ='/'
        }else{ //return이 제대로 안내려졌다면
            //에러
            alert(data.msg)
        }
    })
}


//이벤트 추가
loginBtn.addEventListener('click', sign_in)

