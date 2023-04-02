const addBox = document.querySelector(".add-box")
const popupBox = document.querySelector(".popup-box")
const closeIcon = document.querySelector(".uil-times")
const addButton = document.querySelector("button")
const titleTag = document.querySelector("input")
const descTag = document.querySelector("textarea")

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const notes = JSON.parse(localStorage.getItem("notes") || "[]")
addBox.addEventListener("click", () => {
    popupBox.classList.add("show")
})

closeIcon.addEventListener("click", () => {
    popupBox.classList.remove("show")
})


function showNotes () {
        notes.foreach((note) => {
            let liTag = `<li class="note">
            <div class="details">
                <p>${note}</p>
                <span>Lorem ipsum dolor sit amet consectetur, adipis veniet itaque eius dicta harum quia.</span>
            </div>
            <div class="bottom-content">
                <span>April 7, 2023</span>
                <div class="settings">
                    <i class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                        <li><i class="uil uil-pen">Edit</i></li>
                        <li><i class="uil uil-trash">Delete</i></li>
                    </ul>
                </div>
            </div>
        </li>`
        })
}
showNotes();


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
        console.log(noteInfo);
        notes.push(noteInfo); // adding new note to notes
        // saving notes to local storage
        localStorage.setItem("notes",JSON.stringify(notes));
        closeIcon.click();
    }

    
   
})