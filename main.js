const form = document.querySelector("form")
const title = document.querySelector(".title")
const description = document.querySelector(".description")
const updatedAt = ""
const tbody = document.querySelector("tbody")
const filterInput = document.querySelector("#filter")
const fileInput = document.querySelector("#file")
let itemCount = 0
let currentRow = null
form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (!title.value) {
        alert("Do not hold title empty")
    } else if (!description.value) {
        alert("Do not hold description empty")
    } else {
        const files = Array.from(fileInput.files)
        if (currentRow) {
            currentRow.cells[1].textContent = title.value
            currentRow.cells[2].textContent = description.value
            updatePhotoCell(currentRow.cells[3], files)
            currentRow.cells[5].textContent = new Date().toLocaleString()
            currentRow = null
        } else {
            itemCount++
            const tr = document.createElement("tr")
            const createAndAppendTd = (content) => {
                const td = document.createElement("td")
                td.textContent = content
                tr.appendChild(td)
            }
            createAndAppendTd(itemCount)
            createAndAppendTd(title.value)
            createAndAppendTd(description.value)
            const tdPhotos = document.createElement("td")
            updatePhotoCell(tdPhotos, files)
            tr.appendChild(tdPhotos)
            createAndAppendTd(new Date().toLocaleString())
            createAndAppendTd(updatedAt)
            const tdActions = document.createElement("td")
            const updateBtn = document.createElement("button")
            updateBtn.textContent = "Update"
            updateBtn.className = "btn btn-primary"
            updateBtn.addEventListener("click", () => {
                updateRow(tr)
            })
            tdActions.appendChild(updateBtn)
            const deleteBtn = document.createElement("button")
            deleteBtn.textContent = "Delete"
            deleteBtn.className = "btn btn-danger m-1"
            deleteBtn.addEventListener("click", () => {
                tr.remove()
            })
            tdActions.appendChild(deleteBtn)
            tr.appendChild(tdActions)
            tbody.appendChild(tr)
        }
        form.reset()
    }
})
function updateRow(row) {
    title.value = row.cells[1].textContent
    description.value = row.cells[2].textContent
    currentRow = row
}
function updatePhotoCell(td, files) {
    td.innerHTML = ""
    files.forEach(file => {
        const img = document.createElement("img")
        img.src = URL.createObjectURL(file)
        img.style.width = "50px"
        img.style.height = "50px"
        td.appendChild(img)
    })
}
filterInput.addEventListener("input", () => {
    const filterValue = filterInput.value.toLowerCase()
    const rows = tbody.querySelectorAll("tr")
    rows.forEach((row) => {
        const titleCell = row.cells[1].textContent.toLowerCase()
        const descriptionCell = row.cells[2].textContent.toLowerCase()
        if (titleCell.includes(filterValue) || descriptionCell.includes(filterValue)) {
            row.style.display = ""
        } else {
            row.style.display = "none"
        }
    })
})