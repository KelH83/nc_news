import { useState, useEffect } from "react"
import {getArticles} from '../api'
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom"
import Topics from "./Topics";


const Articles = () => {

    const [isLoading, setIsLoading] = useState(true)
    const[articles, setArticles] = useState('')
    const [searchTopic, setSearchTopic] = useState('')
    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('DESC')
    const [errorMsg, setErrorMsg] = useState(null)


    useEffect(() => {
        getArticles(searchTopic,sortBy,order)
        .then((data) => {
            setArticles(data)
            setIsLoading(false)
        })
       .catch((error) => {
            setErrorMsg(error)
            console.log(errorMsg);
       })
    }, [searchTopic,sortBy,order]);

    
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
        < Topics setSearchTopic={setSearchTopic} setSortBy={setSortBy} setOrder={setOrder}/>
        <Container  className='articles-container' fluid>
        <Row>
        {articles.map((article) => {
        return (
            <Col key={article.article_id} className='article-cards'>
            <img src={article.article_img_url} />
            <h2>{article.title}</h2>
            <Link to={`/articles/${article.article_id}`}><button>See more</button></Link>
            </Col>
        )
        })}
        </Row>
    </Container>
    </>
    )
}

export default Articles