function showPreview() {
  const fileUploader = document.getElementById("img-file");
  console.log(fileUploader)
  fileUploader.addEventListener("change", (event) => {
    const imagePreview = document.getElementById("preview-img");
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    // console.log(imagePreview.src)
  });
}

showPreview();

const fileUploadBtn = document.getElementById('img-file')

function update_file_name(){
  let element = document.querySelector('#update-file')
  let img = document.querySelector('#preview-img').src;
  element.innerHTML =  img
}

function update_post(){
  let title = $('#subject').val()
  let content = $('#content').val()
  let file = $('#img-file')[0].files[0]
  console.log(file)
  let id = window.location.pathname.split('/')[2]

  let form_data = new FormData();

  form_data.append('title_give', title)
  form_data.append('file_give' , file)
  form_data.append('content_give', content)
  form_data.append('id_give', id)

  $.ajax({
    type: "PUT",
    url: "/api/list_detail",
    data : form_data,
    cache: false,
    contentType: false,
    processData: false,

    success: function (response) {
      alert(response['msg']);
      window.location.href = `/list_detail/${id}`;
    },
  });
}

fileUploadBtn.addEventListener('change', update_file_name)
