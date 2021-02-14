const API_KEY="a5eb0ae6f14600d9235e78acc25906a4" ; 
const BACKDROP_IMAGE_PATH="https://image.tmdb.org/t/p/w1280/";
const POSTER_IMAGE300_PATH="https://image.tmdb.org/t/p/w300/";

let movie_div=document.querySelector("#result-container");
let movie_container=document.querySelector(".movie");
let movie_details=document.querySelector(".movie-details");

let movie_id= sessionStorage.getItem("movieId");

function getGenres(genres){
const name=genres.map((genre)=>{
    return`<div class="genre-name">${genre.name}</div>`
}).join(" ");
return name;
}
function errorHandler(error){
    alert("Error"+error.message)
}
function fetchShowDetail(url){
    fetch(url)
    .then(response=>response.json())
    .then(json=>{
        const movie_backdrop=`<div class="img-div"><img class="movie-backdrop" src=${json.backdrop_path?BACKDROP_IMAGE_PATH+json.backdrop_path:"images/black-image.jpg"}></div>`;
        movie_container.insertAdjacentHTML("afterbegin",movie_backdrop);
        const details=`
            <div class="movie-flex">
                <div class="flex-img-div">
                    <img class="flex-img"src=${json.poster_path?POSTER_IMAGE300_PATH+json.poster_path:"images/Noimage.jpg"}>
                </div>
                <div class="flex-overview-div">
                    <h1 class="movie-main-title">${json.title}(${json.release_date?json.release_date.slice(0,4):"-"})</h1>
                    <div>
                    <span style="font-size:1.3rem">Rating</span> <span class="flex-movie-rating"> ${json.vote_average}</span>
                    <span style="font-size:1.3rem">Duration</span> : ${parseInt(json.runtime/60)}hr ${parseInt(json.runtime%60)} min
                    </div>  
                    <p class="tagline">${json.tagline}</p>    
                    <p class="movie-overview">${json.overview}</p>
                    <div class="genre">${getGenres(json.genres)}</div>
                 </div>
            </div>    
        `
        movie_details.insertAdjacentHTML("afterbegin",details);
    })
    .catch(errorHandler);
}
document.getElementById("result-container").onclick=function(e){
    const target=e.target;
    if(target.classList=="movie-image"||target.classList=="movie-title"||target.classList=="year-rating-container"){
        let movieId=target.parentElement.id;
        sessionStorage.setItem("movieId", movieId);
        window.location.replace("/details.html");
    }    
}

function moviesDetails(){
    let url="https://api.themoviedb.org/3/movie/"+movie_id+"?api_key="+API_KEY+"&language=en-US"
    fetchShowDetail(url);
}

function similarMovies(){
    let url="https://api.themoviedb.org/3/movie/"+movie_id+"/similar?api_key="+API_KEY+"&language=en-US&page=1"
    fetchMovies(url);
}
moviesDetails();
similarMovies();