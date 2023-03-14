for (let i = 0; i < rows; ++i){
    for (let j = 0; j < cols; ++j){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`)
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activeCell, cellProp] = getCellAndCellProp(address);
            let enteredData = activeCell.innerText;
            cellProp.value = enteredData;
            updateChlidValues(address);
        })
    }
}



formulaBar.addEventListener("keydown", (e) => { 
    let address = addressBar.value;
    let inputFormula = formulaBar.value;
    deleteChildFromParent();
    if (e.key === "Enter" && formulaBar.value) { 
        let evaluatedValue = evaluateFormula(inputFormula);
        setCellUIAndCellProp(evaluatedValue, inputFormula, addressBar.value);
        addChildToParent(inputFormula);
    }
    else if (e.key === "Enter" && formulaBar.value == "") {
        let evaluatedValue = 0;
        setCellUIAndCellProp(evaluatedValue, "", addressBar.value);
    }
    updateChlidValues(address);
})

function deleteChildFromParent() {
    let childAddress = addressBar.value;
    let [childCell, childCellProp] = getCellAndCellProp(childAddress);
    let formula = childCellProp.formula;
    if (formula != "") {
        let encodedFormula = formula.split(" ");
        for (let i = 0; i < encodedFormula.length; ++i) {
            let ascii = encodedFormula[i].charCodeAt(0);
            if (ascii >= 65 && ascii <= 90) {
                let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
                parentCellProp.childrens = parentCellProp.childrens.filter((input) => {
                    return input != childAddress;
                })
            }
        }
    }

}

function addChildToParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; ++i){
        let ascii = encodedFormula[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            if (parentCellProp.childrens.indexOf(encodedFormula[i]) == -1) {
                parentCellProp.childrens.push(childAddress);
            }
        }
    }
}

function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; ++i){
        let ascii = encodedFormula[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}


function setCellUIAndCellProp(evaluatedValue , formula , address) {
    let [cell, cellProp] = getCellAndCellProp(address);
    cell.innerText = evaluatedValue;
    cellProp.value = cell.innerText;
    cellProp.formula = formula;
}




function updateChlidValues(address){
    let [cell, cellProp] = getCellAndCellProp(address);
    if (cellProp.childrens.length != 0) {
        let rightOrderToUpdateChilds = [];
        findRightOrderToUpdateChilds( address , rightOrderToUpdateChilds);
        rightOrderToUpdateChilds.reverse();
        updateChildsInRightOrder(rightOrderToUpdateChilds[0], rightOrderToUpdateChilds);
    }
}

function updateChildsInRightOrder(parentAddress, order, ) {

    let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
    let parentFormula = parentCellProp.formula;
    if (parentFormula != "") {
        let evaluatedValue = evaluateFormula(parentFormula);
        setCellUIAndCellProp(evaluatedValue, parentFormula, parentAddress);    
    }
    order.shift();
    if (order.length != 0) {
        updateChildsInRightOrder(order[0], order)
    }
}


function findRightOrderToUpdateChilds(parentAddress, currOrder) {
    let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
    let childs = parentCellProp.childrens;
    for (let i = 0; i < childs.length; ++i){
        let childAddress = childs[i];
        if (currOrder.indexOf(childAddress) == -1) {
            findRightOrderToUpdateChilds(childAddress, currOrder);
        }
    }
    currOrder.push(parentAddress);
}

