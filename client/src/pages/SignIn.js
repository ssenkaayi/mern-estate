import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';


export default function SignIn() {
  const[formData,setFormData]=useState({});
 const {loading,error} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };


  //linking our api to send req to the server
  const handleSubmit = async(e)=>{
   
    e.preventDefault();
    try{
      dispatch(signInStart())
      //making a request to the server
      const res = await fetch('/auth/signin',{
        method:'POSt',
        headers:{'content-type':'application/json',},
        body:JSON.stringify(formData)
      }
      );
      //getting response from the server
      const data =  await res.json();
      // console.log(data)

      //if response is false, show the error message to the client
      if(data.success===false){
        dispatch(signInFailure(data.message));
        return;
      }

      //if response is True, register and navigate to the sign in page
      dispatch(signInSuccess(data));
      // console.log(data)
      navigate('/')

    }catch(error){
      dispatch(signInFailure(error.message))
    } 
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      
      <h1 className='text-3xl text-center font-semibold 
      my-7'>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type = "text" placeholder='username'
         className='border p-3 rounded-lg' id='username'onChange={handleChange}/>
        <input type = "password" placeholder='password'
         className='border p-3 rounded-lg' id='password'onChange={handleChange}/>

         <button disabled={loading} className='bg-slate-700 text-white p-3
         rounded-lg uppercase hover:opacity-95'>{loading? 'loading...':'Sign In'}</button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont have an account ?</p>
        <Link to={'/signup'}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
        
      </div>

      {error && <p className='text-red-500 mt-5'>{error}</p>}

    </div>
  )
}
