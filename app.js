(async function() {
    const fetched = await fetch("./data.json");
    const movies = await fetched.json();

    const selectedLang = document.getElementById("langDropBtn");
    const selectedRating = document.getElementById("ratingDropBtn");
    const selectedYear = document.getElementById("yearDropBtn");
    const searchButton = document.getElementById("searchBtn");
    const displayElem = document.getElementById("searchedMovies");
    


    function userSearch(){
        const langValue = selectedLang.options[selectedLang.selectedIndex].value;
        const ratingValue = selectedRating.options[selectedRating.selectedIndex].value;
        const yearValue = selectedYear.value;
        console.log(yearValue);
        const searchResults = movies.filter(function (filteredMovie) {
            return (filteredMovie.original_language.includes(langValue) && 
                    filteredMovie.vote_average > ratingValue &&
                    filteredMovie.release_date.substring(0,4).includes(yearValue));
        }
        )
        displaySearchResults(searchResults);

    };

    function displaySearchResults(searchResults){
        let i = 1;
        displayElem.innerHTML = "";

        searchResults.forEach(function(movie) {
            const ul = document.createElement("ul"); 
            ul.className = "movieItem";
            ul.innerHTML = `
            <li class="small">${i}</li>
            <li class="large"><h4 class="movieTitle">${movie.title}</h4><b class="rate">Ratings ${movie.vote_average}</b> | <i>${movie.original_language}</i></li>
            <li class="small"><i>${movie.release_date.substring(0,4)}</i></li>
           `
            i++;
            displayElem.appendChild(ul);
        }
        );



    }
        
        
    

    searchButton.addEventListener("click", userSearch);

})();