let leftArrow = document.querySelector(".left-arrow i");
let rightArrow = document.querySelector(".right-arrow i");
let displayImg = document.querySelector(".display-img img");
let allImgDivs = document.querySelectorAll(".preview-img");
let allImgTags = document.querySelectorAll(".preview-img img");
let closeBtn = document.querySelector(".close");
let modalDiv = document.querySelector(".modal");
let showModalBtn = document.querySelector(".show-modal");

let activeImgIdx = 0;

showModalBtn.addEventListener("click", ()=>{
    modalDiv.style.display = "flex";
})


function changeActiveImg() {
  //set the new display img
  let newDisplayImgSrc = allImgTags[activeImgIdx].src;
  displayImg.setAttribute("src", newDisplayImgSrc);

  //highlight the new preview
  allImgDivs.forEach((el) => {
    if (el.classList.contains("active-img")) el.classList.remove("active-img");
  });

  allImgDivs[activeImgIdx].classList.add("active-img");
}

leftArrow.addEventListener("click", () => {
  //get the new img
  activeImgIdx = (activeImgIdx - 1 + allImgDivs.length) % allImgDivs.length;

  changeActiveImg();
});

rightArrow.addEventListener("click", () => {
  //get the new img
  activeImgIdx = (activeImgIdx + 1) % allImgDivs.length;

  changeActiveImg();
});

for (let i = 0; i < allImgDivs.length; i++) {
  allImgDivs[i].addEventListener("click", () => {
    activeImgIdx = i;
    changeActiveImg();
  });
}

closeBtn.addEventListener("click", ()=>{
    modalDiv.style.display= "none";
})