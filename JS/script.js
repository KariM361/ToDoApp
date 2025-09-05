//#region globals
const mainContainerSection = document.getElementById('mainContainer');
let currentData = null;


//#endregion

initApp()

//#region Model code
function getData(){
    console.log('getData');
 return JSON.parse(localStorage.getItem('toDoApp_v1')) 
    
}
function saveData(myData){
    console.log('saveData');
    let serializedData = JSON.stringify(myData)

    localStorage.setItem('toDoApp_v1', serializedData);
}

function makeNewData(){
    console.log('makeNewData');
// dummy data husk at tømme lister inden deployment
let newData={
    darkMode:false,
   
    lists:[//dataobjecter
        {
            listname: 'liste 1',
            item:[{
                name:'item 1', done:false },{name:'item 2', done:true},{name:'item 3', done:true}]
        },
 
        {
            listname: 'indkøb',
            item:[{
                name:'kød', done:false },{name:'salat', done:true},{name:'sovs', done:false}]
        }
]
    
}


return newData;

}


//#endregion

//#region Controller code
function initApp(){
    console.log('initApp');
    
//hent data
currentData = getData()//er defineret globals

if (currentData==null) {
//vi har ikke data
   currentData=makeNewData()
   saveData(currentData)
  

} 

//evaluer data

}
//#endregion

//#region View

//#endregion







// let objData = getData()
// let obj ={}

// function saveData(){
//     localStorage.setItem("",JSON,stringify(obj))
// }
// //CREATE BUTTON
// let createButton = document.createElement("button")
// createButton.innerText = "create new"
// createButton.addEventListener("click", createInput)
// mainContainer.appendChild(createButton)

// //SAVE BUTTON
// let saveButton = document.createElement("button")
// saveButton.innerText = "save"
// saveButton.addEventListener("click", saveData)
// mainContainer.appendChild(saveButton)