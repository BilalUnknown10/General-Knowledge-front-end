import './App.css'
import {BrowserRouter, Route, Routes,} from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import MainLayout from './MainLayout'
import Signup from './pages/Signup'
import MCQS from './pages/MCQS'
import Verification from './components/Verification'
import FeedbackForm from './components/FeedbackForm'




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
   
      <Route path='/mcqs' element = {
        <>
        <Navbar/>
        <MCQS/>
        </>
        }/>

        <Route path='/feedback' element = {
        <>
        <Navbar/>
        <FeedbackForm/>
        </>
        }/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/verification' element={<Verification/>}/>
    </Routes>
    </BrowserRouter>
    {/* <Footer/> */}
    </>
  )
}

export default App
