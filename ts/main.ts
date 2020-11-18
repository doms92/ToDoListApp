const picker = datepicker("#due-date");

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;

    
    }
/*

let item = new ToDoItem();
 item.title = "Testing";
item.dueDate = new Date(2020, 6, 1);
item.isCompleted = false;
*/

/**
 * Check form data is valid
 */
window.onload = function(){
    let addItem = document.getElementById("add");
    addItem.onclick = main;

    loadSavedItem();
}
function loadSavedItem(){
    let item = getToDo(); // read from storage
    displayToDoItem(item);

}
function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
    }
}

function isValid():boolean{
    return true;

}

/**
 * 
 */
function getToDoItem():ToDoItem{
let myItem = new ToDoItem();

// get Title
let titleInput = getInput("title");
myItem.title = titleInput.value;

// get due Date
let dueDateInput = getInput("due-date");
myItem.dueDate = new Date(dueDateInput.value);

// get isCompleted
let isCompleted = getInput("is-complete");
myItem.isCompleted = isCompleted.checked;

return myItem;

}

function getInput(id) :HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}
/**
 * 
 * Display given ToDoItem on the webpage
 */
function displayToDoItem(item:ToDoItem):void{
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    let itemDate = document.createElement("p");
 //   itemDate.innerText = item.dueDate.toDateString();
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();
 // ex.
    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsComplete;

    itemDiv.classList.add("todo");
    if(item.isCompleted){
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.isCompleted){
        let CompletedToDos = document.getElementById("complete-items");
        CompletedToDos.appendChild(itemDiv);
    }
    else{
        let incompleteToDos = document.getElementById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}

function markAsComplete(){
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("completed");

    let completedItems = document.getElementById("complete-items");
    completedItems.appendChild(itemDiv);
}

// Task: Allow user to mark a ToDoItem as completed

function saveToDo(item:ToDoItem):void{

    let itemString = JSON.stringify(item);

    localStorage.setItem(todokey, itemString);
}
const todokey = "todo";
/**
 * Check form data is valid
 */

function getToDo():ToDoItem{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem = JSON.parse(itemString);
    return item;

}