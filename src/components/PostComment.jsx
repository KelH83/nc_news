import { postNewComment } from "../api"
import { useState } from "react"
import { useContext } from "react";
import { UserContext } from "./User";

const PostComment = ({article_id, commentData, setCommentData, setPostCommentIsVisible, setCommentPosted}) =>{
    const {loggedInUser} = useContext(UserContext)
    const[newComment, setNewComment] = useState('')
    const [disabledPostButton, setDisabledPostButton] = useState(false);
    const [postingError, setPostingError] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    function handleSubmit(event){
        setDisabledPostButton(true)
        event.preventDefault()
        const postBody={
            username:loggedInUser.username,
            body:newComment
        }
        postNewComment(article_id, postBody).then((data) =>{
            if(data.response !=201){
                setErrorMsg(data.message)
            }
            setNewComment('')
            setCommentData((currCommentData) =>{
                return [...currCommentData, data]
            })
            setPostCommentIsVisible(false)
            setCommentPosted(true)
        })
        .catch((error) =>{
            setDisabledPostButton(false)
            console.log("Error posting comment: ", error)
            alert('Something went wrong please try again')
        })
    }

    if(errorMsg){
        return <p>{errorMsg}</p>
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
        {postingError ? <p className='posting-error'>{postingError}</p> : null} 
        <button disabled={disabledPostButton} type='submit'>Post Comment</button>
    </form>
)
}

export default PostComment