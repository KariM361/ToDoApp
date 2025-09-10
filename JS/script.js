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
    let data = getData();
    if (!data) data = makeNewData();
    data.lists.push(myData);
    localStorage.setItem('toDoApp_v1', JSON.stringify(data));
}
function makeNewData(){
    console.log('makeNewData');
    return {
        darkMode: false,
        lists: []
    };
}
//#endregion

//#region Controller code
function initApp(){
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

//#region View
function makeListView(data){
    console.log('makeListView');
//tøm contaentSection
  mainContainerSection.innerHTML='';

    data.lists.forEach((list,index) => {
        console.log(list.listName);

    let listContainer=document.createElement('div')

 //vis liste,//tempel string
 listContainer.innerHTML = `
  <h2 onclick="listViewCallBack('showList',${index})">${list.listName}</h2>
  <button onclick="listViewCallBack('delete',${index})">delete</button>
  <button onclick="listViewCallBack('edit',${index})">edit</button>
`;

    mainContainerSection.appendChild(listContainer)
   });
   }

   function listViewCallBack(action, index) {
  console.log('listViewCallBack:', action, index);
  if(action === 'delete') {
    // Slet liste
    currentData.lists.splice(index, 1);
    localStorage.setItem('toDoApp_v1', JSON.stringify(currentData));
    makeListView(currentData);
  }
  if(action === 'edit') {
    // Vis inputfelt og gem-knap til redigering
    const listDiv = mainContainerSection.children[index];
    listDiv.innerHTML = `
      <input id="editInput" value="${currentData.lists[index].listName}" />
      <button id="saveEditBtn">Gem</button>
      <button id="cancelEditBtn">Annuller</button>
    `;
    document.getElementById('saveEditBtn').onclick = function() {
      const newName = document.getElementById('editInput').value;
      currentData.lists[index].listName = newName;
      localStorage.setItem('toDoApp_v1', JSON.stringify(currentData));
      makeListView(currentData);
    };
    document.getElementById('cancelEditBtn').onclick = function() {
      makeListView(currentData);
    };
  }
  if(action === 'showList') {
    alert('der er intet at vise');
  }
}
//#endregion

//buttons

// Opret knappen Makenewlist
let MakeNewList = document.createElement("button");
MakeNewList.innerText = "MakeNewList";


// Tilføj funktionalitet
MakeNewList.addEventListener("click", createtask);

function createtask(){
    let taskinput = document.createElement('input')
    document.body.appendChild(taskinput);
    console.log(taskinput.value)
    
    // Opret knappen save
    let saveButton = document.createElement("button");
    saveButton.innerText = "save";
    saveButton.addEventListener("click", () => {
        const taskning = taskinput.value;
        saveData({
            listName: taskning, // <-- ændret fra name til listName
            id: crypto.randomUUID(),
            tasks: []
        });
        makeListView(getData()); // Opdater visningen efter gem
    })

    // Tilføj knappen til siden (f.eks. body)
    document.body.appendChild(saveButton);
}

// Tilføj knappen til siden (f.eks. body)
document.body.appendChild(MakeNewList);

// Find knapperne via deres id
const darkBtn = document.getElementById("darkmode");
const lightBtn = document.getElementById("Lightmode");

// Funktion til at skifte mode
function setDarkMode(isDark) {
    document.body.classList.toggle("darkmode", isDark);
    document.body.classList.toggle("lightmode", !isDark);

    // Gem i currentData og localStorage
    currentData.darkMode = isDark;
    localStorage.setItem('toDoApp_v1', JSON.stringify(currentData));
}

// Event listeners
if (darkBtn) darkBtn.onclick = () => setDarkMode(true);
if (lightBtn) lightBtn.onclick = () => setDarkMode(false);

// Når appen starter, sæt mode ud fra data
function applySavedMode() {
    if (currentData && typeof currentData.darkMode === "boolean") {
        setDarkMode(currentData.darkMode);
    }
}

// Efter initApp()
initApp();
applySavedMode();

