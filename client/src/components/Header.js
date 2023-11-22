import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"

export default function Header() {
    const {currentUser} = useSelector(state =>state.user)
    // console.log(currentUser)
    return (

    <header className='big-slate-200 shadow-md'>

        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

            <Link to='/'>
                <h1 className='font-bold text-sm:text-xt flex flex-wrap'>
                    <span className='text-slate-500'>Sahand</span>
                    <span className='text-slate-700'>Estate</span>
                </h1>
            </Link>



            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>

                <input type='text' 
                placeholder='search' 
                className='bg-transparent focus:outline-none w-20 sm:w-80'></input>

                <FaSearch className='text-slate-500' ></FaSearch>
                
            </form>

            <ul className='flex gap-4 text-slate-700'>

                <Link to='/'>
                    <li className='hidden sm:inline hover:underline'>Home</li>
                </Link>

                <Link to='/about'>
                    <li className='hidden sm:inline hover:underline'>About</li>
                </Link>
                
                <Link to='/signup'>
                    <li className='hidden hover:underline'>Sign Up</li>
                </Link>

                <Link to='/profile'>

                   { currentUser ? 
                   (<img className='h-7 w-7 rounded-full object-cover' src ={currentUser.avatar} alt= 'profile' /> ) :
                   (<li className='hover:underline'>SignIn</li> )}
                    
                </Link>
               
                
            </ul>

        </div>
    </header>
    
  
  )
}
