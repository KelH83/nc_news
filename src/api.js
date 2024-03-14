import axios from "axios";

const news = axios.create({baseURL: 'https://northcoders-news-iumv.onrender.com/api/'})


export const getArticles=((searchTerm) =>{
    return news.get(`articles`, { params: { topic: searchTerm } })
    .then((response) => {
        return response.data.allArticles
    })
})

export const getSingleArticle=((article_id) =>{
    return news.get(`articles/${article_id}`).then((response) => {
        return response.data.article
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