import axios from "axios";


const news = axios.create({baseURL: 'https://northcoders-news-iumv.onrender.com/api/'})


export const getArticles=((searchTerm,sort,order) =>{
    return news.get(`articles`, { params: 
        { topic: searchTerm,
            sort_by: sort,
            order: order} 
        })
    .then((response) => {
        return response.data.allArticles
    })
    .catch((error) =>{
        if(error.response){
            console.log("Error fetching single article in API: ", error);
            return error
        }
    })
})

export const getSingleArticle=((article_id) =>{
    return news.get(`articles/${article_id}`).then((response) => {
        return response.data.article
    })
    .catch((error) =>{
        if(error.response){
            console.log("Error fetching single article in API: ", error);
            return error
        }
    })
    
})

export const getComments=((article_id) =>{
    return news.get(`articles/${article_id}/comments`).then((response) => {
        return response.data.comments
    })
})

export const increaseArticleVotes =((article_id) =>{
    const addVotes ={
        inc_votes: 1,
    }
    return news.patch(`articles/${article_id}`, addVotes).then((response) => {
        return response.data.updatedArticle[0]
    })
})

export const decreaseArticleVotes =((article_id) =>{
    const addVotes ={
        inc_votes: -1,
    }
    return news.patch(`articles/${article_id}`, addVotes).then((response) => {
        return response.data.updatedArticle[0]
    })
})

export const increaseCommentVotes =((comment_id) =>{
    const addVotes ={
        inc_votes: 1,
    }
    return news.patch(`comments/${comment_id}`, addVotes).then((response) => {
        return response.data.updatedComment
    })
})

export const decreaseCommentVotes =((comment_id) =>{
    const removeVotes ={
        inc_votes: -1,
    }
    return news.patch(`comments/${comment_id}`, removeVotes).then((response) => {
        return response.data.updatedComment
    })
})

export const postNewComment =((article_id,postBody) =>{
    return news.post(`articles/${article_id}/comments`, postBody).then((response) => {
        return response.data.returnedComment[0]
    })
    .catch((error) =>{
        if(error.response){
            console.log("Error posting comment in API: ", error);
            return error
        }
    })
})

export const deleteComment =((comment_id) =>{
    return news.delete(`comments/${comment_id}`).then(() => {
    })
})

export const getTopics =(() =>{
    return news.get(`topics`).then((response) => {
        return response.data
    })
})

export const getUsers =((username) =>{
    return news.get(`users/${username}`).then((response) => {
        return response.data.userData
    })
})

export const postNewArticle =((postBody) =>{
    return news.post(`articles`, postBody).then((response) => {
        console.log(response.data.returnedArticle);
        console.log(response.status)
        return response.data.returnedArticle
    })
    .catch((error) =>{
        if(error.response){
            console.log("Error posting article in API: ", error);
            return error
        }
    })
})
