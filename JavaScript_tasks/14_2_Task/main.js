const preResult = document.querySelector(".result");
const button = document.querySelector(".send-btn");

function initRequest() {
  const value = document.querySelector(".input").value;
  const number = parseInt(value, 10);
  preResult.innerHTML = "";
  const isValid = isNaN(number) || number < 1 || number > 10;
  if (isValid) {
    preResult.innerHTML =
      '<p style="color: red;">Please enter a number between 1 and 10.</p>';
    return;
  }
  const xhr = new XMLHttpRequest();
  const url = `https://jsonplaceholder.typicode.com/photos?_limit=${number}`;
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
      preResult.innerText = JSON.stringify(data, null, 2);
    } else {
      preResult.innerHTML = `<p style="color: red;">Answer status: ${xhr.status}</p>`;
    }
  };
  xhr.onerror = function () {
    preResult.innerHTML = `<p style="color: red;">Error: ${xhr.status}</p>`;
  };
  xhr.send();
}

button.addEventListener("click", () => {
  initRequest();
});
