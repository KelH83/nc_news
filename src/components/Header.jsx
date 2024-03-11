import { Link } from "react-router-dom"


const Header = () => {
    return(
        <>
        <h1>BANNER HERE</h1>
        <nav className='navbar'>
            <Link to='/'> Home </Link>
            <Link to='/articles'> Articles </Link>
        </nav>
        </>
    )
}

export default Header