import axios from "axios";

const news = axios.create({baseURL: 'https://northcoders-news-iumv.onrender.com/api/'})


export const getArticles=(() =>{
    return news.get(`articles`).then((response) => {
        return response.data.allArticles
    })
})

export const getSingleArticle=((article_id) =>{
    return news.get(`articles/${article_id}`).then((response) => {
        return response.data.article
    })
})