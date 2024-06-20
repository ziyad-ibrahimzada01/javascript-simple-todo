const form=document.querySelector("form")
const title=document.querySelector(".title")
const description=document.querySelector(".description")
const tbody=document.querySelector("tbody")
let itemCount=0
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    if(!title.value){
        alert("Do not hold titile empty")
    }
    else if(!description.value){
        alert("Do not hold description empty")
    }
    else{
        itemCount++;  
        const tr = document.createElement("tr")
        const createAndAppendTd = (content) => {
        const td = document.createElement("td")
        td.textContent = content;
        tr.appendChild(td)
    }
    createAndAppendTd(itemCount)
        createAndAppendTd(title.value)
        createAndAppendTd(description.value)
        createAndAppendTd(new Date().toLocaleString())
        tbody.appendChild(tr)
        form.reset();
       }
})