import './App.css'
import { Routes, Route } from 'react-router-dom'
import Articles from './components/Articles'
import Header from './components/Header'
import Home from './components/Home'

function App() {

  return (
    <>
     <Header />
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/articles' element={<Articles />} />
     </Routes>
    </>
  )
}

export default App
