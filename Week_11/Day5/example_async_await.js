Async/Await Example

const getPosts = (userId) => new Promise((resolve) => {
    setTimeout(() => {
        console.log("Post ","Done!");
        resolve([{ title: "Article on Javascript", idArticle : 1, idUser: userId}]);
    }, 1500);
});

const getComments = (postId) => new Promise((resolve) => {
    setTimeout(() => {
        console.log("Comments ","Done!");
        resolve([{title: "Great Article", author: "John"}, 
                {title: "Interesting Article", author: "Lea"}]);
    }, 1500);
});

const getLikes = (postId) => new Promise((resolve) => {
    setTimeout(() => {
        console.log("Likes ", "Done!");
        resolve(5);
    }, 1500);
});

console.log('Test1');

const getLatestPostActivity = async (userId) => {
    const posts = await getPosts(userId);
    const latestPost = posts[0];
    const comments = await getComments(latestPost.idArticle);
    const likes = await getLikes(latestPost.idArticle);

    return { comments: comments, likes: likes };
}

getLatestPostActivity(10)
.then(res => {
console.log('everything ', res);
})

console.log('Test2');


//We receive

//Test1
//Test2

//Post  Done!
//Comments  Done!
//Likes  Done!

//everything  
//{comments: Array(2), likes: 5}

//comments: 
//0: {title: 'Great Article', author: 'John'}
//1: {title: 'Interesting Article', author: 'Lea'}
//likes: 5
