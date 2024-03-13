import { postNewComment } from "../api"
import { useState } from "react"
import { useContext } from "react";
import { UserContext } from "./User";

const PostComment = ({article_id, commentData, setCommentData, setPostCommentIsVisible, setCommentPosted}) =>{
    const {loggedInUser} = useContext(UserContext)
    const[newComment, setNewComment] = useState('')
    const [disabledPostButton, setDisabledPostButton] = useState(false);

    function handleSubmit(event){
        setDisabledPostButton(true)
        event.preventDefault()
        const postBody={
            username:loggedInUser.username,
            body:newComment
        }
        postNewComment(article_id, postBody).then((data) =>{
            setNewComment('')
            setCommentData((currCommentData) =>{
                return [...currCommentData, data]
            })
            setPostCommentIsVisible(false)
            setCommentPosted(true)
        })
        .catch((error) =>{
            console.log("Error posting comment: ", error);
        })
    }


return(
    <form className='post-comment-form' onSubmit={handleSubmit}>
        <label htmlFor='newComment'>Add a comment</label>
        <br/>
        <textarea id='newComment'
        multiline='true'
        value={newComment}
        onChange={(event) => setNewComment(event.target.value)} required>
        </textarea>
        <br/>
        <button disabled={disabledPostButton} type='submit'>Post Comment</button>
    </form>
)
}

export default PostComment