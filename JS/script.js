//#region globals
const mainContainerSection = document.getElementById('mainContainer');
let currentData = null;


//#endregion

initApp()

//#region Model code
function getData(){
    console.log('getData');
    let data=localStorage.getItem('toDoApp_v1')
    return JSON.parse(data)
    
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
            listName: 'liste 1',
            item:[{
                name:'item 1', done:false },{name:'item 2', done:true},{name:'item 3', done:true}]
        },
 
        {
            listName: 'indkøb',
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
    console.log(getData());
    
//hent data
currentData = getData()//er defineret globals

//evaluer data
if (currentData==null) {
//vi har ikke data
   currentData=makeNewData()
   saveData(currentData)
   
} 

//vi har data
makeListView(currentData)
}

//#endregion

//#region View
function makeListView(Data){
    console.log('makeListView');
    //vis data til bruger

   Data.lists.forEach((list) => {
        console.log(list.listName);
        
   });
}
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