/////////////////////////////buttons/////////////////////////////
const modal = document.querySelector(".modal-overlay");
const buttonNew = document.querySelector(".button.new");
const buttonCancel = document.querySelector(".button.cancel");
const buttonSubmit = document.querySelector(".button.submit");
//////////////////////add/remove functions////////////////
const activeModal = () => modal.classList.add("active");
const removeModal = () => modal.classList.remove("active");
//////////////////////add/remove buttons////////////////////
buttonNew.addEventListener("click", activeModal);
buttonCancel.addEventListener("click", removeModal);
buttonSubmit.addEventListener("click", e => e.preventDefault())
////////////////////////////////////////////script 2//////////////////////////////////


const transactionsHistory = [];

function Transaction(description, value, date) {
    this.description = description;
    this.value = value;
    this.date = date;
}

buttonSubmit.addEventListener("click", createTransaction);
buttonSubmit.addEventListener("click", cleanTransactions);
buttonSubmit.addEventListener("click", removeModal);
buttonSubmit.addEventListener("click", updateTransactions);


function createTransaction() {
    const description = document.querySelector("#description-input").value;
    const value = document.querySelector("#value-input").value;
    const date = document.querySelector("#date-input").value;

    const newObject = new Transaction(description, value, date);
    console.log(newObject);
    transactionsHistory.push(newObject);
    console.log(transactionsHistory);
}

function updateTransactions(){
    transactionsHistory.forEach(object => createRow(object));
}

function createRow(object){
    const tbody = document.querySelector("tbody");
    const newRow = document.createElement("tr");
    tbody.append(newRow);
    createTrStructure(newRow, object);
}

function createTrStructure(newRow, object){
    let descriptionTd = document.createElement("td");
    descriptionTd.textContent = object.description;
    descriptionTd.setAttribute("class", "description")
    newRow.append(descriptionTd);
    let valueTd = document.createElement("td");
    valueTd.textContent = object.value;
    checkValue(valueTd);
    newRow.append(valueTd);
    let dateTd = document.createElement("td");
    dateTd.textContent = object.date;
    newRow.append(dateTd);
    let minusTd = document.createElement("td");
    minusTd.innerHTML = '<img src="assets/minus.svg" alt="remover transação"/>';
    minusTd.setAttribute("class", "date");
    newRow.append(minusTd);

}

function checkValue(value){
        if (Number(value.textContent) >= 0){
            value.setAttribute("class", "income");
            value.textContent = `R$ ${value.textContent}`;
            return value;
        }
        value.setAttribute("class", "expense"); 
        let number = value.textContent.split("");    
        let lessSignal = number.indexOf("-");
        number.splice(lessSignal, 1);
        number = number.join("").replace(".",",");
        value.textContent = `- R$ ${number}`;
        return value;
    };

function cleanTransactions(){
    let tbody = document.querySelector("tbody");
    while (tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }
}