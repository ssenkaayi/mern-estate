import React from 'react'
import {useSelector} from 'react-redux/es/hooks/useSelector'
import { useRef,useState,useEffect } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { updateUserStart,updateUserFailure,updateUserSuccess } from '../redux/user/userSlice';
import { useDispatch} from 'react-redux';



export default function Profile() {

  const{currentUser,loading,error} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const[file,setFile] = useState(undefined);
  const[filePerc,setFilePerc] = useState(0)
  const[uploadError,setUploadError] = useState(false);
  const[formData,setFormData]= useState({})
  const dispatch = useDispatch();
  const[updateSuccess,setUpdateSuccess] = useState(false);

  console.log(formData)
  // console.log(filePerc)
  // console.log(uploadError)


  useEffect(()=>{

    if(file){
      handleFileUpload(file);
    }

  },[file]);

  const handleFileUpload = (file)=>{

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName); 
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred/
      snapshot.totalBytes)*100;
      setFilePerc(Math.round(progress))
      
    },
    (error) =>{
      setUploadError(true);
    },
    ()=>{getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL)=>
        setFormData({...formData,avatar:downloadURL})
      );}
    );

  
  }

  const handleFormData = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
    console.log(formData)

  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      dispatch(updateUserStart());
      const res = await fetch(`/user/update/${currentUser._id}`,{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      });

      console.log(`${currentUser._id}`)
     

      const data = await res.json();

      if(data.success===false){
        dispatch(updateUserFailure(data.message))
        return;
      }

      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true);

    }catch(error){
      dispatch(updateUserFailure(error.message))
    }
  }

  return (

    <div className='p-3 max-w-lg mx-auto'>

        <h1 className='
        text-3xl font-semibold
        text-center my-7'
        > Profile </h1>



        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

          <input  onChange={(e)=>setFile(e.target.files[0])}
          ref={fileRef} 
          type='file' accept='image/*' hidden/>

          <img
          onClick={()=>{fileRef.current.click()}} 
          className='rounded-full h-24 w-24 
          object-cover cursor-pointer
          self-center mt-2' 
          src={formData.avatar || currentUser.avatar} alt='profile'/>
          <p className='text-center'>
            {uploadError?(
              <span className='text-red-7oo'>Error uploading image</span>
            ):
            filePerc > 0 && filePerc < 100 ?(<span className='text-slate-700'>{'uploading ${filePerc}%'}</span>):
            filePerc===100?(<span className='text-green-700'>successfully uploaded!</span>):('')}

          </p>
          
          <input type='text' defaultValue={currentUser.username} onChange={handleFormData} 
          placeholder='username' id='username' className='
          border p-3 rounded-lg'/>

          <input type='text'  defaultValue={currentUser.email} onChange={handleFormData} 
          placeholder='email' id='email' className='
          border p-3 rounded-lg'/>
        
          <input type='password'  onChange={handleFormData} placeholder='password' id='password' className='
           
           border p-3 rounded-lg'/>

          <button disabled={loading} className='bg-slate-700 text-white rounded-lg
          p-3 uppercase hover:opacity-95'> {loading?'loading...':'update'}</button>
        
        </form>

        <div className='flex justify-between mt-5'>
          <span className='text-red-700 cursor-pointer'>Delete Account</span>

          <span className='text-red-700 cursor-pointer'>Sign out </span>
        </div>

        <p className='text-red-700 text-center mt-2'>{error? error:''}</p>
        <p className='text-green-700 text-center'>{updateSuccess?'user updated successfully':''}</p>


    </div>
  
  )
}
