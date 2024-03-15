import './App.css'
import { Routes, Route } from 'react-router-dom'
import Articles from './components/Articles'
import Header from './components/Header'
import Home from './components/Home'
import SingleArticle from './components/SingleArticle'
import { useState } from 'react'
import { UserContext } from './components/User'
import ErrorPage from './components/ErrorPage'
import UserCard from './components/UserCard'
import PostArticle from './components/PostArticle'
import Footer from './components/Footer'


function App() {
const [loggedInUser, setLoggedInUser] = useState(null)
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
      <Route path='/users/:username' element={<UserCard />} />
      <Route path='/articles/post' element={<PostArticle />} />
      <Route path="*" element={<ErrorPage />} />
     </Routes>
     <Footer />
     </UserContext.Provider>
    </>
  )
}

export default App
