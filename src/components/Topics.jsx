import { useState, useEffect } from "react"
import {getTopics} from '../api'
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom"

const Topics = ({setSearchTopic,setSortBy,setOrder}) =>{

    const [isLoading, setIsLoading] = useState(true)
    const[topics, setTopics] = useState('')
    const [formSortBy, setFormSortBy] = useState('')
    const [formOrder, setFormOrder] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        getTopics().then((data) => {
            if(data.response !=200){
                setErrorMsg(data.message)
            }
            setTopics(data)
            setIsLoading(false)  
        })
       .catch((error) => {
        console.log("Error getting topics: ", error);
        setErrorMsg(error)
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

    if(errorMsg){
        return <p>{errorMsg}</p>
    }

    return(
        <>
         <Container fluid>
            <Row>
            <p className='topics-instruction'>Please select a topic to see the related articles</p>
        {topics.map((topic) => {
            return (
                <Col className='topics-list' key={topic.slug}>
                <Link to={`/articles/${topic.slug}`}><button onClick={() => setSearchTopic(topic.slug)}><h2>{topic.slug}</h2>
                </button></Link>
                </Col>
            )
            })}
            <Col>
            <form className='sorting-form' onSubmit={handleSubmit}>
            <label htmlFor="sort_by">Sort By: </label>
            <select name="sort_by" id="sort_by" onChange={(event) => setFormSortBy(event.target.value)} required>
            <option></option> 
            <option value="created_at">Date created</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
            </select>
            
            <label htmlFor="order_by">Order: </label>
            <select name="order_by" id="order_by" onChange={(event) => setFormOrder(event.target.value)} required>
            <option></option> 
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
            </select>
            <button type='submit' className='interact-buttons'>Sort</button>
            </form>
            </Col>
            </Row>
        </Container>
    </>
    )

}

export default Topics