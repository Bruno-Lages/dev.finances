/////////////////////////////buttons/////////////////////////////
const modal = document.querySelector(".modal-overlay");
const buttonNew = document.querySelector(".button.new");
const buttonCancel = document.querySelector(".button.cancel");
const buttonSubmit = document.querySelector(".button.submit");
const form = document.querySelector("form");
//////////////////////add/remove functions////////////////
const activeModal = () => modal.classList.add("active");
const removeModal = () => modal.classList.remove("active");
//////////////////////add/remove buttons////////////////////
buttonNew.addEventListener("click", activeModal);
buttonNew.addEventListener("click", e => e.preventDefault());
buttonCancel.addEventListener("click", removeModal);
buttonCancel.addEventListener("click", clearModalValues);
buttonCancel.addEventListener("click", e => e.preventDefault());
form.addEventListener("click", e => e.preventDefault())
////////////////////////////////////////////script 2//////////////////////////////////


let transactionsHistory = [];

function setHistory(){
    const json = JSON.stringify(transactionsHistory);
    const setLocalStorage = localStorage.setItem("history", json);
}

function getHistory(){
    const getHistory = localStorage.getItem("history");
    transactionsHistory = JSON.parse(getHistory) || [];
}
updateTransactions();

function Transaction(description, value, date) {
    this.description = description;
    this.value = value;
    this.date = date;
}

buttonSubmit.addEventListener("click", () => {
    try{
        checkFields()
        buttonSubmit.addEventListener("click", createTransaction);
        buttonSubmit.addEventListener("click", orderTransactions);
        buttonSubmit.addEventListener("click", removeModal);
        buttonSubmit.addEventListener("click", clearModalValues);
    }
    catch(e){
        alert(e.message);
    }
});


function createTransaction() {
    const description = document.querySelector("#description-input").value;
    const value = document.querySelector("#value-input").value;
    const date = document.querySelector("#date-input").value;

    const newObject = new Transaction(description, value, date);
    transactionsHistory.push(newObject);
    setHistory();
}

function updateTransactions(){
    getHistory();
    transactionsHistory.forEach((object, index) => createRow(object, index));
    updateDisplays();
}

function createRow(object, index){
    const tbody = document.querySelector("tbody");
    const newRow = document.createElement("tr");
    tbody.append(newRow);
    createTrStructure(newRow, object, index);
}

function createTrStructure(newRow, object, index){
    let descriptionTd = document.createElement("td");
    descriptionTd.textContent = object.description;
    descriptionTd.setAttribute("class", "description")
    newRow.append(descriptionTd);
    let valueTd = document.createElement("td");
    valueTd.textContent = object.value;
    valueTd.setAttribute("class", object.value >= 0? "income" : "expense");
    checkValue(valueTd);
    newRow.append(valueTd);
    let dateTd = document.createElement("td");
    dateTd.textContent = object.date;
    formatDate(dateTd);
    newRow.append(dateTd);
    let minusTd = document.createElement("td");
    minusTd.innerHTML = `<img src="assets/minus.svg" alt="remover transação" onclick="deleteTransaction(${index})" />`;
    minusTd.setAttribute("class", "date");
    newRow.append(minusTd);

}

function checkValue(value){
        if (Number(value.textContent) >= 0){
            value.textContent = `R$ ${value.textContent}`;
            return value;
        }
        let number = value.textContent.split("");    
        let lessSignal = number.indexOf("-");
        number.splice(lessSignal, 1);
        number = number.join("").replace(".",",");
        value.textContent = `- R$ ${number}`;
        return value;
    };

function clearTransactions(){
    let tbody = document.querySelector("tbody");
    while (tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }
}

function clearModalValues(){
    const description = document.querySelector("#description-input");
    const value = document.querySelector("#value-input");
    const date = document.querySelector("#date-input");

    description.value = "";
    value.value = "";
    date.value = "";
}

