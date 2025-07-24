import './App.css'
import {BrowserRouter, Route, Routes,} from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import MainLayout from './MainLayout'
import Signup from './pages/Signup'




function App() {

  return (
    <>
    {/* <Navbar/> */}
    <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <MainLayout>
          <Home/>
      </MainLayout>}/>
      
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    {/* <Footer/> */}
    </>
  )
}

export default App
