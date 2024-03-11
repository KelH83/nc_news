import React, { useEffect, useState } from "react";
import {getSingleArticle } from "../api";
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

const SingleArticle = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [displayArticle, setDisplayArticle] = useState([])
    const {article_id} = useParams()

    useEffect(() => {
        getSingleArticle(article_id).then((data) => {
            setDisplayArticle(data)
            setIsLoading(false)
        });
    }, []);
    
    
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
            <p>Author: {displayArticle.author} 
            <br />Topic: {displayArticle.topic}</p>
        </Row>
        <Row>
            <img className='article-img' src={displayArticle.article_img_url}/>
        </Row>
        <Row>
            <p>{displayArticle.body}</p>
        </Row>
        <Row>
            <Col><Button>👍{displayArticle.votes}</Button></Col>
            <Col><Button>Show comments: {displayArticle.comment_count}</Button></Col>
        </Row>
        </Container>
        </>
     )

}

export default SingleArticle