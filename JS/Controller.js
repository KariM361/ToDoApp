//knapper og håndtering af bruger input.
import {renderList} from "./View.js";
import{makeListView} from "./View.js";
import{saveData} from "./Model.js";
import{getData} from "./Controller.js";
import{makeNewData} from "./Model.js";


let currentData = null;

document.getElementById("save") 
addEventListener("click",()=>{
    const input = document.getElementById("save").value;
    const data = Model.getData();
    data.push({text:input});
    model.saveData(data);
    renderList(data);
})

//CREATE BUTTON
let createButton = document.createElement("button")
createButton.innerText = "MakeNewList"
// createButton.addEventListener("click", createInput)
mainContainer.appendChild("MakeNewListButton")

export function initApp(){
    console.log('initApp');
    console.log(getData());
    
//hent data
currentData = getData()//er defineret i globals

//evaluer data
if (currentData==null) {
//vi har ikke data
   currentData=makeNewData()
   saveData(currentData)
  } 

//vi har data
makeListView(currentData)
}