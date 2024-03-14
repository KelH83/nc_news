import { useContext } from "react";
import { UserContext } from "./User";

const Home = () =>{

const {loggedInUser} = useContext(UserContext)
return(
    <>
    <h1>Welcome to Northcoders News <br/>
    {loggedInUser &&  <p>{loggedInUser.name}</p>}</h1>
    <p>Featured articles to be added here</p>
    </>
)
}

export default Home