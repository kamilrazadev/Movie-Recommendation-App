(async function() {
    const fetched = await fetch("./data.json");
    const movies = await fetched.json();

    const selectedLang = document.getElementById("langDropBtn");
    const selectedRating = document.getElementById("ratingDropBtn");
    const selectedYear = document.getElementById("yearDropBtn");
    const searchButton = document.getElementById("searchBtn");
    const displayElem = document.getElementById("searchedMovies");
    
userSearch();

    function userSearch(){
        const langValue = selectedLang.options[selectedLang.selectedIndex].value;
        const ratingValue = selectedRating.options[selectedRating.selectedIndex].value;
        const yearValue = selectedYear.value;
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

        console.log(searchResults)

        if(searchResults.length !== 0){
            console.log("If Runing")
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
            )
        } else {
            console.log("Else Runing")
            const ul = document.createElement("ul");
            ul.className = "movieItem";
            ul.innerHTML = `
                <li class="center">No Movie Available</li>
            `
            displayElem.appendChild(ul);
        }
    }
        
        
    
    selectedLang.addEventListener("change", userSearch)
    selectedRating.addEventListener("change", userSearch)
    selectedYear.addEventListener("input", userSearch)
    // searchButton.addEventListener("click", userSearch);

})();