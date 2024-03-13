import React, { useEffect, useState } from "react";
import {getSingleArticle, increaseArticleVotes,decreaseArticleVotes } from "../api";
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Comments from "./Comments";
import PostComment from "./PostComment";

const SingleArticle = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [article, setArticle] = useState({})
    const {article_id} = useParams()
    const [isVisible, setIsVisible] = useState(false);
    const [commentData, setCommentData]=useState([])
    const [postCommentIsVisible, setPostCommentIsVisible] = useState(false);
    const [commentPosted, setCommentPosted] = useState(false);
    const [error, setError] = useState(null);
    const [disabledThumb, setDisabledThumb] = useState(false);
    const [disabledThumbDown, setDisabledThumbDown] = useState(false);

    useEffect(() => {
        getSingleArticle(article_id).then((data) => {
            setArticle(data)
            setIsLoading(false)
        });
    }, []);
    
    function showComments(){
        setIsVisible(!isVisible)
    }

    function postComment(){
        setPostCommentIsVisible(true)
    }

    const upVote = (articleId) => {
        setDisabledThumb(!disabledThumb)
        if(disabledThumbDown){
            setDisabledThumbDown(false)
        }
        setArticle((currArticle) =>{
                    return {...currArticle, votes: currArticle.votes +1}
                })
            increaseArticleVotes(articleId).catch((error) =>{
                setArticle((currArticle) =>{
                    return {...currArticle, votes: currArticle.votes -1}
                })
                setError('Something went wrong with voting, please try again.');
            })
        
    }

    const downVote = (articleId) => {
        setDisabledThumbDown(!disabledThumbDown)
        if(disabledThumb){
            setDisabledThumb(false)
        }
        setArticle((currArticle) =>{
                    return {...currArticle, votes: currArticle.votes -1}
                })
        decreaseArticleVotes(articleId).catch((error) =>{
            setArticle((currArticle) =>{
                return {...currArticle, votes: currArticle.votes +1}
            })
            setError('Something went wrong with voting, please try again.');
        })
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
         <section>
            <h2>{article.title}</h2>
            <p><strong>Author:</strong> {article.author} 
            <br />
            <strong>Topic:</strong> {article.topic}</p>
        </section>
        <Row>
            <img src={article.article_img_url}/>
        </Row>
        <section>
            <p>{article.body}</p>
        </section>
        <section className='button-rows'>
            <Col>
                {error ? <p className='vote-error'>{error}</p> : null}
                <button disabled={disabledThumb} aria-label="Up Vote" className='interact-buttons' onClick={() => upVote(article.article_id)}>👍</button>
                <p>{article.votes}</p>
                <button disabled={disabledThumbDown}aria-label="Down Vote" className='interact-buttons' onClick={() => downVote(article.article_id)}>👎</button>   
            
            <button className='interact-buttons' onClick={showComments}>{isVisible ? 'Hide Comments' : 'Show Comments: '} {isVisible ? ' ' :`${article.comment_count}`}</button>
            <button className='interact-buttons' onClick={postComment}>Post comment</button>
           </Col>
            
        </section>
        </Container>
        {postCommentIsVisible && <PostComment article_id={article_id} commentData={commentData} setCommentData={setCommentData} setPostCommentIsVisible={setPostCommentIsVisible} setCommentPosted={setCommentPosted}/>}
        {isVisible && <Comments article_id={article_id} commentData={commentData} setCommentData={setCommentData}/>}
        {commentPosted && <p className='comment-posted'>Success! Your comment has been posted!</p>}
        </>
     )

}

export default SingleArticle