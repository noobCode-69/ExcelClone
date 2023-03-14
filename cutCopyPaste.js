let ctrlKey;
let rangeArr = [];
let cut = document.querySelector(".cut")
let copy = document.querySelector(".copy")
let paste = document.querySelector(".paste")

let cutCopiedData = [];


document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey;
})

document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey;
    for (let i = 0; i < rangeArr.length; ++i){
        let cell = document.querySelector(`.cell[rid="${rangeArr[i][0]}"][cid="${rangeArr[i][1]}"]`)
        cell.style.border = "1px solid #dfe4ea";
    }
    rangeArr = [];
})


// border: 1px solid #dfe4ea;



for (let i = 0; i < rows; ++i){
    for (let j = 0; j < cols; ++j){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`)
        addCutCopyPasteListnerToCell(cell);
    }
}

function addCutCopyPasteListnerToCell(cell){
    cell.addEventListener("click", (e) => {
        if (!ctrlKey) return;
        if (rangeArr.length >= 2) return;
        cell.style.border = "3px solid #218c74";
        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddress(address)
        rangeArr.push([rid, cid]);
    })
}


// copy, cut button handler
// shift keys must be pressed
// length of the rangeArr must be 2 //
// DATA copy

copy.addEventListener("click", (e) => { 
    if (!ctrlKey || rangeArr.length != 2) {
        return;
    }
    copyData("copy");
})

function copyData(todo) {
    cutCopiedData = [];
    let r1 = rangeArr[0][0];
    let r2 = rangeArr[1][0];
    let c1 = rangeArr[0][1];
    let c2 = rangeArr[1][1];
    for (let rid = Math.min(r1, r2); rid <= Math.max(r1, r2); ++rid) {
        let rowCutCopiedData = [];
        for (let cid = Math.min(c1, c2); cid <= Math.max(c1, c2); ++cid) {
            let cellProp = sheetDB[rid][cid];
            rowCutCopiedData.push(cellProp);
            if (todo == "cut") {
                // 
                sheetDB[rid][cid] = { 
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
                let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
                let cellProp = sheetDB[rid][cid];

                loadValueWithoutClick(cell, cellProp);

                // load;
            }
        }
        cutCopiedData.push(rowCutCopiedData);
    }

    if (todo == "cut") {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);
        cell.click();
    }

}


cut.addEventListener("click", (e) => {
    if (!ctrlKey || rangeArr.length != 2) {
        return;
    }
    copyData("cut");
})


paste.addEventListener("click", (e) => {
    if (cutCopiedData.length == 0) {
        return;
    }

    let [currRId, currCId] = decodeRIDCIDFromAddress(addressBar.value);
    let colLen = cutCopiedData[0].length;
    let rowLen = cutCopiedData.length;


    if (colLen + currCId > 26 || rowLen + currRId > 100) { 
        alert("Can't paste due to lack of space")
        return;
    }

    // propcopy

    for (let i = 0; i < cutCopiedData.length; ++i){
        for (let j = 0; j < cutCopiedData[0].length; ++j){
            let rid = currRId + i;
            let cid = currCId + j;
            let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
            sheetDB[rid][cid] = cutCopiedData[i][j];
            let cellProp = sheetDB[rid][cid];
            loadValueWithoutClick(cell, cellProp);
        }
    }

    let cell = document.querySelector(`.cell[rid="${currRId}"][cid="${currCId}"]`)
    cell.click();

})


function loadValueWithoutClick(cell, cellProp) { 
    cell.style.fontWeight = (cellProp.bold == false) ? "normal" : "bold";
    cell.style.fontStyle = (cellProp.italic == false) ? "normal" : "italic";
    cell.style.textDecoration = (cellProp.underline == false) ? "none" : "underline";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.BGcolor;
    cell.style.textAlign = cellProp.alignment;
    cell.innerText = cellProp.value;
}