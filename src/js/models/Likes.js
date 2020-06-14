export default class Likes {
    constructor() {
        this.likes = [];
    }
    addLike(id, title, author, img){
        const like = {id, title, author, id};
        this.likes.push(like);
        //Persist data in Localstorage
        this.persistData()
        return like;


    }
    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1)
           //Persist Data in local storage
        this.persistData()
    }

    //This method tests checks if we have a like stored in the likes array
    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumLikes(){
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));   //This will conver everything to the data tructure it was one before 

        //restoring from a localstorage
        if (storage) this.likes = storage;
    }
}