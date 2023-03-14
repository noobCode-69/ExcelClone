// Storage 
let activeColorProp = "#d1d8e0"
let inactiveColorProp = "#ecf0f1";
let sheetDB = [];

for (let i = 0; i < rows; ++i){
    let sheetRow = [];
    for (let j = 0; j < cols; ++j){
        let cellProp = { 
            bold : false,
            italic : false,
            underline : false,
            alignment : "left",
            fontFamily : "monospace", 
            fontSize: "16",
            fontColor: "#000000",
            BGcolor: "#ecf0f1",
            value: "",
            formula: "",
            childrens: [],
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}


let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop")
let BGcolor = document.querySelector(".BGcolor-prop")
let alignment = document.querySelectorAll(".alignment")
let formulaBar = document.querySelector(".formula-bar");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

formulaBar.value = "";



bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    cellProp.bold = !cellProp.bold;

    cell.style.fontWeight = (cellProp.bold == false) ? "normal" : "bold";
    bold.style.backgroundColor = (cellProp.bold == true) ? String(activeColorProp) : String(inactiveColorProp);
})


italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    cellProp.italic = !cellProp.italic;
    
    cell.style.fontStyle = (cellProp.italic == false) ? "normal" : "italic";
    italic.style.backgroundColor = (cellProp.italic == true) ? String(activeColorProp) : String(inactiveColorProp);
})

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    cellProp.underline = !cellProp.underline;
    
    cell.style.textDecoration = (cellProp.underline == false) ? "none" : "underline";
    underline.style.backgroundColor = (cellProp.underline == true) ? String(activeColorProp) : String(inactiveColorProp);
})


fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    cellProp.fontSize = fontSize.value; 
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})



fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    cellProp.fontFamily = fontFamily.value; 
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontColor = fontColor.value; 
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})


BGcolor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    cellProp.BGcolor = BGcolor.value; 
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
})

alignment.forEach((alignElement) => {

    alignElement.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);
        let alignValue = e.target.classList[2];
        cellProp.alignment = alignValue; // data change
        cell.style.textAlign = cellProp.alignment;

        switch (alignValue) {
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break
        }

    })
})

let allCells = document.querySelectorAll(".cell");

for (let i = 0; i < allCells.length; ++i){
    let cell = allCells[i];
    addListnerToAttachCellProperties(cell);
}


function addListnerToAttachCellProperties(cell) { 
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);
        loadUI(cell , cellProp);        
    })
}

function loadUI(cell, cellProp) {

    
    cell.style.fontWeight = (cellProp.bold == false) ? "normal" : "bold";
    cell.style.fontStyle = (cellProp.italic == false) ? "normal" : "italic";
    cell.style.textDecoration = (cellProp.underline == false) ? "none" : "underline";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.BGcolor;
    cell.style.textAlign = cellProp.alignment;


    bold.style.backgroundColor = (cellProp.bold == true) ? String(activeColorProp) : String(inactiveColorProp);
    italic.style.backgroundColor = (cellProp.italic == true) ? String(activeColorProp) : String(inactiveColorProp);
    underline.style.backgroundColor = (cellProp.underline == true) ? String(activeColorProp) : String(inactiveColorProp);
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    fontColor.value = cellProp.fontColor;
    BGcolor.value = cellProp.BGcolor;
    formulaBar.value = cellProp.formula


    switch (cellProp.alignment) {
        case "left":
            leftAlign.style.backgroundColor = activeColorProp;
            centerAlign.style.backgroundColor = inactiveColorProp;
            rightAlign.style.backgroundColor = inactiveColorProp;
            break
        case "center":
            leftAlign.style.backgroundColor = inactiveColorProp;
            centerAlign.style.backgroundColor = activeColorProp;
            rightAlign.style.backgroundColor = inactiveColorProp;
            break
        case "right":
            leftAlign.style.backgroundColor = inactiveColorProp;
            centerAlign.style.backgroundColor = inactiveColorProp;
            rightAlign.style.backgroundColor = activeColorProp;
            break
    }


}


function getCellAndCellProp(address) {
    let [rid, cid] = decodeRIDCIDFromAddress(address)
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address) {
    let rid = Number(address.slice(1)) - 1;
    let cid = address.charCodeAt(0) - 65;
    return [rid, cid];   
}




