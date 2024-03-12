import React, { useEffect, useState } from "react";
import {getSingleArticle, increaseArticleVotes,decreaseArticleVotes } from "../api";
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Comments from "./Comments";

const SingleArticle = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [article, setArticle] = useState({})
    const {article_id} = useParams()
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        getSingleArticle(article_id).then((data) => {
            setArticle(data)
            setIsLoading(false)
        });
    }, []);
    
    function showComments(){
        setIsVisible(!isVisible)
    }

    const upVote = (articleId) => {
        setArticle((currArticle) =>{
                    return {...currArticle, votes: currArticle.votes +1}
                })
        increaseArticleVotes(articleId)
    }

    const downVote = (articleId) => {
        setArticle((currArticle) =>{
                    return {...currArticle, votes: currArticle.votes -1}
                })
        decreaseArticleVotes(articleId)
    }
    
    if(isLoading){
        return <div className="loading">
        <Spinner animation="border" variant="dark" />
        <p>Loading...</p>
        </div>
    }

    return(
        <>
        <Container fluid className="single-article">
         <Row>
            <h2>{article.title}</h2>
            <p><strong>Author:</strong> {article.author} 
            <br />
            <strong>Topic:</strong> {article.topic}</p>
        </Row>
        <Row>
            <img src={article.article_img_url}/>
        </Row>
        <Row>
            <p>{article.body}</p>
        </Row>
        <Row className='article-button-row'>
            <Col>
                <button aria-label="Up Vote" className='interact-buttons' onClick={() => upVote(article.article_id)}>👍</button>
                <p>{article.votes}</p>
                <button aria-label="Down Vote" className='interact-buttons' onClick={() => downVote(article.article_id)}>👎</button>   
            
            <button className='interact-buttons' onClick={showComments}>{isVisible ? 'Hide Comments' : 'Show Comments: '} {isVisible ? ' ' :`${article.comment_count}`}</button>
           </Col>
            
        </Row>
        </Container>
        {isVisible && <Comments article_id={article_id}/>}
        
        </>
     )

}

export default SingleArticle