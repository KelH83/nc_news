import { useState, useEffect } from "react"
import {getArticles} from '../api'
import ArticlesList from "./ArticlesList"


const Articles = () => {

    const [isLoading, setIsLoading] = useState(true)
    const[articles, setArticles] = useState('')


    useEffect(() => {
        console.log("get topics and articles useEffect");
        getArticles().then((data) => {
            setArticles(data)
            setIsLoading(false)
            
        })
       .catch((error) => {
        console.log("Error getting articles: ", error);
       })
    }, []);

    
    if(isLoading){
        return <p>Loading....</p>
    }
    

    return(
        <>
        <ArticlesList articles = {articles}/>
        </>
    )
}

export default Articles