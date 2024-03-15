import React, { useEffect, useState } from "react";
import {getSingleArticle, increaseArticleVotes,decreaseArticleVotes } from "../api";
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Comments from "./Comments";
import PostComment from "./PostComment";
import { useContext } from "react";
import { UserContext } from "./User";
import { Link } from "react-router-dom"

const SingleArticle = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [article, setArticle] = useState({})
    const {article_id} = useParams()
    const [isVisible, setIsVisible] = useState(false);
    const [commentData, setCommentData]=useState([])
    const [postCommentIsVisible, setPostCommentIsVisible] = useState(false);
    const [commentPosted, setCommentPosted] = useState(false);
    const [disabledThumb, setDisabledThumb] = useState(false);
    const [disabledThumbDown, setDisabledThumbDown] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null)
    const {loggedInUser} = useContext(UserContext)

    useEffect(() => {
        getSingleArticle(article_id).then((data) => {
            if(data.response != 200){
                setErrorMsg(data.message)
            }
            setArticle(data)
            setIsLoading(false)
        })
        .catch((error) =>{
            console.log("Error fetching single article: ", error);
        })
    }, []);
    
    function showComments(){
        setIsVisible(!isVisible)
    }

    function postComment(){
        if(loggedInUser){
            setPostCommentIsVisible(true)
        }
        else{
            alert('You must be logged in to post')
        }
    }

    const upVote = (articleId) => {
        if(loggedInUser){
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
                    alert('Something went wrong with voting, please refresh and try again.');
                })
        }
        else{
            alert('You must be logged in to vote')
        }
        
    }

    const downVote = (articleId) => {
        if(loggedInUser){
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
            alert('Something went wrong with voting, please refresh and try again.');
        })
    }
    else{
        alert('You must be logged in to vote')
    }
    }
    
    if(isLoading){
        return <div className="loading">
        <Spinner animation="border" variant="dark" />
        <p>Loading...</p>
        </div>
    }

    if(errorMsg){
        return <p>{errorMsg}</p>
    }

    return(
        <>
        <Container fluid className="single-article">
         <section>
            <h2>{article.title}</h2>
            <p className='article-author'><strong>Author: <Link to={`/users/${article.author}`}>{article.author}</Link></strong> 
            <br />
            <strong>Topic:</strong> {article.topic}</p>
        </section>
        <Row>
            <img src={article.article_img_url} alt={article.title}/>
        </Row>
        <section>
            <p>{article.body}</p>
        </section>
        <section className='button-rows'>
            <Col>
                <button disabled={disabledThumb} aria-label="Up Vote" className='interact-buttons' onClick={() => upVote(article.article_id)}>👍</button>
                <p>{article.votes}</p>
                <button disabled={disabledThumbDown}aria-label="Down Vote" className='interact-buttons' onClick={() => downVote(article.article_id)}>👎</button>   
            
            <button className='interact-buttons' onClick={showComments}>{isVisible ? 'Hide Comments' : 'Show Comments: '} {isVisible ? ' ' :`${article.comment_count}`}</button>
            <a href='#posting'>
            <button className='interact-buttons' onClick={postComment}>Post comment</button>
            </a>
           </Col>
            
        </section>
        </Container>
        {isVisible && <Comments article_id={article_id} commentData={commentData} setCommentData={setCommentData}/>}
        {postCommentIsVisible && <span id='posting'>
            <PostComment article_id={article_id} commentData={commentData} setCommentData={setCommentData} setPostCommentIsVisible={setPostCommentIsVisible} setCommentPosted={setCommentPosted}/>
            </span>}
        {commentPosted && <p className='comment-posted'>Success! Your comment has been posted!</p>}
        </>
     )

}

export default SingleArticle