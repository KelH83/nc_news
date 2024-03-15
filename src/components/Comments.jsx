import React, { useEffect, useState } from "react";
import {getComments, increaseCommentVotes, decreaseCommentVotes, deleteComment } from "../api";
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { useContext } from "react";
import { UserContext } from "./User";
import { Link } from "react-router-dom"

const Comments = ({article_id, commentData, setCommentData}) => {
    const {loggedInUser} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [disabledThumb, setDisabledThumb] = useState(false);
    const [disabledThumbDown, setDisabledThumbDown] = useState(false);
    const [deleteDisabled, setDeleteDisabled] =useState(false)
    

    useEffect(() => {
        getComments(article_id).then((data) => {
            setCommentData(data)
            setIsLoading(false)
        });
    }, []);


    const upVote = (commentId) => {
        if(loggedInUser){
        setDisabledThumb(!disabledThumb)
        if(disabledThumbDown){
            setDisabledThumbDown(false)
        }
        setCommentData((currCommentData) =>{
            const updatedComments = currCommentData.map((comment) => {
                if(comment.comment_id === commentId){
                    return {...comment, votes: comment.votes +1}
                }
                return comment
            })
            return updatedComments
                })
        increaseCommentVotes(commentId).catch((error) =>{
            setCommentData((currCommentData) =>{
                const updatedComments = currCommentData.map((comment) => {
                    if(comment.comment_id === commentId){
                        return {...comment, votes: comment.votes -1}
                    }
                    return comment
                })
                return updatedComments
                    })

            alert('Something went wrong when voting, please refresh and try again.');
        })
    }
    else{
        alert('You must be logged in to vote')
    }
    }

    const downVote = (commentId) => {
        if(loggedInUser){
        setDisabledThumbDown(!disabledThumbDown)
        if(disabledThumb){
            setDisabledThumb(false)
        }
        setCommentData((currCommentData) =>{
            const updatedComments = currCommentData.map((comment) => {
                if(comment.comment_id === commentId){
                    return {...comment, votes: comment.votes -1}
                }
                return comment
            })
            return updatedComments
                })
        decreaseCommentVotes(commentId).catch((error) =>{
            setCommentData((currCommentData) =>{
                const updatedComments = currCommentData.map((comment) => {
                    if(comment.comment_id === commentId){
                        return {...comment, votes: comment.votes +1}
                    }
                    return comment
                })
                return updatedComments
                    })

            alert('Something went wrong when voting, please refresh and try again.');
        })
    }
    else{
        alert('You must be logged in to vote')
    }
    }

    const deleteAComment = (commentId) => {
        setDeleteDisabled(true)
        setCommentData((currComments) => {
            return currComments.filter(comment => comment.comment_id !== commentId);
        });
        deleteComment(commentId).then(() =>{
            setDeleteDisabled(false)
        })
        .catch((error) =>{
            alert('Error deleting comment, please refresh and try again')
            
        })
    }


    if(isLoading){
        return <div className="loading">
        <Spinner animation="border" variant="dark" />
        <p>Loading...</p>
        </div>
    }

    if(commentData.length === 0){
        return <p className='no-comment'>😔 No comments have been made yet!</p>
    }

    return (
        <>
            {commentData.map((comment) => {
            return (
                <Col className='comments' key={comment.comment_id}>
                <p>{comment.body}</p>
                <hr />
                <section className='comments-button-row'> 
                <h3>Posted by: <Link to={`/users/${comment.author}`}><strong>{comment.author}</strong></Link></h3>
                    {loggedInUser &&
                        comment.author === loggedInUser.username && (
                            <button id='delete-button' disabled={deleteDisabled} onClick={() => deleteAComment(comment.comment_id)}>Delete</button>
                            )}

                    
                    <button disabled={disabledThumb} aria-label="Up Vote" onClick={() => upVote(comment.comment_id)}>👍</button>
                    <p>Votes: <strong>{comment.votes}</strong></p>
                    <button disabled={disabledThumbDown} aria-label="Down Vote" onClick={() => downVote(comment.comment_id)}>👎</button>
                </section>
                </Col>
            )
            })}
        </>
        
    )
   



}


export default Comments