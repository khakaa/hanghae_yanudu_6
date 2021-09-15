$(document).ready(function () {
                Doc();
            });

function Doc() {
    $.ajax({
        type: 'GET',
        url: '/list/view?sample_give=샘플데이터',
        data: {},
        success: function (response) {
            let authors = response['bucket_authors']

            for (let i = 0; i < authors.length; i++) {

                let title = authors[i]['title']
                let url = authors[i]['url']
                let content = authors[i]['content']
                let file = authors[i]['file']
                let likes = authors[i]['likes']

                let temp_html = `<div class="card mb-3 middle" style="max-width: 540px;">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="../static/img/${file}" class="img-fluid rounded-start" alt="...">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">${title} (좋아요: ${likes})<br></h5>
                                                <p class="card-text">${content}</p>
                                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                                    <button class="btn btn-primary me-md-2" onclick="likelist('${title}')" type="button">좋아요</button>
                                                    <button class="btn btn-primary" onclick="deletelist('${title}')" type="button">싫어요</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`

                $('#list-box').append(temp_html)
            }}
        });
}

    function likelist(name) {
         $.ajax({
             type: 'POST',
             url: '/list/like',
             data: {name_give: name},
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
$('#myModal').modal(backdrop)
