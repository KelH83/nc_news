import { useState, useEffect } from "react"
import {getArticles, getTopics} from '../api'
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom"


const Articles = () => {

    const [isLoading, setIsLoading] = useState(true)
    const[articles, setArticles] = useState('')
    const[topics, setTopics] = useState('')
    const [searchTopic, setSearchTopic] = useState('')
    const [isTopicsLoading, setIsTopicsLoading] = useState(true)


    useEffect(() => {
        getArticles(searchTopic).then((data) => {
            setArticles(data)
            setIsLoading(false)
        })
       .catch((error) => {
        console.log("Error getting articles: ", error);
       })
    }, [searchTopic]);

    useEffect(() => {
        getTopics().then((data) => {
            setTopics(data)
            setIsTopicsLoading(false)  
        })
       .catch((error) => {
        console.log("Error getting topics: ", error);
       })
    }, []);

    
    if(isLoading){
        return <div className="loading">
        <Spinner animation="border" variant="dark" />
        <p>Loading...</p>
        </div>
    }

    if(isTopicsLoading){
        return <div className="loading">
        <Spinner animation="border" variant="dark" />
        <p>Loading...</p>
        </div>
    }
    

    return(
        <>
         <Container fluid>
            <Row>
            <p className='topics-instruction'>Please select a topic to see the related articles</p>
        {topics.map((topic) => {
            return (
                <Col className='topics-list' key={topic.slug}>
                <Link to={`/articles?topic=${topic.slug}`}><button onClick={() => setSearchTopic(topic.slug)}><h2>{topic.slug}</h2>
                </button></Link>
                </Col>
            )
            })}
            </Row>
        </Container>
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