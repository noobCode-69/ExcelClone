
let backdrop = document.querySelector(".backdrop")
let cross = document.querySelector(".cross")
let modal = document.querySelector(".modal")
let pageActions = document.querySelectorAll(".page-action");
let home = document.querySelector(".home")

let lastPageActionButtonClicked = home;


cross.addEventListener("click", (e) => {    
    modal.style.display = "none";
    backdrop.style.display = "none";
})

pageActions.forEach((pageAction) => {
    pageAction.addEventListener("click", (e) => {
        lastPageActionButtonClicked.style.borderColor = "transparent";
        lastPageActionButtonClicked.style.backgroundColor = "#218c74";
        lastPageActionButtonClicked.style.color  = "white"
        lastPageActionButtonClicked = pageAction;
        lastPageActionButtonClicked.style.borderColor = "#ecf0f1";
        lastPageActionButtonClicked.style.backgroundColor = "#ecf0f1";
        lastPageActionButtonClicked.style.color  = "black"
    })
})