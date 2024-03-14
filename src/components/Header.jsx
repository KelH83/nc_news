import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import { useContext, useState } from "react";
import { UserContext } from "./User";
import { getUsers } from "../api";


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
             <video className='banner-video' autoPlay muted loop playsInline poster="image.jpg">
             <source src="../newsbanner.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
            </video>
            <p className='banner-text'>News</p>     
        </Container>

        <nav className='navbar'>
            <Link to='/'> Home </Link>
            <Link to='/articles'> Articles </Link>
            {loggedInUser && <p>Logged in as: {loggedInUser.username}</p>}
            {loggedInUser && <img src={loggedInUser.avatar_url} />}
            {loginButtonVisible &&<button className='login-logout-buttons' onClick={login}>Log in</button>}
            {logoutButtonVisible &&<button className='login-logout-buttons' onClick={logout}>Log out</button>}
        </nav>
        </>
    )
}

export default Header