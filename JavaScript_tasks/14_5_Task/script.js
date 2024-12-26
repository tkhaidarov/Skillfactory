const divResult = document.querySelector(".result");
const button = document.querySelector(".send-btn");

function initRequest() {
  const widthValue = document.querySelector(".width").value;
  const width = parseInt(widthValue, 10);
  const widthError = document.querySelector(".width-error");
  const heigthValue = document.querySelector(".height").value;
  const height = parseInt(heigthValue, 10);
  const heightError = document.querySelector(".height-error");
  const img = document.querySelector(".image");
  // img.src = '';
  divResult.innerHTML = "";
  if (isNaN(width) || width < 100 || width > 300) {
    widthError.textContent = "Введите ширину в диапазоне от 100 до 300";
  } else {
    widthError.textContent = "";
  }
  if (isNaN(height) || height < 100 || height > 300) {
    heightError.textContent = "Введите высоту в диапазоне от 100 до 300";
  } else {
    heightError.textContent = "";
  }
  let url = `https://dummyimage.com/${width}x${height}/`;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        throw new Error("Не удалось получить изображение");
      }
      return response.blob();
    })
    .then((blob) => {
      let objectURL = URL.createObjectURL(blob);
      img.src = objectURL;
    })
    .catch((error) => {
      divResult.innerHTML = error.message;
    });
}

button.addEventListener("click", () => {
  initRequest();
});
