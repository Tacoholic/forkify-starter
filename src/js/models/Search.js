import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }
        async getResults(){
        try {
         const res =  await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
         this.result = res.data.recipes;
         //console.log(this.result)
        } catch(error) {
            alert(error);
        }
     }
}

 


//we remove the query as a parameter because we will be reading the query from the object itself, which is the constructor 
//we will add this. to query because the query will already be in the object itself once we call the get get results method 
//We also change it to this.result because we want the results to be changed in the object itself.

//DATA
//Instead of returning the result right away, it simply stores it here in this.result so that all the data
//about the search are encapsulated inside of the object. In the end, we have both search and the result
//both stored inside of the object. 