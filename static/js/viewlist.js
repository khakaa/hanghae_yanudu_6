function likelist(id,likes,type) {
     $.ajax({
         type: 'POST',
         url: '/like_update',
         data: {_id_give : id,likes_give : likes, type_give:type},
         success: function (response) {
             alert(response['msg']);
             console.log(response)
             window.location.reload('/')
         }
     });
}


