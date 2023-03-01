import {moviesLocalStorage, getHtml, setLocalStorageArray } from "./utils.js";
const reponseWdiv = document.getElementById('reponseW')
const mainVideDiv = document.getElementById('main-vide')

render()


function render(){
    setLocalStorageArray() 
    const html = getHtml(moviesLocalStorage)
    if(moviesLocalStorage.length > 0) {
        reponseWdiv.innerHTML = html
        mainVideDiv.textContent = ''
    }
    else {
        reponseWdiv.textContent = ''
        mainVideDiv.innerHTML = `
        <h3 class="text-vide">Your watchlist is looking a little empty...</h3>
                <div class="add-watchlist">
                    <a href="index.html"><img src="/images/iconPlus.png" class="img-plus"></a>
                    <p class="p">Let's add some movies!</p>
                </div>`
    }
}

document.addEventListener("click", e => {
    if(e.target.className === 'btn-moins'){
        const movie = moviesLocalStorage[e.target.dataset.movie]
        localStorage.removeItem(movie.imdbId)
        render()
    }
})