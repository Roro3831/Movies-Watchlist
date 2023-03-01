import {moviesArray, setMoviesArray, getHtml} from "./utils.js"

const textSearch = document.getElementById('search')
const searchForm = document.getElementById('search-form')
const reponseDiv = document.getElementById("reponse")
const mainVideDiv = document.getElementById('main-vide')

// localStorage.clear()

searchForm.addEventListener('submit', async e => {
    e.preventDefault()
    const res = await fetch(`https://www.omdbapi.com/?apikey=5db38818&s=${textSearch.value}`) //  general search
    const data = await res.json()
    if(data.Response === "True"){
        reponseDiv.innerHTML = `<img class="loader" src=/images/50655.gif>`
        mainVideDiv.textContent = ''
        setMoviesArray(data.Search).then(() => render())
    }
    else {
        mainVideDiv.innerHTML = `<h1 class="text-vide">Unable to find what you're looking for.
          Please try another search.</h1>`
        reponseDiv.textContent = ''
    }
})

document.addEventListener("click", e => {
    if (e.target.className === 'btn-plus'){
        const movie = moviesArray[e.target.dataset.movie]
        localStorage.setItem(movie.imdbId, JSON.stringify(movie))
        render()
    }
    else if(e.target.className === 'btn-moins'){
        const movie = moviesArray[e.target.dataset.movie]
        localStorage.removeItem(movie.imdbId)
        render()
    }
})


function render(){
    const html = getHtml(moviesArray)
    mainVideDiv.textContent = ''
    reponseDiv.innerHTML = html
}