//knapper og håndtering af bruger input.

document.getElementById("saveButton") 
addEventListener("click",()=>{
    const input = document.getElementById("save").value;
    const data = Model.getData();
    data.push({text:input});
    model.saveData(data);
    renderList(data);
})

//CREATE BUTTON
let createButton = document.createElement("button")
createButton.innerText = "Make New List"
// createButton.addEventListener("click", createInput)
mainContainer.appendChild("MakeNewListButton")