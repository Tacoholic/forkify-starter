import Search from './models/Search';
/**GLOBAL STATE OF THE APP. All this data will be stored in one central variable 
 * -Search Object: all the data about the search. Search query and search results
 * -Current Recipe object 
 * -Shopping List Object
 * -Liked Recipes
 */
const state = {}

const controlSearch =  async () => {
    //1. We want to get the query from the view
    const query = 'pizza';

    //If there is a query, we want to create a new search object 
    if (query){
        //2  New search object and add it to state 
        state.search = new Search(query);

        //3 Prepare UI for search results 

        //4 Search for recipes 
       await state.search.getResults();

        //5 render results on UI 
        console.log(state.search.result)
    }

}
document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
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
