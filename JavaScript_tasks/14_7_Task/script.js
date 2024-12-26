
let btnQuery = document.querySelector('.query-btn');
function initRequest() {
    let pageElement = document.querySelector('.page-number');
    let pageNum = pageElement ? parseInt(pageElement.value, 10) : NaN;
    let limitElem = document.querySelector('.limit');
    let limitNum = limitElem ? parseInt(limitElem.value, 10) : NaN;
    let isPageValid = isNaN(pageNum) || pageNum < 1 || pageNum > 10;
    let isLimitValid = isNaN(limitNum) || limitNum < 1 || limitNum > 10;
    let errorText = '';
    if (isPageValid && isLimitValid) {
        errorText = 'Номер страницы и лимит вне диапазона от 1 до 10';
    }else if(isPageValid) {
        errorText = 'Номер страницы вне диапазона от 1 до 10';
    }else if(isLimitValid) {
        errorText = 'Лимит вне диапазона от 1 до 10';
    }
    let preResult = document.querySelector('.result');
    let errorMessage = document.querySelector('.error-message');
    if(errorText){
        errorMessage.textContent = errorText;
       // preResult.textContent = '';
        return;
    }else {
        errorMessage.textContent = '';
    }

    const url = `https://jsonplaceholder.typicode.com/photos?_page=${pageNum}&_limit=${limitNum}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка запроса: ' + response.status);
            }
            return response.json();
        })
        .then(data =>{
            preResult.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            errorMessage.textContent = 'Ошибка ' + error.message;
            //preResult.textContent = '';
        })
}
btnQuery.addEventListener('click', initRequest);