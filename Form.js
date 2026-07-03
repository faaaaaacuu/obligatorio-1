//////////////////          form                //////////////////////////////////

let titleField = document.querySelector("#inputTitle")
let artistField = document.querySelector("#inputArtist")
let typeSelect = document.querySelector("#inputType")
let statusSelect = document.querySelector("#inputStatus")
let tracksField = document.querySelector("#inputTracks")
let dateField = document.querySelector("#inputDate")
let coverField = document.querySelector("#inputCover")
let genreField = document.querySelector("#inputGenre")
let archiveForm = document.querySelector("#projectForm")

let titleError = document.querySelector("#titleError")
let artistError = document.querySelector("#artistError")
let tracksError = document.querySelector("#tracksError")
let dateError = document.querySelector("#dateError")
let coverError = document.querySelector("#coverError")
let genreError = document.querySelector("#genreError")
let successMsg = document.querySelector("#successMsg")

/////////// error / ok  ///////////

function showError(field, errorSpan, message) {
    errorSpan.innerHTML = message

    field.classList.add("input-error")
    field.classList.remove("input-ok")
}

function showOk(field, errorSpan) {
    errorSpan.innerHTML = ""

    field.classList.add("input-ok")
    field.classList.remove("input-error")
}

/////////// validaciones      /////////// 

function validateTitle() { 

    //borrar mensjae cuando se intente agregar otro proyecto
    if(successMsg.style.display === "block"){
        successMsg.style.display='none'
    }


    if (titleField.value.length === 0) {
        showError(titleField, titleError, "Title is required.")
        return false
    }
    else if (titleField.value.length < 2) {
        showError(titleField, titleError, "Title must be at least 2 characters.")
        return false
    }
    else {
        showOk(titleField, titleError)
        return true
    }
}

function validateArtist() {
    if (artistField.value.length === 0) {
        showError(artistField, artistError, "Artist name is required.")
        return false
    }
    else {
        showOk(artistField, artistError)
        return true
    }
}

function validateTracks() {

    let val = Number(tracksField.value)
    if (isNaN(val)) {
        showError(tracksField, tracksError, "Enter a valid number.")
        return false
    }
    else if (tracksField.value.length === 0) {
        showError(tracksField, tracksError, "Number of tracks is required.")
        return false
    }
    else if (val < 1 || val % 1 !== 0) {
        showError(tracksField, tracksError, "Must be a whole number greater than 0.")
        return false
    }
    else if (typeSelect.value === "Single" && val !== 1) {
        showError(tracksField, tracksError, "A Single must have exactly 1 track.")
        return false
    }
    else if (typeSelect.value === "EP" && val > 6) {
        showError(tracksField, tracksError, "An EP must have fewer than 6 tracks.")
        return false
    }
    else if (typeSelect.value === "Album" && val < 6) {
        showError(tracksField, tracksError, "An Album must have 6 or more tracks.")
        return false
    }
    else {
        showOk(tracksField, tracksError)
        return true
    }
}

function validateDate() {
    if (dateField.value.length === 0) {
        showError(dateField, dateError, "Release date is required.")
        return false
    }

    let hoy = new Date()
    hoy.setHours(0, 0, 0, 0)

    let selectedDate = new Date(dateField.value)

    if (statusSelect.value === "Coming Soon") {
        if (selectedDate <= hoy) {
            showError(dateField, dateError, "A 'Coming Soon' release must have a future date.")
            return false
        }
    }

    if (statusSelect.value === "Released") {
        if (selectedDate >= hoy) {
            showError(dateField, dateError, "A 'Released' release must have a past date.")
            return false
        }
    }

    showOk(dateField, dateError)
    return true
}

function validateCover() {
    if (!coverField.files || coverField.files.length === 0) {
        showError(coverField, coverError, "A cover image is required.")
        return false
    }

    // esto googlee como se hacia // 
    else if (coverField.files[0].size > 2 * 1024 * 1024) {
        showError(coverField, coverError, "Cover image must be smaller than 2MB.")
        return false
    }
    else {
        showOk(coverField, coverError)
        return true
    }
}

function validateGenre() {
    if (genreField.value.length === 0) {
        showError(genreField, genreError, "Genre is required.")
        return false
    }
    else {
        showOk(genreField, genreError)
        return true
    }
}

/////////// validaciones tiempo real /////////

titleField.addEventListener("input", validateTitle)
artistField.addEventListener("input", validateArtist)
tracksField.addEventListener("input", validateTracks)
typeSelect.addEventListener("change", validateTracks)
dateField.addEventListener("input", validateDate)
statusSelect.addEventListener("change", validateDate)
coverField.addEventListener("change", validateCover)
genreField.addEventListener("input", validateGenre)

/////////// mandar ///////////

archiveForm.addEventListener("submit", function (infoSent) {
    infoSent.preventDefault() //use el preventDefault porque sino me recarcaba la pagina y no me agregaba la card

    let okTitle = validateTitle()
    let okArtist = validateArtist()
    let okTracks = validateTracks()
    let okDate = validateDate()
    let okCover = validateCover()
    let okGenre = validateGenre()

    if (okTitle && okArtist && okTracks && okDate && okCover && okGenre) {

        let savedTitle = titleField.value
        let savedArtist = artistField.value
        let savedType = typeSelect.value
        let savedGenre = genreField.value
        let savedDate = dateField.value

        successMsg.innerHTML = "✓ Project submitted successfully."
        successMsg.style.display = "block"

        archiveForm.reset()

        let addedToList = document.querySelector("#addedList")

        addedToList.innerHTML += `
            <article class="album">
                <div class="album-info">
                    <h3>${savedTitle}</h3>
                    <p>${savedArtist}</p>
                    <p>${savedType} · ${savedGenre}</p>
                    <p>${savedDate}</p>
                </div>
            </article>
        `

        titleField.className = ""
        artistField.className = ""
        tracksField.className = ""
        dateField.className = ""
        coverField.className = ""
        genreField.className = ""

        titleError.innerHTML = ""
        artistError.innerHTML = ""
        tracksError.innerHTML = ""
        dateError.innerHTML = ""
        coverError.innerHTML = ""
        genreError.innerHTML = ""

        
    }
})