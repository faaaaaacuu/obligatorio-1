
TodaysPlaylist()

function TodaysPlaylist() {
    let allTracks = []
    let TodaysPlaylist = []



    for (let proyecto of proyectos) {

        if (proyecto.status !== "coming") {


            for (let song of proyecto.tracks) {


                allTracks.push({
                    name: song,
                    artist: proyecto.artist,
                    coverImage: proyecto.coverImage,
                    id: proyecto.id

                }

                )
            }
        }
    }

    /* console.log(allTracks); */

    for (let i = 0; i < 12; i++) {
        let RandomSongs = Math.floor(Math.random() * allTracks.length)



        if (TodaysPlaylist.includes(allTracks[RandomSongs])) {
            i--
        }
        else { TodaysPlaylist.push(allTracks[RandomSongs]) }

    }

    /* console.log(TodaysPlaylist); */

    let card = document.querySelector("#carousel")
    card.innerHTML = ""


    for (let songs of TodaysPlaylist) {

        card.innerHTML += `<a href="detalle.html?id=${songs.id}"  class="card">
                    
                    <img src="${songs.coverImage}">
                    <div class="info">
                        <h3>${songs.name}</h3>
                        <p class="artist">${songs.artist}</p>
                    </div>
                </a>`
    }
}

setInterval(TodaysPlaylist, 1000 * 60 * 60 * 24)





/// cards on tour ///

let artistsOnTour = [];
let tourIndex = 0;

for (let proyecto of proyectos) {
    let status = onTour(proyecto.tourStart, proyecto.tourEnd);

    if (status === "On Tour") {
        let yaEsta = false;
        for (let artistaGuardado of artistsOnTour) {
            if (artistaGuardado.artist === proyecto.artist) {
                yaEsta = true;
            }
        }
        if (yaEsta === false) {
            artistsOnTour.push({
                artist: proyecto.artist,
                artistImage: proyecto.artistImage,
                id: proyecto.id
            });
        }
    }
}

function ArtistsOnTour() {
    let tourGrid = document.querySelector("#tour-grid")
    tourGrid.innerHTML = ""

    for (let i = 0; i < 2; i++) {
        let artista = artistsOnTour[(tourIndex + i) % artistsOnTour.length]
        tourGrid.innerHTML += `
        <a href="catalogo.html?artist=${encodeURIComponent(artista.artist)}" class="article-link">
            <article class="tour-card">
                <img src="${artista.artistImage}">
                <div class="tour-info">
                    <h3>${artista.artist}</h3>
                    <p>On tour</p>
                </div>
            </article>
        </a>
        `
    }

    tourIndex++
}

// los nombres de artistas con espacios me estaban rompiendo la URL cuando los pasaba como parámetro y claude me recomendó encodeURIComponent para ayudar al fromato de las URLs para pasar por ejemplo de  "Ariana Grande" a "Ariana%20Grande".

ArtistsOnTour()
setInterval(ArtistsOnTour, 1000 * 5)

/// cards latest ///

let latestProjects = []

for (let proyecto of proyectos) {
    latestProjects.push(proyecto)
}

let latest3 = []

for (let i = 0; i < 3; i++) {
    let masReciente = latestProjects[0]

    for (let j = 0; j < latestProjects.length; j++) {
        if (new Date(latestProjects[j].releaseDate) > new Date(masReciente.releaseDate)) {
            masReciente = latestProjects[j]
        }
    }

    latest3.push(masReciente)
    latestProjects.splice(latestProjects.indexOf(masReciente), 1)
}

let albumGrid = document.querySelector(".trending .album-grid")
albumGrid.innerHTML = ""

for (let proyecto of latest3) {
    albumGrid.innerHTML += `<a href="detalle.html?id=${proyecto.id}" class="article-link">
        <article class="album">
            <img src="${proyecto.coverImage}" alt="${proyecto.title}">
            <div class="album-info">
                <h3>${proyecto.title}</h3>
                <p>${proyecto.artist}</p>
            </div>
        </article>
    </a>`
}


/// promises ///

let AllPromises = []

function promises() {
    for (let proyecto of proyectos) {
        if (proyecto.popularity < 45) {
            let yaEsta = false
            for (let SavedPromise of AllPromises) {
                if (SavedPromise.artist === proyecto.artist) {
                    yaEsta = true
                }
            }
            if (yaEsta === false) {
                AllPromises.push({
                    popularity: proyecto.popularity,
                    id: proyecto.id,
                    artist: proyecto.artist,
                    photo: proyecto.artistImage
                })
            }
        }
    }
}

promises()

let promisesList = document.querySelector(".promises .artist-list")
promisesList.innerHTML = ""

for (let i = 0; i < 5; i++) {
    let promise = AllPromises[i]
    promisesList.innerHTML += `
        <a href="detalle.html?id=${promise.id}" class="article-link">
            <article class="promise">
                <img src="${promise.photo}">
                <h3>${promise.artist}</h3>
            </article>
        </a>`
}