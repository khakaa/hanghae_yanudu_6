const del_btn = document.querySelector('.btn-delete')

function showPreview() {
  const fileUploader = document.getElementById("inputGroupFile02");
  fileUploader.addEventListener("change", (event) => {
    const imagePreview = document.getElementById("preview-img");
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
  });
}

showPreview();

function save(){
  let file = $('#inputGroupFile02')[0].files[0]
  let title = $('#subject').val()
  let content = $('#content').val()
  // console.log(file)

  let form_data = new FormData();

  form_data.append('file_give', file);
  form_data.append('title_give', title);
  form_data.append('content_give', content);

  $.ajax({
    type: "POST",
    url: "/list_save",
    data: form_data,
    cache: false,
    contentType: false,
    processData: false,
    
    success: function(response){
       alert(response['msg'])
       window.location.href='/'
    }
  })  
}

// function update(){
  
// }
// function editList(){
//   $.ajax({
//     type: "GET",
//     url: "/submit",
//     data: {},
    
//     success: function(response){
//       alert(response['msg'])
//     }
//   })
// }

// function deleteList(){
//   $.ajax({
//     type:"POST",
//     url: "/detail/delete",
//     data: { title_give:title },

//     success: function(response){
//       alert(response['msg'])
//       window.location.herf='/'
//     }
//   })
// }

//삭제 확인 모달창
function del(){
  $('.modal')
}

del_btn.addEventListener('click', delmodal);