function showPreview() {
  const fileUploader = document.getElementById("inputGroupFile02");
  console.log(fileUploader)
  fileUploader.addEventListener("change", (event) => {
    const imagePreview = document.getElementById("preview-img");
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
  });
}

showPreview();

function makeList(){
  let file = $('')[0]
  let title = $('#subject').val()
  let content = $('#content').val()
  // let likes = $('#likes').val()
  console.log(file)
  $.ajax({
    type: "POST",
    url: "/submit/post",
    data: { file_give:file, title_give:title, content_give:content},
  
    success: function(response){
       alert(response['msg'])
       window.location.href='/'
    }
  })  
}

function editList(){
  $.ajax({
    type: "GET",
    url: "/submit",
    data: {},
    
    success: function(response){
      alert(response['msg'])
    }
  })
}

function deleteList(){
  $.ajax({
    type:"POST",
    url: "/detail/delete",
    data: { title_give:title },

    success: function(response){
      alert(response['msg'])
      window.location.herf='/'
    }
  })
}