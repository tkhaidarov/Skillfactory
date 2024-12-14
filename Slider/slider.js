let images = [{
    url: "images/png/projects__img.png",
    title:'Rostov-on-Don, Admiral',
    city: `Rostov-on-Don
    LCD Admiral`,
    apartArea: '81 m2',
    repTime: '3 months'
    },
    {
        url: "images/png/projects__img2.png",
        title:'Sochi, Thieves',
        city: 'Sochi Thieves',
        apartArea: '105 m2',
        repTime: '4 months'
    },
    {
        url: "images/png/projects__img3.png",
        title:'Rostov-on-Don, Patriotic',
        city: 'Rostov-on-Don Patriotic',
        apartArea: '93 m2',
        repTime: '3 months'
    }]
function initSlider() {
    if(!images || !images.length) return;
    let sliderImages = document.querySelector(".projects__img-block");
    let sliderArrows = document.querySelector(".projects__arrows");
    let sliderDots = document.querySelector(".projects__dots");
    let sliderTitle = document.querySelectorAll(".projects__city");
    initImages();
    initArrows();
    initDots();
    changeTitle();
    changeDescription();
    function initImages() {
        images.forEach((image,index) => {
            let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" 
data-index="${index}"></div>`;
            sliderImages.innerHTML += imageDiv;
        })
    }

    function initArrows() {
        sliderArrows.querySelectorAll(".projects__arrows-item").forEach(arrow => {
            arrow.addEventListener("click", function() {
                let curNum = +sliderImages.querySelector(".active").dataset.index;
                let nextNum;
                if(arrow.classList.contains("left")) {
                    nextNum = curNum === 0 ?images.length - 1 : curNum - 1;
                } else {
                    nextNum = curNum ===images.length - 1 ? 0 : curNum + 1;
                }
                moveSlider(nextNum);
            });
        });
    }

    function initDots() {
        images.forEach((image,index) => {
            let dot = `<div class="projects__dot-item n${index} ${index === 0? "active" : ""}" data-index = "${index}"> </div>`;
            sliderDots.innerHTML += dot;
        })
        sliderDots.querySelectorAll(".projects__dot-item").forEach(dot => {
            dot.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            })
        })
    }

    function changeTitle() {
        images.forEach((image,index) => {
                let title = `<a class="projects__city-link link n${index} ${index === 0? "active" : ""}" data-index = "${index}">${images[index].title}</a>`
                   if(sliderTitle[index]){
                       sliderTitle[index].innerHTML += title;
                   }
        });
        sliderTitle.forEach(titleElement => {
            titleElement.querySelectorAll(".link").forEach(link => {
                link.addEventListener("click", function() {
                    moveSlider(this.dataset.index);
                });
            });
        })
    }

    function moveSlider(num) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");
        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n"+ num).classList.add("active");
        // sliderTitle.querySelector(".active").classList.remove("active");
        // sliderTitle.querySelector(".n"+ num).classList.add("active");
        let activeElement = document.querySelector(".projects__city-link.link.active");
        let newActiveElement = document.querySelector(`.projects__city-link.link.n${num}`); ;
        if(activeElement) activeElement.classList.remove("active");
        if(newActiveElement) newActiveElement.classList.add("active");
        changeDescription(num);
    }
    function changeDescription(num){
       if(!images[num] || !images[num].city) return;
        let town = document.querySelector(".projects__description-item-subtitle");
        if(town){
            town.innerText = images[num].city;
        }else{
            console.warn("Element with class '.projects__description-item-subtitle' not found.");
        }
        let area = document.querySelector(".projects__description-item-area");
        if(area){
            area.innerText = images[num].apartArea;
        }else {
            console.warn("Element with class '.projects__description-item-area' not found.");
        }
        let repTime = document.querySelector(".projects__description-item-reptime");
        if(repTime){
            repTime.innerText = images[num].repTime;
        }else {
            console.warn("Element with class '.projects__description-item-repTime' not found.");
        }
    }
}
document.addEventListener("DOMContentLoaded", initSlider);

