function showPreview() {
  // file 선택 버튼 element(input file)를 불러와서 변수에 저장
  const fileUploader = document.getElementById("img-file");
  // 버튼을 누르는 change 이벤트가 생겼을 때 함수 실행
  fileUploader.addEventListener("change", (event) => {
    // 미리보기 사진을 띄우는 element(img) 불러와서 변수에 저장
    const imagePreview = document.getElementById("preview-img");
    // 이미지의 src 값을 event가 발생한 target객체의의 URL을 DOMString으로 반환 DOMstring?  
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    // file 이름을 띄워주는 element(label) 불러와서 변수에 저장
    const label = document.getElementById('update-file');
    // file 이름을 새로 선택한 파일의 이름으로 바꿔서 html안에 넣어준다.
    label.innerHTML = event.target.files[0].name
  });
}

showPreview();

// 수정 글 저장 함수 
function update_post(){
  // 수정한 글의 제목, 내용, 파일 값 가져오기
  let title = $('#subject').val()
  let content = $('#content').val()
  let file = $('#img-file')[0].files[0]

  // URL 에서 / 문자를 기준으로 잘라서 2번째 인덱스인 ObjectId 를 가져와서 변수에 저장
  let id = window.location.pathname.split('/')[2]

  // FormData 형식의 새로운 인스턴스 생성
  let form_data = new FormData();

  // FormData(key,value) 형식으로 값을 넣어준다
  form_data.append('title_give', title)
  form_data.append('file_give' , file)
  form_data.append('content_give', content)
  form_data.append('id_give', id)

  $.ajax({
    // PUT 메소드는 수정을 담당함 멱등성을 가져서 여러번 콜해도 하나의 데이터만 생성
    type: "PUT",
    url: "/api/list_detail",
    data : form_data,
    cache: false,
    contentType: false,
    processData: false,

    success: function (response) {
      // 변경된 데이터를 보내는데 성공하면 msg alert
      alert(response['msg']);
      // 상세페이지로 이동
      window.location.href = `/list_detail/${id}`;
    },
  });
}

