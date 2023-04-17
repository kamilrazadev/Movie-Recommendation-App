// Use Of includes Function
// const  info = "My Name is Kamil";
// let result = info.toLowerCase().includes("kamil");
// console.log(result);
// ----------------------------END

//IIFE imidiately invoked function expression 
//run imidiately when complete
//use to fetch .json file and all code of js do here

(async function () {
    const fetched = await fetch("./recipes.json");
    const recipes = await fetched.json();

    const userInput = document.getElementById("search-input");
    const btnElem = document.getElementById("Search-Btn");
    const searchList = document.getElementById("Recipe-list");
    const recipeDetailsContainer = document.getElementById("Recipe-Details-Container");

    function recipeDetails(result){
        recipeDetailsContainer.innerHTML = `
            <h3 class="margin">${result.title}</h3>
            <ul class="margin">
            ${result.ingredients.map(function(ingredients){
                return "<li>" + ingredients + "</li>"
            }).join("")}
            <ul>
            <h3 class="margin">Description</h3>
            <p class="margin">
            ${result.description}
            </p>   
            <h3 class="margin">Instructions</h3>
            <p class="margin">
            ${result.instructions}
            </p>
            <h3 class="margin">Author</h3>
            <p class="margin">
            ${result.author}
            </p>
            <h3 class="margin">See More Details</h3>
            <p class="margin">
            <a href="${result.url}">${result.url}</a>
            </p>         
        `;
        console.log(result);
    }

    function displaySearchResults(searchResults){
        searchList.innerHTML = "";
        searchResults.forEach(
            function(result){
                const li = document.createElement("li");
                li.innerHTML = `<h4>${result.title}<h4>`;
                
                searchList.appendChild(li);
            }
        );
        
    }

    function searchFunc() {
        const searchValue =  userInput.value;
        const searchResults = recipes.filter(function (recipe) {
            return (recipe.title.toLowerCase().includes(searchValue) || 
                        recipe.ingredients.join(" ").toLowerCase().includes(searchValue)); // here join() used to make array a string with " " a space btw each element
        });

        // console.log(searchResults.title);
        displaySearchResults(searchResults);
    }

    btnElem.addEventListener("click", searchFunc);

})();



