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

function likelist(post_id) {
    let $a_like = $(`#${id} a[like-label='like']`)
    let $i_like = $a_like.find("i")
    let class_s = {"heart": "fa-heart", "star": "fa-star", "like": "fa-thumbs-up"}
    let class_o = {"heart": "fa-heart-o", "star": "fa-star-o", "like": "fa-thumbs-o-up"}
    if ($i_like.hasClass(class_s[type])) {
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
                $i_like.addClass(class_o[type]).removeClass(class_s[type])
                $a_like.find("span.like-num").text(num2str(response["count"]))
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
                $i_like.addClass(class_s[type]).removeClass(class_o[type])
                $a_like.find("span.like-num").text(num2str(response["count"]))
            }
        })

    }
}

function get_posts(username) {
    if (username == undefined) {
        username = ""
    }
    $("#post-box").empty()
    $.ajax({
        type: "GET",
        url: `/get_posts?username_give=${username}`,
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let posts = response["posts"]
                for (let i = 0; i < posts.length; i++) {
                    let post = posts[i]
                    let time_post = new Date(post["date"])
                    let time_before = time2str(time_post)
                    let class_heart = ""
                    if (post["heart_by_me"]) {
                        class_heart = "fa-heart"
                    } else {
                        class_heart = "fa-heart-o"
                    }

                    let class_heart = post['heart_by_me'] ? "fa-heart" : "fa-heart-o"

                    let html_temp = `<div class="box" id="${post["_id"]}">
                                        <article class="media">
                                            <div class="media-left">
                                                <a class="image is-64x64" href="/user/${post['username']}">
                                                    <img class="is-rounded" src="/static/${post['profile_pic_real']}"
                                                         alt="Image">
                                                </a>
                                            </div>
                                            <div class="media-content">
                                                <div class="content">
                                                    <p>
                                                        <strong>${post['profile_name']}</strong> <small>@${post['username']}</small> <small>${time_before}</small>
                                                        <br>
                                                        ${post['comment']}
                                                    </p>
                                                </div>
                                                <nav class="level is-mobile">
                                                    <div class="level-left">
                                                        <a class="level-item is-sparta" aria-label="heart" onclick="toggle_like('${post['_id']}', 'heart')">
                                                            <span class="icon is-small"><i class="fa ${class_heart}"
                                                                                           aria-hidden="true"></i></span>&nbsp;<span class="like-num">${num2str(post["count_heart"])}</span>
                                                        </a>
                                                    </div>

                                                </nav>
                                            </div>
                                        </article>
                                    </div>`
                    $("#post-box").append(html_temp)
                }
            }
        }
    })
}

function array(coi) {
    if (text == '좋아요') {

    }
}

