import Search from './models/Search';
import * as SearchView from './views/SearchView';
import {elements, renderLoader, clearLoader} from './views/base';

/**GLOBAL STATE OF THE APP. All this data will be stored in one central variable 
 * -Search Object: all the data about the search. Search query and search results
 * -Current Recipe object 
 * -Shopping List Object
 * -Liked Recipes
 */
const state = {}

const controlSearch =  async () => {
    //1. We want to get the query from the view
    const query = SearchView.getInput();
    //If there is a query, we want to create a new search object 
    if (query){
        //2  New search object and add it to state 
        state.search = new Search(query);

        //3 Prepare UI for search results 
        SearchView.clearInput();
        SearchView.clearResults();
        renderLoader(elements.searchRes);

        //4 Search for recipes 
       await state.search.getResults();

        //5 render results on UI 
        clearLoader();
        SearchView.renderResults(state.search.result);
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
        SearchView.clearResults();
        SearchView.renderResults(state.search.result, goToPage);
    }
});


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
//Remember every asyncronous function automatically returns a function 
