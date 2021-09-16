    function likelist(id) {
         $.ajax({
             type: 'POST',
             url: '/like_update',
             data: {id_give : id},
             success: function (response) {
                 alert(response['msg']);
                 window.location.reload()
             }
         });
    }
    function array(coi) {
        if(text=='좋아요') {

        }
    }

