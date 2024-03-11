import axios from "axios";

const news = axios.create({baseURL: 'https://northcoders-news-iumv.onrender.com/api'})


export const getArticles=(() =>{
    return news.get(`articles`).then((response) => {
        console.log(response.data.allArticles, " <<articles response");
        return response.data.allArticles
    })
})