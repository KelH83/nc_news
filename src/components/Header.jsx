import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Header = () => {
    return(
        <>
        <Container className='banner-container'>
             <video className='banner-video' autoPlay muted loop playsInline poster="image.jpg">
             <source src="../newsbanner.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
            </video>
            <p className='banner-text'>News</p>     
        </Container>

        <nav className='navbar'>
            <Link to='/'> Home </Link>
            <Link to='/articles'> Articles </Link>
        </nav>
        </>
    )
}

export default Header