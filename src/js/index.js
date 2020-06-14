import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as SearchView from './views/SearchView';
import * as RecipeView from './views/RecipeView';
import * as ListView from './views/ListView';
import * as LikesView from './views/LikesView';
import {elements, renderLoader, clearLoader, elementStrings} from './views/base';

/**GLOBAL STATE OF THE APP. All this data will be stored in one central variable 
 * -Search Object: all the data about the search. Search query and search results
 * -Current Recipe object 
 * -Shopping List Object
 * -Liked Recipes
 */
const state = {}
window.state = state;

//SEARCH CONTROLLER//
const controlSearch = async () => {
    // 1) Get query from view
    const query = SearchView.getInput();

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        SearchView.clearInput();
        SearchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();
    
            // 5) Render results on UI
            clearLoader();
            SearchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/** 
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes
        // recipeView.clearRecipe();
        // renderLoader(elements.recipe);
        RecipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected Item 
        if (state.search) SearchView.highlightSelected(id);

        // Highlight selected search item
        // if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render recipe
            // clearLoader();
            // recipeView.renderRecipe(
            //     state.recipe,
            //     state.likes.isLiked(id)
            // );
            clearLoader();
            RecipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );

        } catch (err) {
            console.log(err);
            alert('Error processing recipe!');
        }
    }
};
 
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

//Refactored, we saved the strings for these two event types into an array and then looped over them while calling window.addEventlistener
//This is our load event
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

const controlList = () => {
    // Create a new list IF there in none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        ListView.renderItem(item);
    });
}

//Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //handle delete event
    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        //Delete from state
        state.list.deleteItem(id);
        //Delete from UI
        ListView.deleteItem(id);
        //Handle count update
    } else if (e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value)
        state.list.updateCount(id, val);
    }
})





//RECIPE CONTROLLER
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();

    //User has not liked currentstate recipe
    const currentID = state.recipe.id;
    if(!state.likes.isLiked(currentID)){
        //Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        //Toggle the button 
        LikesView.toggleLikeBtn(true);

        //Add like to the UI
        LikesView.renderLike(newLike);
        //User has liked it
    } else {
        //Remove like from the state
        state.likes.deleteLike(currentID);
        //Toggle the button 
        LikesView.toggleLikeBtn(false);
        //Remove like from the UI
        LikesView.deleteLike(currentID);
       
    }
    LikesView.toggleLikeMenu(state.likes.getNumLikes());
};

//REstore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes(); 
    //restore likes
    state.likes.readStorage();
    //Toggle like menu
    LikesView.toggleLikeMenu(state.likes.getNumLikes());

    //Render the existing likes 
    state,likes.likes.forEach(like => LikesView.renderLike(like));
});

//Handling Recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        //Decrease button is clicked 
    if (state.recipe.servings > 1){
        state.recipe.updateServings('dec');
        RecipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase * ')){
        //increase button is clicked
        state.recipe.updateServings('inc');
        RecipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')){
        //Like controller
        controlLike(); 
    }
    console.log(state.recipe);
})


//Remember, the text inside the parenthesis is the query
//Also, the query in constructor over in Searchjs is the query parameter we need to specify
//whenever we create a new object based on the search class 
//Then this.query will be attached to the object as being this.query equals the query we imputted 


//in our callback function we will add controlsearch function that will be called whenever the form
//is submitted. Instead of putting all that code in the callback function, we will add a seperate function. 

//So when we hit submit the e.preventDefault happens, then the controlSeatch function is called. 


//State.search will equal new Search(query). As a result of this, we are now storing it into our global state object const state = {}

//state.search.getResults()= so on state.search object, we can now perform the getResults method
//Remember, state.search is where the object now lives 
// new Search(query) this is a new instance based on the search class
//we have to get getResults methods available so that we can dislplay the results in the UI 


//we have to await the promoise await state.search.getResults(); because we want the rendering 
//of the results to happen after we actually recieve the results from the API 
//Then we make it an async function by adding async
//Remember every asyncronous function automatically returns a function **/
