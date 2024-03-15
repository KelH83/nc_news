import { useContext, useState, useEffect } from "react";
import { UserContext } from "./User";
import { getArticles } from "../api";
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () =>{

const {loggedInUser} = useContext(UserContext)
const [isLoading, setIsLoading] = useState(true)
const[articles, setArticles] = useState('')

useEffect(() => {
    getArticles()
    .then((data) => {
        setArticles(data)
        setIsLoading(false)
    })
   .catch((error) => {
        setErrorMsg(error)
        console.log(errorMsg);
   })
}, []);

if(isLoading){
    return <div className="loading">
    <Spinner animation="border" variant="dark" />
    <p>Loading...</p>
    </div>
}

const articlesTotal = articles.length

const article1 = Math.floor(Math.random() * articlesTotal)
const article2 = Math.floor(Math.random() * articlesTotal)
const article3 = Math.floor(Math.random() * articlesTotal)





return(
    <>
    <h1>Welcome to Northcoders News <br/>
    {loggedInUser &&  <p className='user-welcome-name'>{loggedInUser.name}</p>}</h1>
    <Row>
    <Col>
    <Carousel className='carousel'>
      <Carousel.Item interval={5000}>
        <img src={articles[article1].article_img_url} />
        <Carousel.Caption>
          <h3>{articles[article1].title}</h3>
          <Link to={`/articles/${articles[article1].article_id}`}><button>Read article</button></Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
      <img src={articles[article2].article_img_url} />
        <Carousel.Caption>
          <h3>{articles[article2].title}</h3>
          <Link to={`/articles/${articles[article2].article_id}`}><button>Read article</button></Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
      <img src={articles[article3].article_img_url} />
        <Carousel.Caption>
          <h3>{articles[article3].title}</h3>
          <Link to={`/articles/${articles[article3].article_id}`}><button>Read article</button></Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Col>
    <Col className='home-text'>
    <h2>Lorem ipsum</h2>
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ligula lectus, tempor sed leo sed, facilisis mattis lorem. Praesent leo ante, egestas eu lacus sed, fermentum ultrices ipsum. Vestibulum egestas sem sit amet purus pretium sagittis. Maecenas luctus nisi ut viverra tincidunt. Sed sed pretium nunc. Proin consequat feugiat enim. Praesent at auctor lacus. Proin vitae eros et eros malesuada pharetra et at erat. Nullam finibus risus id consequat posuere. Vestibulum malesuada, nulla sed vehicula scelerisque, libero turpis hendrerit sem, sit amet vehicula nibh ante id leo. Integer facilisis placerat euismod. Duis egestas nulla turpis, vitae efficitur nunc tincidunt sed. Ut hendrerit ut massa consequat dictum. Proin condimentum risus risus, a luctus leo rhoncus sed. Curabitur diam nisi, rutrum quis sapien eget, volutpat sollicitudin nisi.
<br />
<br />
Pellentesque sollicitudin metus urna, vel vulputate lectus ornare vitae. Nam feugiat tellus nulla, vel hendrerit sem condimentum ac. Sed fringilla feugiat nisl, vel commodo diam luctus et. Aliquam laoreet non neque sit amet lobortis. Nulla non tempus orci. Suspendisse potenti. Ut vel tempus massa. In tempor elit eu mattis rutrum. Nulla venenatis lorem ac tincidunt consectetur. Aliquam id turpis eu nisi venenatis imperdiet.
    </p>
    </Col>
    </Row>
    </>
)
}

export default Home