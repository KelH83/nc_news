import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom"



const ArticlesList = ({articles}) => {
    return (
        <Container  className='articles-container' fluid>
            <Row>
            {articles.map((article) => {
            return (
                <Card key={article.article_id} className='article-cards' style={{ width: '25rem' }}>
                <Card.Img variant="top" src={article.article_img_url} />
                <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Link to={`/articles/${article.article_id}`}><Button variant="dark">See more</Button></Link>
                </Card.Body>
                </Card>
            )
            })}
            </Row>
        </Container>
        
    )
}

export default ArticlesList