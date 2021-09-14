function showPreview() {
  const fileUploader = document.getElementById("inputGroupFile02");
  fileUploader.addEventListener("change", (event) => {
    const imagePreview = document.getElementById("preview-img");
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    console.log(imagePreview.src)
  });
}
console.log("asdf")

showPreview();
