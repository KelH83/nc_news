import React, { useEffect, useState } from "react";
import {getComments, increaseCommentVotes, decreaseCommentVotes } from "../api";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

const Comments = ({article_id}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [commentData, setCommentData]=useState([])

    useEffect(() => {
        getComments(article_id).then((data) => {
            setCommentData(data)
            setIsLoading(false)
        });
    }, []);


    const upVote = (commentId) => {
        setCommentData((currCommentData) =>{
            const updatedComments = currCommentData.map((comment) => {
                if(comment.comment_id === commentId){
                    return {...comment, votes: comment.votes +1}
                }
                return comment
            })
            return updatedComments
                })
        increaseCommentVotes(commentId)
    }

    const downVote = (commentId) => {
        setCommentData((currCommentData) =>{
            const updatedComments = currCommentData.map((comment) => {
                if(comment.comment_id === commentId){
                    return {...comment, votes: comment.votes -1}
                }
                return comment
            })
            return updatedComments
                })
        decreaseCommentVotes(commentId)
    }

    if(isLoading){
        return <div className="loading">
        <Spinner animation="border" variant="dark" />
        <p>Loading...</p>
        </div>
    }

    return (
        <>
            
            {commentData.map((comment) => {
            return (
                <Row className='comments' key={comment.comment_id}>
                <p>{comment.body}</p>
                <h3>{comment.author}</h3>
                <section className='comments-button-row'>  
                    <button aria-label="Up Vote" onClick={() => upVote(comment.comment_id)}>👍</button>
                    <p>{comment.votes}</p>
                    <button aria-label="Down Vote" onClick={() => downVote(comment.comment_id)}>👎</button>
                </section>
                </Row>
            )
            })}
        </>
        
    )




}


export default Comments