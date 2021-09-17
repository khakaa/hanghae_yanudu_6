function showPreview() {
  // img-file 이라는 id를 갖는 element(input file)를 불러와서 변수에 저장
  const fileUploader = document.getElementById("img-file");
  // 가져온 element에 change 이벤트가 생겼을 때 함수 실행
  fileUploader.addEventListener("change", (event) => {
    // preview-img id를 갖는 element(img) 불러와서 변수에 저장
    const imagePreview = document.getElementById("preview-img");
    // 이미지의 src 값을 event가 발생한 target객체의의 URL을 DOMString으로 반환 DOMstring?  
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    // update-file id를 갖는 element(label) 불러와서 변수에 저장
    const label = document.getElementById('update-file');
    // 
    label.innerHTML = event.target.files[0].name
  });
}

showPreview();

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

