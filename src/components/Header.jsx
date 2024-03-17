import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import { useContext, useState } from "react";
import { UserContext } from "./User";
import { getUsers } from "../api";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Header = () => {
    const {loggedInUser} = useContext(UserContext)
    const {setLoggedInUser} = useContext(UserContext)
    const [loginButtonVisible, setloginButtonVisible] = useState(true)
    const [logoutButtonVisible, setlogoutButtonVisible] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[userName, setUserName] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    
    function login(){
        getUsers(userName).then((data) => {
            if(data.response !=200){
                setlogoutButtonVisible(false)
                setloginButtonVisible(true)
                setErrorMsg(data.message)
            }
            setLoggedInUser(data)
            setloginButtonVisible(false)
            setlogoutButtonVisible(true)
            setUserName('')
        })
        .catch((error) => {
            console.log("Error getting topics: ", error);
            setlogoutButtonVisible(false)
            setloginButtonVisible(true)
            setUserName('')
            setErrorMsg(error)
           })
    }

    function logout(){
           setloginButtonVisible(true)
               setLoggedInUser(null)
            setlogoutButtonVisible(false)
       }


    if(errorMsg){
        alert('Invalid username or password')
        setErrorMsg(null)
    }

    return(
        <>
        <Container className='banner-container'>
            <video className='banner-video' autoPlay muted loop playsInline poster="../ncnewsNEWvid.mp4">
             <source src="/ncnewsNEWvid.mp4" type="video/mp4" alt='swirling blue haze over a nighttime world map with the words northcoders spinning in a circle'/>
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
            {loggedInUser &&<Link to='/articles/post'> Submit article </Link>}
            </Nav>
            </Navbar.Collapse>
            {loggedInUser && <p className='header-username'>{loggedInUser.username}</p>}
            {loggedInUser &&  <Link to={`/users/${loggedInUser.username}`}><img src={loggedInUser.avatar_url} alt='Avatar image' /></Link>}
            {loginButtonVisible &&<button className='login-logout-buttons' onClick={handleShow}>Log in</button>}
            {logoutButtonVisible &&<button className='login-logout-buttons' onClick={logout}>Log out</button>}
            
        </Container>
        </Navbar>

        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='modal-title' closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
        <label htmlFor='article-title'>UserName:
            <input type='text'value={userName}
            onChange={(event) => setUserName(event.target.value)} required>
            </input>
            </label>
            <label htmlFor='article-title'>Password:
            <input type='password' required>
            </input>
            </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className='modal-login-button' onClick={() => {handleClose(); login();}}>Submit</Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default Header