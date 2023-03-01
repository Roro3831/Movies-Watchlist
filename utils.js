let moviesArray = []
let moviesLocalStorage = []

async function setMoviesArray(dataSearch){ 
    moviesArray = []
    for(const movie of dataSearch){      
        const res = await fetch(`https://www.omdbapi.com/?apikey=5db38818&i=${movie.imdbID}`) // specific search by title
        const data = await res.json()
        if (data.Response === 'True'){
            moviesArray.push({
                poster : data.Poster,
                title : data.Title,
                rating : data.imdbRating,
                runtime : data.Runtime,
                genre : data.Genre,
                plot : data.Plot,
                imdbId : data.imdbID
            })
        }
    }
}

function getHtml(movieArray){
    if(moviesLocalStorage.length !== localStorage.length){
        setLocalStorageArray() //update moviesLocalStorage for getWatchlistDivEl()
    }
    let html = ''
    movieArray.forEach((movie,index) => {
        const [btnSign, imgSign, textSign] = getWatchlistDivEl(movie.imdbId)
            html +=  `
                <div class="movie">
                    <img src= "${movie.poster}" class="movie-img">
                    <div class="titre">
                        <h3>${movie.title}</h3>
                        <h3><img src="/images/iconEtoile.png"> ${movie.rating}</h3>
                    </div> 
                    <p class="duree">${movie.runtime}</p>
                    <p class="genre">${movie.genre}</p>
                    <div class="watchlist-btn">
                        <img src=${imgSign} class=${btnSign} data-movie="${index}">
                        <p>${textSign}</p>
                    </div>
                    <div class="desc-movie">
                        <span>${movie.plot}</span>
                    </div>
                </div>`   
    })
    return html
}

function setLocalStorageArray(){
    moviesLocalStorage = []
    for(const movie in localStorage){ // with for in and not for of...
        if (!localStorage.hasOwnProperty(movie)) {
            continue; // skip keys like "setItem", "getItem" ...
          }
          moviesLocalStorage.push(JSON.parse(localStorage.getItem(movie)))
    }
}

function getWatchlistDivEl(imdbId){
    let btnSign = "btn-plus"
    let imgSign = "/images/IconPlusBlack.png"
    let textSign = "Watchlist"
    for (let movie of moviesLocalStorage){
        if (movie.imdbId.includes(imdbId)){
            btnSign = "btn-moins"
            imgSign = "/images/IconMoins.png"
            textSign = "Remove"
        }
    }
    return [btnSign, imgSign, textSign]
}


export {moviesArray, moviesLocalStorage, setMoviesArray, getHtml, setLocalStorageArray}




// window.addEventListener("resize", e => {
//     const desMovie = document.querySelectorAll(".desc-movie")
//     desMovie.forEach(element =>{
//         if ((element.offsetHeight < element.scrollHeight) || (element.offsetWidth < element.scrollWidth)){
//             if(!element.classList.contains('tronquer')){
//                 element.classList.add("tronquer")
//             } 
//         }
//         else {
//             element.classList.remove('tronquer')
//         }
//     })
// })