function showPreview() {
  const fileUploader = document.getElementById("inputGroupFile02");
  fileUploader.addEventListener("change", (event) => {
    const imagePreview = document.getElementById("preview-img");
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
  });
}

showPreview();

function makeList(){
  let img = $('#preview-img').attr("src")
  let title = $('#subject').val()
  let content = $('#content').val()

  $.ajax({
    type: "POST",
    url: "/submit/post",
    data: { img_give:img, title_give:title, content_give:content},
  
    success: function(response){
       alert(response['msg'])
       window.location.href='/'
    }
  })  
}

function deleteList(){
  $.ajax({
    type:"POST",
    url: "/submit/delete",
    data: { _id_give: }
  })
}