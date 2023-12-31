import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';


export default function SignUp() {

  const[formData,setFormData]=useState({});
  const[loading,setLoading]=useState(false);
  const[error,setError]= useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };


  //linking our api to send req to the server
  const handleSubmit = async(e)=>{
    setLoading(true);
    e.preventDefault();
    try{
      //making a request to the server
      const res = await fetch('/auth/signup',{
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
        setLoading(false);
        setError(data.message);
        return
      }

      //if response is True, register and navigate to the sign in page
      setLoading(false);
      setError(null)
      navigate('/signin')

    }catch(error){
      setLoading(false);
      setError(error.message);

    } 
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      
      <h1 className='text-3xl text-center font-semibold 
      my-7'>Sign Up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type = "text" placeholder='username'
         className='border p-3 rounded-lg' id='username'onChange={handleChange}/>
        <input type = "email" placeholder='email'
         className='border p-3 rounded-lg' id='email'onChange={handleChange}/>
        <input type = "password" placeholder='password'
         className='border p-3 rounded-lg' id='password'onChange={handleChange}/>

        <button disabled={loading} className='bg-slate-700 text-white p-3
         rounded-lg uppercase hover:opacity-95'>{loading? 'loading...':'Sign Up'}
        </button>

        <Oauth/>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account ?</p>
        <Link to={'/signin'}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
        
      </div>

      {error && <p className='text-red-500 mt-5'>{error}</p>}

    </div>
  )
}
