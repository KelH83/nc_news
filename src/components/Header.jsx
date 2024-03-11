import { Link } from "react-router-dom"


const Header = () => {
    return(
        <>
         <video autoPlay muted loop playsInline poster="image.jpg">
            <source src="../newsbanner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        <nav className='navbar'>
            <Link to='/'> Home </Link>
            <Link to='/articles'> Articles </Link>
        </nav>
        </>
    )
}

export default Header