function updateDisplays(){
    const incomesDisplay = document.querySelector("#incomesDisplay");
    const expensesDisplay = document.querySelector("#expensesDisplay");
    const totalDisplay = document.querySelector("#totalDisplay");

    incomesDisplay.textContent =`R$ ${incomes(transactionsHistory)}`;
    expensesDisplay.textContent = `R$ ${expenses(transactionsHistory)}`;
    totalDisplay.textContent = `R$ ${total(transactionsHistory)}`;
    setTotalColor();
}
    
    function incomes(array){
        let income = array.filter((transaction) => transaction.value >= 0 );
        income = income.reduce((amount, transaction) => {
            amount += Number(transaction.value);
            return amount;
        }, 0);
        return income;
    }    

    function expenses(array){
        let expense = array.filter(transaction => transaction.value < 0);
        expense = expense.reduce((amount, transaction) => {
            amount += Number(transaction.value);
            return amount
        }, 0);
        expense *= -1;
        return expense;
    }

    function total(array){
        const total = incomes(array) - expenses(array);
        return total;
    }

function checkFields(){
    const description = document.querySelector("#description-input").value;
    const value = document.querySelector("#value-input").value;
    const date = document.querySelector("#date-input").value;

    if (description.trim() === "" || value.trim() === "" || !date){
        throw new Error("Verifique todos os campos");
    }
}

function formatDate(date){
    let newDate = date.textContent.split("-");
    date.textContent = `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
    return date;
}

function deleteTransaction(index){
    transactionsHistory.splice(index, 1);
    clearTransactions();
    setHistory();
    updateTransactions();
    updateDisplays();
}

function setTotalColor(){
    const totalCard = document.querySelector("#total");
    const totalDisplay = document.querySelector("#totalDisplay");
    if (total(transactionsHistory) < 0){
        totalCard.classList.add("negative-value");
    }else if (total(transactionsHistory) >= 0){
        totalCard.classList.remove("negative-value");
    }
}

////////////////////////dark mode//////////////////////
const darkModeButton = document.querySelector("#dark-mode-button");

darkModeButton.addEventListener("click", setDarkMode);

function setDarkMode(){
    setColor('body', 1, 'background-dark-mode');
    setColor('header', 1, 'header-dark-mode');
    setColor('td', 2, 'dark-mode');
    setColor('th', 2, 'gray-dark-mode');
    setColor('.card', 2, 'gray-dark-mode');
    setColor('.total', 2, 'color-dark-mode');
    setColor('.modal', 1, 'background-dark-mode');
    setColor('input', 2, 'dark-mode');
    setColor('small', 1, 'color-dark-mode');
    setColor('.text', 2, 'color-dark-mode');
    setColor('.order', 1, 'gray-dark-mode');
    setColor('option', 2, 'color-dark-mode');
}

function setColor(element, quantity, className){
    const elementLocalization = quantity > 1? document.querySelectorAll(element) : document.querySelector(element);
    if (quantity > 1){
        elementLocalization.forEach(actualElement => actualElement.classList.toggle(className));
    } else {
        elementLocalization.classList.toggle(className);
    }
}

const order = document.querySelector('.order');

order.addEventListener("change", () => orderTransactions());

function orderTransactions(){
    switch (order.value){
    case "lowest":
            transactionsHistory = transactionsHistory.sort((object1, object2) => object1.value - object2.value);
            setHistory();
            clearTransactions();
            updateTransactions();
            break;
    case "highest":
        transactionsHistory = transactionsHistory.sort((transaction1, transaction2) => (transaction1.value - transaction2.value) * -1);
        setHistory();
        clearTransactions();
        updateTransactions();
        break;
    case "oldest":
        orderDate(transactionsHistory, 1);
        setHistory();
        clearTransactions();
        updateTransactions();
        break;
    case "newest":
        orderDate(transactionsHistory, -1);
        setHistory();
        clearTransactions();
        updateTransactions();
        break;
    default: 
        clearTransactions();
        updateTransactions();
        break;
    }
}





function orderDate(array, multiplicator){
array.sort(
    (transaction1, transaction2) => {
        let day = (Number(transaction1.date.split('-')[2]) - Number(transaction2.date.split('-')[2])) * multiplicator;

        let mounth = Number(transaction1.date.split('-')[1]) - Number(transaction2.date.split('-')[1])? (Number(transaction1.date.split('-')[1]) - Number(transaction2.date.split('-')[1])) * multiplicator : day;

        let year = Number(transaction1.date.split('-')[0]) - Number(transaction2.date.split('-')[0])? (Number(transaction1.date.split('-')[0]) - Number(transaction2.date.split('-')[0])) * multiplicator : mounth;
        
        return year;
    }
)
}