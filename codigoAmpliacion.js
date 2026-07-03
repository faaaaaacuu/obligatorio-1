//////////////////          AMPLIACION DINAMICA                //////////////////////////////////

let parametros = new URLSearchParams(window.location.search)
let identificador = parametros.get('id')

let proyecto = proyectos.at(identificador)

document.querySelector("#detail-title").innerHTML = proyecto.title
document.querySelector("#detail-artist").innerHTML = proyecto.artist
document.querySelector("#detail-genre").innerHTML = proyecto.genre
document.querySelector("#detail-release").innerHTML = proyecto.releaseDate
document.querySelector("#detail-popularity").innerHTML = proyecto.popularity
document.querySelector("#detail-tracks-released").innerHTML = proyecto.totalTracks
document.querySelector("#detail-long-description").innerHTML = proyecto.description
document.querySelector("#detail-cover-img").src = proyecto.coverImage

let tourStatus = onTour(proyecto.tourStart, proyecto.tourEnd)
let tourStatusButton = document.querySelector("#detail-tour-status button")
tourStatusButton.classList.add('tourStatus')
tourStatusButton.innerHTML = tourStatus

let tracklist = document.querySelector("#detail-tracklist")
tracklist.innerHTML = ""
for (let track of proyecto.tracks) {
    tracklist.innerHTML += `<li><span class="track-name">${track}</span></li>`
}
document.querySelector("#tracklist-count").innerHTML = proyecto.totalTracks



let related = []

for(let projRel of proyectos){
    if(projRel.type === proyecto.type && projRel.id !== proyecto.id){
        related.push(projRel)
 
       /*  console.log(projRel); */
        
        
    }
}

let relatedGrid = document.querySelector(".related .album-grid")
relatedGrid.innerHTML = ""

for(let i = 0; i < 3; i++){
    let rel = related[i]
    relatedGrid.innerHTML += `
        <a href="detalle.html?id=${rel.id}" class="article-link">
            <article class="album">
                <img src="${rel.coverImage}" alt="${rel.title}">
                <div class="album-info">
                    <h3>${rel.title}</h3>
                    <p>${rel.artist}</p>
                </div>
            </article>
        </a>`
}
