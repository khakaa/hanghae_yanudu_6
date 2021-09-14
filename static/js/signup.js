const idCheck = document.querySelector('.idCheck')

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
    console.log(username)
    if(username == ""){
        $("#help-id").text("아이디를 입력해주세요.").addClass("warn").removeClass("pass");
        $("#id-input").focus();
        return;
    }else if(!is_nickname(username)){
        $("#help-id").text("아이디 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이").addClass("warn").removeClass("pass");
        $("#id-input").focus();
        return;
    }else{
        // $.ajax({
        //     type: "POST",
        //     url: "/signup/check_dup",
        //     data:{
        //         id_give:username
        //     },
        //     success: function (response){
        //         if(response["exists"]){
        //             $("help-id").text("이미 존재하는 아이디입니다.").addClass("warn").removeClass("pass");
        //             $("#id-input").focus();
        //         }else{
        //             $("#help-id").text("사용할 수 있는 아이디입니다.").addClass("pass").removeClass("warn");
        //             return;
        //         }
        //     }
        // })
        $("#help-id").text("사용할 수 있는 아이디입니다.").addClass("pass").removeClass("warn");
        return;
    }
}

idCheck.addEventListener('click',check_dup)

// function check_dup() {
//     let username = $("#input-username").val()
//     console.log(username)
//     if (username == "") {
//         $("#help-id").text("아이디를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
//         $("#input-username").focus()
//         return;
//     }
//     if (!is_nickname(username)) {
//         $("#help-id").text("아이디의 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이").removeClass("is-safe").addClass("is-danger")
//         $("#input-username").focus()
//         return;
//     }
//     $("#help-id").addClass("is-loading")
//     $.ajax({
//         type: "POST",
//         url: "/sign_up/check_dup",
//         data: {
//             username_give: username
//         },
//         success: function (response) {

//             if (response["exists"]) {
//                 $("#help-id").text("이미 존재하는 아이디입니다.").removeClass("is-safe").addClass("is-danger")
//                 $("#input-username").focus()
//             } else {
//                 $("#help-id").text("사용할 수 있는 아이디입니다.").removeClass("is-danger").addClass("is-success")
//             }
//             $("#help-id").removeClass("is-loading")

//         }
//     });
// }