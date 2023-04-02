const addBox = document.querySelector(".add-box")
const popupBox = document.querySelector(".popup-box")
const closeIcon = document.querySelector(".uil-times")
const addButton = document.querySelector("button")
const titleTag = document.querySelector("input")
const descTag = document.querySelector("textarea")

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


addBox.addEventListener("click", () => {
    popupBox.classList.add("show")
})

closeIcon.addEventListener("click", () => {
    popupBox.classList.remove("show")
})

addButton.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value;
    let noteDesc = descTag.value;

    if(noteTitle || noteDesc) {
        // Get the current date
        let dateObj = new Date();
        let day = dateObj.getDate();
        let month = months[dateObj.getMonth()]
        let year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${day} ${month} ${year}`
        }
        console.log(noteInfo)
        noteDesc.push(noteInfo) // adding new note to notes
        // saving notes to local storage
        localStorage.setItem("notes",notes)

    }

    
   
})