import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { getUsers } from '../api';


const UserCard = () => {
    const [isLoading, setIsLoading] = useState(true)
    const {username} = useParams()
    const [user, setUser] = useState({})
    const [errorMsg, setErrorMsg] = useState(null)
    
    useEffect(() => {
        getUsers(username).then((data) => {
            if(data.response != 200){
                setErrorMsg(data.message)
            }
            setUser(data)
            setIsLoading(false)
        })
        .catch((error) =>{
            console.log("Error fetching user: ", error);
        })
    }, []);

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
        <section className='user-card'>
        <img src={user.avatar_url} alt='avatar image'/>
        <p>Username: {user.username}</p>
        <p>Name: {user.name}</p>
        </section>
        </>
    )

}

export default UserCard