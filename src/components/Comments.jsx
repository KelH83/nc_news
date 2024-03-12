import React, { useEffect, useState } from "react";
import {getComments } from "../api";
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const Comments = ({article_id}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [commentData, setCommentData]=useState([])

    useEffect(() => {
        console.log("useeffect in comments");
        getComments(article_id).then((data) => {
            setCommentData(data)
            setIsLoading(false)
        });
    }, []);

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
                <button>👍 {comment.votes}</button>              
                </Row>
            )
            })}
        </>
        
    )




}


export default Comments