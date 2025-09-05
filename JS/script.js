//Write cool JS here...
let objData = getData()
let obj ={}





function saveData(){
    localStorage.setItem("",JSON,stringify(obj))
}
//CREATE BUTTON
let createButton = document.createElement("button")
createButton.innerText = "create new"
createButton.addEventListener("click", createInput)
mainContainer.appendChild(createButton)

//SAVE BUTTON
let saveButton = document.createElement("button")
saveButton.innerText = "save"
saveButton.addEventListener("click", saveData)
mainContainer.appendChild(saveButton)