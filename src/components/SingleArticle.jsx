import React, { useEffect, useState } from "react";
import {getSingleArticle } from "../api";
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Comments from "./Comments";

const SingleArticle = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [displayArticle, setDisplayArticle] = useState([])
    const {article_id} = useParams()
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        getSingleArticle(article_id).then((data) => {
            setDisplayArticle(data)
            setIsLoading(false)
        });
    }, []);
    
    function showComments(){
        setIsVisible(!isVisible)
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
            <h2>{displayArticle.title}</h2>
            <p><strong>Author:</strong> {displayArticle.author} 
            <br />
            <strong>Topic:</strong> {displayArticle.topic}</p>
        </Row>
        <Row>
            <img src={displayArticle.article_img_url}/>
        </Row>
        <Row>
            <p>{displayArticle.body}</p>
        </Row>
        <Row>
            <Col><button className='interact-buttons'>👍{displayArticle.votes}</button></Col>
            <Col><button className='interact-buttons' onClick={showComments}>{isVisible ? 'Hide Comments' : 'Show Comments: '} {isVisible ? ' ' :`${displayArticle.comment_count}`}</button></Col>
        </Row>
        </Container>
        {isVisible && <Comments article_id={article_id}/>}
        
        </>
     )

}

export default SingleArticle