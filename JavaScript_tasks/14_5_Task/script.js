const divResult = document.querySelector(".result");
const button = document.querySelector(".send-btn");
const img = document.querySelector(".image");

function loadLastImage() {
  const lastImageData = localStorage.getItem("lastImage");
  if (lastImageData) {
    let { width, height, url } = JSON.parse(lastImageData);
    img.src = url;
    divResult.innerHTML = `Последнее изображение: ${width}x${height}`;
  }
}

function saveImageToLocalStorage(width, height, url) {
  const imageData = { width, height, url };
  localStorage.setItem("lastImage", JSON.stringify(imageData));
}

function initRequest() {
  const widthValue = document.querySelector(".width").value;
  const width = parseInt(widthValue, 10);
  const widthError = document.querySelector(".width-error");
  const heigthValue = document.querySelector(".height").value;
  const height = parseInt(heigthValue, 10);
  const heightError = document.querySelector(".height-error");
  img.src = "";
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
  let url = `https://dummyimage.com/${width}x${height}`;
  fetch(url)
    .then((response) => {
      console.log("response status", response.status);
      if (!response.ok) {
        throw new Error("Не удалось получить изображение");
      }
      return response.blob();
    })
    .then((blob) => {
      console.log("data: ", blob);
      img.src = URL.createObjectURL(blob);
      saveImageToLocalStorage(width, height, url);
    })
    .catch((error) => {
      divResult.innerHTML = error.message + " " + error.status;
    });
}

document.addEventListener("DOMContentLoaded", loadLastImage);
button.addEventListener("click", () => {
  console.log("clicked");
  initRequest();
});
