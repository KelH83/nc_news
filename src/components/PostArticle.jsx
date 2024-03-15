import { postNewArticle } from "../api"
import { useState } from "react"
import { useContext } from "react";
import { UserContext } from "./User";
import { Link } from "react-router-dom"

const PostArticle = () => {
    const {loggedInUser} = useContext(UserContext)
    const [disabledPostButton, setDisabledPostButton] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null)
    const [articlePosted, setArticlePosted] = useState(false)
    const [articleTitle, setArticleTitle] = useState('')
    const [articleTopic, setArticleTopic] = useState('')
    const [articleBody, setArticleBody] = useState('')
    const [articleURL, setArticleURL] = useState('')
    const [returnedArticle, setReturnedArticle] = useState('')

    function handleSubmit(event){
        setDisabledPostButton(true)
        event.preventDefault()
        const postBody={
            title: articleTitle,
            topic: articleTopic,
            author:loggedInUser.username,
            body:articleBody,
            article_img_url: articleURL
        }

        postNewArticle(postBody).then((data) =>{
            if(data.response !=201){
                setErrorMsg(data.message)
            }
            console.log(data);
            setReturnedArticle(data)
            setArticleTitle('')
            setArticleTopic('')
            setArticleBody('')
            setArticleURL('')
            setArticlePosted(true)
        })
        .catch((error) =>{
            setDisabledPostButton(false)
            console.log("Error posting article: ", error)
            alert('Something went wrong please refresh and try again')
        })
    }

    if(errorMsg){
        return <p>{errorMsg}</p>
    }

    return(
        <>
        {articlePosted ? <h2 className='article-posted'>Article successfully posted!</h2> : null} 
        {returnedArticle ? <Link to='/articles'><h3 className='return-to-articles'>Return to Articles</h3></Link> : null}
        <h1 className='post-article-h1'>Submit an article:</h1>
        <form className='post-article-form' onSubmit={handleSubmit}>
            <label htmlFor='article-title'>Title:
            <br />
            <input type='text'value={articleTitle}
            onChange={(event) => setArticleTitle(event.target.value)} required>
            </input>
            </label>
            <br />
            <label htmlFor="article-topic">Topic:
            <br />
            <select name="article-topic" id="article-topic" onChange={(event) => setArticleTopic(event.target.value)} required>
            <option></option> 
            <option value="coding">Coding</option>
            <option value="football">Football</option>
            <option value="cooking">Cooking</option>
            </select>
            </label>
            <br />
            <label htmlFor='article-img'>Image URL:
            <br />
            <input type='url' id='article-img' value={articleURL}
            onChange={(event) => setArticleURL(event.target.value)} required>
            </input>
            </label>
            <br />
            <label htmlFor='article-body'>Content:
            <br />
            <textarea id='article-body'
            multiline='true'
            value={articleBody}
            onChange={(event) => setArticleBody(event.target.value)} required>
            </textarea>
            </label>
            <br />
            
            <button disabled={disabledPostButton} type='submit'>Submit Article</button>
        </form>
        </>
    )
}

export default PostArticle