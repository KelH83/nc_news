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
    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('DESC')
    const [formSortBy, setFormSortBy] = useState('')
    const [formOrder, setFormOrder] = useState('')


    useEffect(() => {
        getArticles(searchTopic,sortBy,order).then((data) => {
            setArticles(data)
            setIsLoading(false)
        })
       .catch((error) => {
        console.log("Error getting articles: ", error);
       })
    }, [searchTopic,sortBy,order]);

    useEffect(() => {
        getTopics().then((data) => {
            setTopics(data)
            setIsTopicsLoading(false)  
        })
       .catch((error) => {
        console.log("Error getting topics: ", error);
       })
    }, []);

    function handleSubmit(event){
        event.preventDefault()
        setSortBy(formSortBy)
        setOrder(formOrder)
    }

    
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
            <Col>
            <form className='sorting-form' onSubmit={handleSubmit}>
            <label htmlFor="sort_by">Sort By: </label>
            <select name="sort_by" id="sort_by" onChange={(event) => setFormSortBy(event.target.value)}>
            <option></option> 
            <option value="created_at">Date created</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
            </select>
            
            <label htmlFor="order_by">Order: </label>
            <select name="order_by" id="order_by" onChange={(event) => setFormOrder(event.target.value)}>
            <option></option> 
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
            </select>
            <button type='submit' className='interact-buttons'>Sort</button>
            </form>
            </Col>
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