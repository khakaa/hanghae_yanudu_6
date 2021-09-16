// $(document).ready(function () {
//                 Doc();
//             });

// function Doc() {
//     $.ajax({
//         type: 'GET',
//         url: '/list/view?sample_give=샘플데이터',
//         data: {},
//         success: function (response) {
//             let authors = response['bucket_authors']

//             for (let i = 0; i < authors.length; i++) {

//                 let name = authors[i]['name']
//                 let url = authors[i]['url']
//                 let content = authors[i]['content']
//                 let img = authors[i]['img']
//                 let like = authors[i]['like']

//                 let temp_html = `<div class="card mb-3 middle" style="max-width: 540px;">
//                                     <div class="row g-0">
//                                         <div class="col-md-4">
//                                             <img src="${img}" class="img-fluid rounded-start" alt="...">
//                                         </div>
//                                         <div class="col-md-8">
//                                             <div class="card-body">
//                                                 <h5 class="card-title">${name} (좋아요: ${like})<br></h5>
//                                                 <p class="card-text">${content}</p>
//                                                 <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
//                                                 <div class="d-grid gap-2 d-md-flex justify-content-md-end">
//                                                     <button class="btn btn-primary me-md-2" onclick="likelist('${name}')" type="button">좋아요</button>
//                                                     <button class="btn btn-primary" onclick="deletelist('${name}')" type="button">싫어요</button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>`

//                 $('#list-box').append(temp_html)
//             }}
//         });
// }

    function likelist(_id) {
         $.ajax({
             type: 'POST',
             url: '/like',
             data: {_id_give: _id},
             success: function (response) {
                 alert(response['msg']);
                 window.location.reload()
             }
         });
    }
    function toggle_like(post_id, type) {
    console.log(post_id, type)
    let $a_like = $(`#${post_id} a[aria-label='heart']`)
    let $i_like = $a_like.find("i")
    if ($i_like.hasClass("fa-heart")) {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "unlike"
            },
            success: function (response) {
                console.log("unlike")
                $i_like.addClass("fa-heart-o").removeClass("fa-heart")
                $a_like.find("span.like-num").text(response["count"])
            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "like"
            },
            success: function (response) {
                console.log("like")
                $i_like.addClass("fa-heart").removeClass("fa-heart-o")
                $a_like.find("span.like-num").text(response["count"])
            }
        })

    }
}
    function array(coi) {
        if(text=='좋아요') {

        }
    }

    // function deletelist(name) {
    //     $.ajax({
    //         type: 'POST',
    //         url: '/list/delete',
    //         data: {sample_give: '샘플데이터'},
    //         success: function (response) {
    //             alert(response['msg']);
    //         }
    //     });
    // }
