//////////////////          CATALOGO                //////////////////////////////////
let container = document.querySelector(".catalog-grid")
let inpSearch = document.querySelector("#searchbar")

function renderList(array) {
    container.innerHTML = ""

    if (array.length === 0) {
        container.innerHTML += `<p class="results-empty">No proyects have been found <br> try adding it <a href="form.html">here <3</a></p>`
    } else {
        for (let proyecto of array) {
            container.innerHTML +=
                `<a href="detalle.html?id=${proyecto.id}" class="catalog-card"> 
            <article class="catalog-card">
                <img src="${proyecto.coverImage}" alt="Project cover">
                <div class="catalog-card-info">
                    <p>${proyecto.genre}</p>
                    <h3>${proyecto.title}</h3>
                    <span>${proyecto.artist}</span>
                </div>
                <div class="catalog-card-meta">
                    <span>${proyecto.popularity}</span>
                    <span>${proyecto.type}</span>
                </div>
            </article>
            </a>`
        }
    }

    //////////////////          CATALOGO NUMERO DE PROYECTOS                //////////////////////////////////
    let proyectNumber = document.querySelector(".results-header span")
    if (proyectNumber) {
        proyectNumber.innerHTML = array.length
    }
}

renderList(proyectos)


//////////////////          IR A AMPLIACION DESDE CATALOGO                //////////////////////////////////
let parametros = new URLSearchParams(window.location.search)
let identificador = parametros.get('id')

let proyecto = proyectos.at(identificador)


/////////// FILTRADO ///////////////////

//////// search ///////

inpSearch.addEventListener("input", applyFilters)

//////////                                       selects                                       //////////



///////// select artistas ////////

let selectArtists = document.querySelector("#artist-filter")

function loadArtists() {
    let Proyectartists = [];

    for (let i = 0; i < proyectos.length; i++) {
        let artists = proyectos[i].artist;

        if (Proyectartists.includes(artists) === false) {
            Proyectartists.push(artists)
        }
    }

    for (let i = 0; i < Proyectartists.length; i++) {
        selectArtists.innerHTML += `<option value="${Proyectartists[i]}">${Proyectartists[i]}</option>`
    }
}

selectArtists.addEventListener("change", applyFilters)

loadArtists()


////////// select pais //////////
let selectCountry = document.querySelector("#country-filter")

function loadCountries() {
    let ProyectCountries = [];

    for (let i = 0; i < proyectos.length; i++) {

        let countries = proyectos[i].country;

        for (let j = 0; j < countries.length; j++) {

            let country = countries[j];

            if (ProyectCountries.includes(country) === false) {
                ProyectCountries.push(country);
            }
        }
    }

    /* console.log(ProyectCountries); */

    for (let i = 0; i < ProyectCountries.length; i++) {
        selectCountry.innerHTML += `
            <option value="${ProyectCountries[i]}">
                ${ProyectCountries[i]}
            </option>
        `;
    }
}

loadCountries()
selectCountry.addEventListener("change", applyFilters)


///////// select type ////////

let selectType = document.querySelector("#type-filter")

function loadTypes() {
    let ProyectTypes = [];

    for (let i = 0; i < proyectos.length; i++) {
        let type = proyectos[i].type;
        if (ProyectTypes.includes(type) === false) {
            ProyectTypes.push(type)
        }
    }

    for (let i = 0; i < ProyectTypes.length; i++) {
        selectType.innerHTML += `<option value="${ProyectTypes[i]}">  ${ProyectTypes[i]}</option>`
    }   


}

selectType.addEventListener("change", applyFilters)

loadTypes()


///////checkbox tour/

let onTourFilter = document.querySelector("#tour")
onTourFilter.addEventListener("change", applyFilters)

let onTourParam = parametros.get('onTour')
if (onTourParam === "true") {
    onTourFilter.click();
}


//////////////aplicar filtros/////////////////
function applyFilters() {
    console.log(selectArtists);

    let selectedArtist = selectArtists.value;
    let selectedCountry = selectCountry.value;
    let selectedType = selectType.value;
    let searchedText = inpSearch.value.toLowerCase();

    let filteredArray = [];

    for (let i = 0; i < proyectos.length; i++) {
        let proyecto = proyectos[i];
        let matchArtist = selectedArtist === "" || proyecto.artist === selectedArtist;
        let matchCountry = selectedCountry === "" || proyecto.country.includes(selectedCountry);
        let matchType = selectedType === "" || proyecto.type === selectedType;
        let matchSearch = proyecto.title.toLowerCase().includes(searchedText);
        let matchTour = true;

        if (onTourFilter.checked) {
            matchTour = onTour(proyecto.tourStart, proyecto.tourEnd) === "On Tour";
        }

        if (matchArtist && matchCountry && matchType && matchSearch && matchTour) {
            filteredArray.push(proyecto)
        }
    }

    renderList(filteredArray)
}


//////////////filtro artista especifico index ontour //////////////

let paramsCatalogo = new URLSearchParams(window.location.search)
let artistParam = paramsCatalogo.get('artist')

if (artistParam) {
    selectArtists.value = artistParam
    applyFilters()
}


////////// filtro album nav ///////             /tenia que estar despues de apply filters para que funcionara :)

let paramsAlbums = new URLSearchParams(window.location.search)
let albumParam = paramsAlbums.get('onAlbum')

if (albumParam === 'true') {    
    selectType.value = "album"
    applyFilters()
}

/////////////////////  clear filters /////
let ClearBtn = document.querySelector("#clear-btn");

function cleanFilters() {
    selectArtists.value = ""
    selectCountry.value = ""
    selectType.value = ""
    inpSearch.value = ""
    renderList(proyectos)
}

ClearBtn.addEventListener("click", cleanFilters);

