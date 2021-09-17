function showPreview() {
  const fileUploader = document.querySelector(".file-upload");
  fileUploader.addEventListener("change", (event) => {
    const imagePreview = document.getElementById("preview-img");
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
  });
}

showPreview();

function post(){
  let file = $('#inputGroupFile02')[0].files[0]
  let title = $('#subject').val()
  let content = $('#content').val()
  console.log(file)
  if(file === undefined){
    alert("파일을 넣어주세요.")
    return;
  }
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
