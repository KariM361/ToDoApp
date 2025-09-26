//#region globals
const mainContainerSection = document.getElementById('mainContainer');
let currentData = null;
//#endregion

// initApp() //aner ikke hvorfor den skal slettes her???

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
//#endregion model code

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
//#endregion controller code
//#region View code
function makeListView(data){
    mainContainerSection.innerHTML = '';
    mainContainerSection.appendChild(MakeNewList); // <-- tilføj denne linje
    data.lists.forEach((list, index) => {
        let listContainer = document.createElement('div');
        listContainer.className = "list-item";
        // Gør listenavnet klikbart
        let nameBtn = document.createElement('button');
        nameBtn.textContent = list.listName;
        nameBtn.onclick = () => showList(index);

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Slet";
        deleteBtn.onclick = () => listViewCallBack('delete', index);

        let editBtn = document.createElement('button');
        editBtn.textContent = "Rediger";
        editBtn.onclick = () => listViewCallBack('edit', index);

        listContainer.appendChild(nameBtn);
        listContainer.appendChild(deleteBtn);
        listContainer.appendChild(editBtn);

        mainContainerSection.appendChild(listContainer);
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
    alert('udfyld feltet skriv her...');
  }
}
//#endregion View code

function showList(index) {
    const list = currentData.lists[index];
    mainContainerSection.innerHTML = '';

    // Overskrift
    const title = document.createElement('h2');
    title.textContent = list.listName;
    mainContainerSection.appendChild(title);

    // Vis tasks med checkbox
    const ul = document.createElement('ul');
    list.tasks.forEach((task, taskIndex) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        
        // Hvis du vil gemme status, kan du bruge et objekt i stedet for tekst i tasks-arrayet
        checkbox.checked = task.done === true;

        // Opdater status når der klikkes
        checkbox.onchange = () => {//opdatere om en underopgave er færdig eller ej og gemme det i data.
            
            // Hvis man gemmer tekst, så lav opgave(tasks) til objekter:
            if (typeof task === "string") {
                list.tasks[taskIndex] = { text: task, done: checkbox.checked };
            } else {
                list.tasks[taskIndex].done = checkbox.checked;
            }
            localStorage.setItem('toDoApp_v1', JSON.stringify(currentData));
            showList(index); // Opdater visningen for at vise gennemstreget tekst
        };

        // Vis tekst og gennemstregning
        const span = document.createElement('span');
        
        span.textContent = typeof task === "string" ? task : task.text;
        if ((typeof task === "object" && task.done) || checkbox.checked) {
            span.style.textDecoration = "line-through";
            span.style.color = "#626161ff";
        }

        li.appendChild(checkbox);
        li.appendChild(span);
        ul.appendChild(li);
    });
    mainContainerSection.appendChild(ul);

    // Input til ny task(opgave/underopgave)
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Tilføj opgave...';

    const addBtn = document.createElement('button');
    addBtn.textContent = 'Tilføj';
    addBtn.onclick = () => {
        const value = input.value.trim();
        if (value.length === 0) return;
        
        // Gem som objekt så vi kan huske "done"
        list.tasks.push({ text: value, done: false });
        localStorage.setItem('toDoApp_v1', JSON.stringify(currentData));
        showList(index); // Opdater visningen
    };

    mainContainerSection.appendChild(input);
    mainContainerSection.appendChild(addBtn);

    // Tilbage-knap
    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back';
    backBtn.onclick = () => makeListView(currentData);
    mainContainerSection.appendChild(backBtn);
}

//buttons

// Opret knappen Makenewlist
let MakeNewList = document.createElement("button");
MakeNewList.innerText = "MakeNewList";


// Tilføj funktionalitet
MakeNewList.addEventListener("click", createtask);

function createtask(){
    // Opret input og save-knap i et container-div
    let inputDiv = document.createElement('div');
    inputDiv.style.margin = "1rem";

    let taskinput = document.createElement('input');
    taskinput.type = "text";
    taskinput.placeholder = "Write here...";

    let saveButton = document.createElement("button");
    saveButton.innerText = "Save";

    // Tilbage-knap
    let backButton = document.createElement("button");
    backButton.innerText = "back";
    backButton.onclick = () => {
        inputDiv.remove();
        makeListView(currentData);
    };

    // Når der klikkes på save
    saveButton.addEventListener("click", () => {
        const taskning = taskinput.value.trim();
        if (taskning.length === 0) {
            alert("Du skal skrive en opgave!");
            return;
        }
        saveData({
            listName: taskning,
            id: crypto.randomUUID(),
            tasks: []
        });
        // Fjern input og knapper igen
        inputDiv.remove();
        // Opdater visningen
        currentData = getData();
        makeListView(currentData);
    });

    // Tilføj input og knapper til container
    inputDiv.appendChild(taskinput);
    inputDiv.appendChild(saveButton);
    inputDiv.appendChild(backButton);

    // Tilføj container til mainContainerSection
    mainContainerSection.appendChild(inputDiv);

    // Sæt fokus i inputfeltet
    taskinput.focus();
}
// Tilføj knappen til siden (f.eks. maincontainer)
       mainContainerSection.append(MakeNewList);

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
//=== nøjagtigt det samme.
function applySavedMode() {
    if (currentData && typeof currentData.darkMode === "boolean")//True/false
         {
        setDarkMode(currentData.darkMode);
    }
}

// Efter initApp()
initApp();
applySavedMode();

