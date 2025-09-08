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
   
    lists:[  //dataobjecter
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