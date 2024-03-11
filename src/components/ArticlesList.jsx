import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const ArticlesList = ({articles}) => {
    return (
        <Container  className='articles-container' fluid>
            <Row>
            {articles.map((article) => {
            return (
                <Card className='article-cards' style={{ width: '25rem' }}>
                <Card.Img variant="top" src={article.article_img_url} />
                <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Button variant="primary">Read more</Button>
                </Card.Body>
                </Card>
            )
            })}
            </Row>
        </Container>
        
    )
}

export default ArticlesList