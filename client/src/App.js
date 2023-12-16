import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Listing from './pages/Listing'
import Listings from './pages/Listings'
import UpdateListing from './pages/UpdateListing'

export default function App() {
  return(
  <>
 
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/listings/:id' element={<Listings/>}/>
        {/* <Route path='/update-listing' element={<UpdateListing/>}/> */}
        
        {/* <Route path='/create-listing' element={<Listing/>}/> */}
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/create-listing' element={<Listing/>}/>
         
        
        </Route>
      </Routes>
    </Router>
  </>
  ) 
}
