const signup = document.querySelector(".signup-btn")
const cancel = document.querySelector(".cancel-btn")

function sign(){
    $(".login-title").toggleClass('hidden')
    $(".signup-title").toggleClass('hidden')
    $(".pwCheck").toggleClass('hidden')
    $(".idCheck").toggleClass('hidden')
    $(".login-btn").toggleClass('hidden')
    $(".signup-btn").toggleClass('hidden')
    $(".flex-between").toggleClass('hidden')
}

signup.addEventListener('click', sign)
cancel.addEventListener('click', sign)