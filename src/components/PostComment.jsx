import { postNewComment } from "../api"
import { useState } from "react"

const PostComment = ({article_id, commentData, setCommentData, setPostCommentIsVisible, setCommentPosted}) =>{

    const[newComment, setNewComment] = useState('')

    function handleSubmit(event){
        event.preventDefault()
        const postBody={
            username:'tickle122',
            body:newComment
        }
        postNewComment(article_id, postBody).then((data) =>{
            setNewComment('')
            setCommentData((currCommentData) =>{
                return [data, ...currCommentData]
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
        <button type='submit'>Post Comment</button>
    </form>
)
}

export default PostComment