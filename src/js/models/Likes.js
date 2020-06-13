export default class Likes {
    constructor() {
        this.likes = [];
    }
    addLike(id, title, author, img){
        const like = {id, title, author, id};
        this.likes.push(like);
        return like;
    }
    deleteLike(id){
        const index = this.items.findIndex(el => el.id === id);

        this.likes.splice(index, 1)
    }
    //This method tests checks if we have a like stored in the likes array
    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumLikes(){
        return this.likes.length;
    }
}