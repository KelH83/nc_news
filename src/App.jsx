import './App.css'
import { Routes, Route } from 'react-router-dom'
import Articles from './components/Articles'
import Header from './components/Header'
import Home from './components/Home'
import SingleArticle from './components/SingleArticle'
import { useState } from 'react'
import { UserContext } from './components/User'
import ErrorPage from './components/ErrorPage'


function App() {
const [loggedInUser, setLoggedInUser] = useState({
  username:'happyamy2016',
  name:'Amy Happy',
  avatar_url:'https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729'
})
  return (
    <>
    <UserContext.Provider value={{loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser}}>
     <Header />
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/articles' element={<Articles />} />
      <Route path='/articles/:article_id' element={<SingleArticle />} />
      <Route path='/articles/coding' element={<Articles />} />
      <Route path='/articles/football' element={<Articles />} />
      <Route path='/articles/cooking' element={<Articles />} />
      <Route path="*" element={<ErrorPage />} />
     </Routes>
     </UserContext.Provider>
    </>
  )
}

export default App
