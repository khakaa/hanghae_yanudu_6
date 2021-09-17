function likelist(id,likes,type) {
    // ajax 통신으로 같은 url을 가지고 있는 서버에 data를 넘겨주며 서버로부터 response값을 반환
    $.ajax({
         type: 'POST',
         url: '/like_update',
         data: {_id_give : id,likes_give : likes, type_give:type},
         success: function (response) {
             alert(response['msg']);
             //localhost:5000/의 주소로 새로고침
             window.location.reload('/')
         }
     });
}


