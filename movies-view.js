const POSTER_IMAGE_PATH="https://image.tmdb.org/t/p/w185/";
let resultArray=[];
let sortResultArray=[];

function createGrid(result){
    return result.map((movie)=>{
            return `<div class="card" id=${movie.id}> 
            <img class="movie-image"  src=${movie.poster_path?POSTER_IMAGE_PATH+movie.poster_path:"images/Noimage.jpg"}>
            <h4 class="movie-title">${movie.title}</h1>
            <div class="year-rating-container">
                <h4 class="date">${movie.release_date?movie.release_date.slice(0,4):'-'}</h1>
                <div class="rating-div">
                   <h4 class="movie-rating">${movie.vote_average}</h4>
                 </div>
            </div>    
            </div>`
    }).join(" ");
}

function createView(result){
    const movieItem=`
    <div id="movie-section">
    ${createGrid(result)}  
    </div>          
   `;
  return movieItem;
}
function renderView(result){
    SortResultArray=result;
    resultArray=result; 
    movie_div.innerHTML="";
    let newView=createView(result);
    movie_div.innerHTML=newView;
}
function errorHandler(error){
    alert(error.message);
}
function fetchMovies(url){
    fetch(url)
    .then(response=>response.json())
    .then(json=>{
        if(json.results!=0)
        {
        renderView(json.results)
        }
        else{
        const exceptionView=`<img class="no-shows" src="images/exception-image.png">`;
        movie_div.innerHTML=exceptionView;
        }
    })
    .catch(errorHandler);
}
