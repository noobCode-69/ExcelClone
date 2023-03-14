let download = document.querySelector(".download")
let upload = document.querySelector(".upload")


download.addEventListener("click", (e) => {
    let jsonData = JSON.stringify(sheetDB);    
    let file = new Blob([jsonData] , {type : "application/json"})
    let a = document.createElement("a")
    a.href = URL.createObjectURL(file);
    a.download = "sheetData.json"
    a.click();
})


upload.addEventListener("click", (e) => {
    let input = document.createElement("input")
    input.setAttribute("type", "file")
    input.click();

    input.addEventListener("change", (e) => {
        let fr = new FileReader();
        let file = input.files[0];
        fr.readAsText(file);
        fr.addEventListener("load", (e) => {
            let readSheetData = JSON.parse(fr.result);
            for (let i = 0; i < rows; ++i){
                for (let j = 0; j < cols; ++j){
                    // prop change
                    sheetDB[i][j] = readSheetData[i][j];
                    // UI change
                    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`)
                    let cellProp = sheetDB[i][j];
                    loadValueWithoutClick(cell, cellProp);
                }
            }
            let cell = document.querySelector(`.cell[rid="${0}"][cid="${0}"]`)
            cell.click();
        })
    })  

    
})