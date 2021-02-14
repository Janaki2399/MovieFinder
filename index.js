const API_KEY="a5eb0ae6f14600d9235e78acc25906a4" ; 

const x = {};
const pages={};
let current_page=1;

let searchInput=document.querySelector("#input");
let search_btn=document.querySelector("#btn-select");
let movie_div=document.querySelector("#result-container");
let sort_rating=document.querySelector("#sort-rating");
let sort_popularity=document.querySelector("#sort-popularity");
let sort_release=document.querySelector("#sort-release");
let category_heading=document.querySelector("#category-title");
let popular_category=document.querySelector("#popular");
let top_rated_category=document.querySelector("#top-rated");
let trending_category=document.querySelector("#trending");
let pagination=document.querySelector(".pagination");

search_btn.addEventListener("click",onSearch);
popular_category.addEventListener("click",getPopularMovies);
trending_category.addEventListener("click",getTrendingMovies);
top_rated_category.addEventListener("click",getTopRatedMovies);

sort_rating.addEventListener("click",function(){
    sort("vote_average");
});
sort_popularity.addEventListener("click",function(){
    sort("popularity");
});
sort_release.addEventListener("click",function(){
    sort("release_date");
});

//page redirection
document.getElementById("result-container").onclick=function(e){
    const target=e.target;
    if(target.classList=="movie-image"||target.classList=="movie-title"||target.classList=="year-rating-container"){
        let movieId=target.parentElement.id;
        sessionStorage.setItem("movieId", movieId);
        window.location="/details.html?movieId="+movieId;
    }    
}

function getTotalPages(url){
    fetch(url)
         .then(response=>response.json())
         .then(json=>{pages.totalPages=json.total_pages
            if(pages.totalPages==1|| pages.totalPages==0){
                let next=document.querySelector(".next_button");
                  next.disabled=true;
         }});
}

function createPaginationButton(url){
    let next_button=document.createElement("button");
    let prev_button=document.createElement("button");

    next_button.textContent="Next";
    prev_button.textContent="Prev";

    next_button.classList.add("next_button");
    prev_button.classList.add("prev_button");

    prev_button.disabled=true;
    getTotalPages(url);
    
    next_button.addEventListener("click",function(){

        let nextPage=current_page+1;
         fetchMovies(url+"&page="+nextPage);
        x.prop=nextPage;
    });

    prev_button.addEventListener("click",function(){
       
        if(current_page!=1)
        {
            let prevPage=current_page-1;
            fetchMovies(url+"&page="+prevPage);
            x.prop=prevPage;
        }
        });
        pagination.appendChild(prev_button);
        pagination.appendChild(next_button);    
    }

function setCurrentPage(newPage) {
    if(newPage==pages.totalPages){
        let next=document.querySelector(".next_button");
        next.disabled=true;
    }
    else if(newPage!=pages.totalPages){
        let next=document.querySelector(".next_button");
        next.disabled=false;
    }
    if(newPage==1){
        let prev=document.querySelector(".prev_button");
        prev.disabled=true;
    }
    else if(newPage!=1){
        let prev=document.querySelector(".prev_button");
        prev.disabled=false;
    }    
  } 

Object.defineProperty(x, "prop", {
    get() {
      return value
    },
    set(page) {
      setCurrentPage(page);
      current_page = page;
    }
});

function removeActiveColor(){
    let category_button=document.querySelector(".category-active");
    if(category_button!=null)
    {
        category_button.classList.remove("category-active");
    }
}

function onSearch(){
    let category_button=document.querySelector(".category-active");
    if(category_button!=null)
    {
    category_button.classList.remove("category-active");
    }
    let searchQuery=searchInput.value;
    let baseURL="https://api.themoviedb.org/3/search/movie?api_key="+API_KEY;
    let searchURL=baseURL+"&"+"query"+"="+searchQuery;
    category_heading.innerHTML="Search Result";
    fetchMovies(searchURL);
    pagination.innerHTML=""; 
    createPaginationButton(searchURL);
}

function getTrendingMovies(){
    removeActiveColor();
    trending_category.classList.add("category-active");
    let url= "https://api.themoviedb.org/3/trending/movie/day?api_key="+API_KEY;
    category_heading.innerHTML="Trending";
    fetchMovies(url);
    pagination.innerHTML="";
    searchInput.value="";
    createPaginationButton(url);
    
}

function getTopRatedMovies(){
    removeActiveColor();
    top_rated_category.classList.add("category-active");
    let url= "https://api.themoviedb.org/3/movie/top_rated?api_key="+API_KEY;
    category_heading.innerHTML="Top Rated";
    fetchMovies(url);
    pagination.innerHTML="";
    searchInput.value="";
    createPaginationButton(url);
}

function getPopularMovies(){
    removeActiveColor();
    popular_category.classList.add("category-active");
    let url= "https://api.themoviedb.org/3/movie/popular?api_key="+API_KEY;
    category_heading.innerHTML="Popular";
    fetchMovies(url);
    pagination.innerHTML="";
    searchInput.value="";
    createPaginationButton(url);
}

function sort(label){
    SortResultArray.sort(function(object1,object2){
        if(label==="release_date"){
            return object2[label].slice(0,4)-object1[label].slice(0,4);
        }
        else{
            return object2[label]-object1[label];
        }
    });
    renderView(SortResultArray);
}

getTrendingMovies();
