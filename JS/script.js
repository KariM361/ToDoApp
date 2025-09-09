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
    console.log(myData);
    const data = getData()
    data.lists.push(myData)

    localStorage.setItem('toDoApp_v1', JSON.stringify(data));

}

function makeNewData(){
    console.log('makeNewData');

    // dummy data husk at tømme lister inden deployment
let newData={
    darkMode:false,
   
    lists:[  //dataobjecter
        {

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

//#region View
function makeListView(data){
    console.log('makeListView');
    //tøm contaentSection
  mainContainerSection.innerHTML='';

    data.lists.forEach((list,index) => {
        console.log(list.listName);

        let listContainer=document.createElement('div')

        //vis liste,//tempel string
 listContainer.innerHTML=`<h2 onclick="listViewCallBack('showList',${index})">${list.listName}</h2>
 <button onclick="listViewCallBack('showList',${index})">delete</button>
 <button onclick="listViewCallBack('showList',${index})">edit</button>`

        mainContainerSection.appendChild(listContainer)
   });
}
//#endregion
//#endregion


//buttons

// Opret knappen Huskelist
let Husk = document.createElement("button");
Husk.innerText = "Huskeliste";


// Tilføj funktionalitet
Husk.addEventListener("click", createtask);

function createtask(){
    let taskinput = document.createElement('input')
    document.body.appendChild(taskinput);

    console.log(taskinput.value)
    // Opret knappen save
    let saveButton = document.createElement("button");
    saveButton.innerText = "save";
    saveButton.addEventListener("click",() =>{
        const taskning = taskinput.value 
        saveData({
            name:taskning, 
            id:crypto.randomUUID(),
            tasks: [] 
        })
    })

    // Tilføj knappen til siden (f.eks. body)
    document.body.appendChild(saveButton);
}

// Tilføj knappen til siden (f.eks. body)
document.body.appendChild(Husk);


//  <button id=" MakeNewList">MakeNewList</button>



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