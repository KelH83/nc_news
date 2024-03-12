import { useState, useEffect } from "react"
import {getArticles} from '../api'
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom"


const Articles = () => {

    const [isLoading, setIsLoading] = useState(true)
    const[articles, setArticles] = useState('')


    useEffect(() => {
        getArticles().then((data) => {
            setArticles(data)
            setIsLoading(false)
            
        })
       .catch((error) => {
        console.log("Error getting articles: ", error);
       })
    }, []);

    
    if(isLoading){
        return <div className="loading">
        <Spinner animation="border" variant="dark" />
        <p>Loading...</p>
        </div>
    }
    

    return(
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
    )
}

export default Articles