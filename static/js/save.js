// 사진 미리보기 기능 함수
function showPreview() {
  // file-upload 라는 클래스를 갖는 document를 불러와서 fileUploader변수에 저장
  const fileUploader = document.querySelector(".file-upload");
  // input 태그에 change 이벤트가 대상에 전달될 때마다 함수실행
  fileUploader.addEventListener("change", (event) => {
    // preview-img 라는 id를 갖는 document를 불러와서 imagePreview변수에 저장
    const imagePreview = document.getElementById("preview-img");
    // target 속성은 event가 전달한 객체에 대한 참조해서 그 안에 files 속성을 불러와서 변수에 저장
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
  });
}

showPreview();

function post(){
  // 파일, 제목, 내용 값 가져와서 변수에 저장
  let file = $('#inputGroupFile02')[0].files[0]
  let title = $('#subject').val()
  let content = $('#content').val()
 
  // 파일이 업로드되지 않았을 때 얼럿 띄우기
  if(file === undefined){
    alert("파일을 넣어주세요.")
    return;
  }

  // key : value 형태로 데이터를 형성하는 FormData 인스턴스 생성
  let form_data = new FormData();

  // append(name, value) key : value 형태로 값을 넣어준다
  form_data.append('file_give', file);
  form_data.append('title_give', title);
  form_data.append('content_give', content);

  $.ajax({
    type: "POST",
    url: "/list_save",
    data: form_data,
    // file upload 하기 위해서 false
    cache: false,
    contentType: false,
    processData: false, 
    
    // 데이터가 서버로 잘 넘어가면 성공 메제지 띄우고 홈화면으로 이동
    success: function(response){
       alert(response['msg'])
       window.location.href='/'
    }
  })  
}
