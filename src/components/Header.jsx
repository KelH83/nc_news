import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import { useContext, useState } from "react";
import { UserContext } from "./User";
import { getUsers } from "../api";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Header = () => {
    const {loggedInUser} = useContext(UserContext)
    const {setLoggedInUser} = useContext(UserContext)
    const [loginButtonVisible, setloginButtonVisible] = useState(true)
    const [logoutButtonVisible, setlogoutButtonVisible] = useState(false)
    
    function login(){
     const username =  prompt('Please enter your username')
        setloginButtonVisible(false)
        setlogoutButtonVisible(true)
        getUsers(username).then((data) => {
            setLoggedInUser(data)
        })
    }

    function logout(){
           setloginButtonVisible(true)
               setLoggedInUser(null)
            setlogoutButtonVisible(false)
       }


    return(
        <>
        <Container className='banner-container'>
             <video className='banner-video' autoPlay muted loop playsInline poster="../bannerposter.jpeg">
             <source src="../newsbanner.mp4" type="video/mp4" alt='swirling blue haze over a nighttime world map with the words northcoders spinning in a circle'/>
                    Your browser does not support the video tag.
            </video>
            <p className='banner-text'>News</p>     
            
        </Container>

        <Navbar expand="lg" className="navbar">
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" variant='dark'>
            <Nav className="nav-links">
            <Link to='/'> Home </Link>
            <Link to='/articles'> Articles </Link>
            {loggedInUser &&<Link to='/articles/post'> Post article </Link>}
            </Nav>
            </Navbar.Collapse>
            {loggedInUser && <p>{loggedInUser.username}</p>}
            {loggedInUser &&  <Link to={`/users/${loggedInUser.username}`}><img src={loggedInUser.avatar_url} alt='Avatar image' /></Link>}
            {loginButtonVisible &&<button className='login-logout-buttons' onClick={login}>Log in</button>}
            {logoutButtonVisible &&<button className='login-logout-buttons' onClick={logout}>Log out</button>}
            
        </Container>
        </Navbar>
        </>
    )
}

export default Header