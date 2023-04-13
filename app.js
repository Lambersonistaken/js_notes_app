const addBox = document.querySelector(".add-box")
const popupBox = document.querySelector(".popup-box")
const popupTitle = popupBox.querySelector("header p")
const closeIcon = popupBox.querySelector(".uil-times")
const addButton = popupBox.querySelector("button")
const titleTag = popupBox.querySelector("input")
const descTag = popupBox.querySelector("textarea")

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
localStorage.clear();
const notes = JSON.parse(localStorage.getItem("notes") || "[]")
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show")
})

closeIcon.addEventListener("click", () => {
    isUpdate = false
    popupBox.classList.remove("show")
    titleTag.value = "";
    descTag.value = "";
    addButton.innerText = "Add Note"
    popupTitle.innerText = "Add a new Note"
}
)


function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note,index) => {
        let liTag = `<li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings">
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="menu">
                    <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen">Edit</i></li>
                    <li onclick="deleteNote(${index})" ><i class="uil uil-trash">Delete</i></li>
                </ul>
            </div>
        </div>
    </li>`;
    addBox.insertAdjacentHTML("afterend",liTag)
    })
}
showNotes();

function showMenu (elem) {
    elem.parentElement.classList.add("show")
    document.addEventListener("click", e => {
        // removing show class when u click document
        if(e.target.tagName != "I" || e.target!=elem) {
            elem.parentElement.classList.remove("show")
        }
    })
}

function deleteNote (noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note ?")
    if(!confirmDel) return;
    notes.splice(noteId,1) // removing selected node from array/tasks
    // saving update notes to localstorage
    localStorage.setItem("notes",JSON.stringify(notes));
    showNotes();
}


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
        if(!isUpdate){
            notes.push(noteInfo)
        }
        else {
            isUpdate = false
            notes[updateId] = noteInfo; // updating specified note
        }
        console.log(noteInfo);
        //notes.push(noteInfo); // adding new note to notes
        // saving notes to local storage
        localStorage.setItem("notes",JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }

    
   
})


function updateNote (noteId,title,desc) {
        isUpdate = true
        updateId = noteId
        addBox.click(); // open addbox to update note
        addButton.innerText = "Update Note"
        popupTitle.innerText = "Update a Note"
        titleTag.value = title
        descTag.value  = desc
}
