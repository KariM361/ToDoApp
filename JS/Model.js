//data og logik(oprettelse,opdatering og sletning af lister.)

let objData = getData()
let obj ={}

//#region Model code
export function getData(){
    console.log('getData');
    let data=localStorage.getItem('toDoApp_v1')
    return JSON.parse(data)
   }
export function saveData(myData){
    console.log(myData);
    let data = getData();
    if (!data) data = makeNewData();
    data.lists.push(myData);
    localStorage.setItem('toDoApp_v1', JSON.stringify(data));
}
export function makeNewData(){
    console.log('makeNewData');
    return {
        darkMode: false,
        lists: []
    };
}
//#endregion model code