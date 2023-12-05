import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import React from 'react'
import { useState } from 'react'

export default function Listing() {

    const[imageFile, setImageFile] = useState([])
    const[formData, setFormData] = useState({imageUrls:[],})
    const[imageUploadError,setImageUploadError] = useState(false)
    const[uploading,setUploading] = useState(false)

    const handleImageFile = (e)=>{
        setImageFile(e.target.files);
    }

    const handleImageFileUpload = (e)=>{

        if(imageFile.length > 0 && imageFile.length + formData.imageUrls.length < 7){
           
            setUploading(true)
            setImageUploadError(false);
            const promises = [];

            for(let i =0; i<imageFile.length; i++){
                promises.push(storeImage(imageFile[i]));
            }
            Promise.all(promises).then((urls)=>{
                setFormData({...formData,imageUrls:formData.imageUrls.concat(urls),
                });
                setImageUploadError(false);
                setUploading(false)
            }).catch((err)=>{
                setImageUploadError('Image upload error (2mb max per image)')
            })
        }else{
            setImageUploadError('You can only upload 6 images per listing')
        }

        // console.log(imageFile.length)

    }

    const handleImageDelete = (index)=>{
        setFormData({
            ...formData,
            imageUrls:formData.imageUrls.filter((_,i) => i !== index) 
        })

    }

    const storeImage = async(imageFile)=>{

        return new Promise((resolve,reject)=>{
            const storage = getStorage(app);
            const fileNmae = new Date().getTime() + imageFile.name;
            const storageRef = ref(storage,fileNmae);
            const uploadTask = uploadBytesResumable(storageRef,imageFile);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred/
                    snapshot.totalBytes)*100;
                    console.log(progress)
                    
                },
                (error)=>{
                    reject(error);

                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        resolve(downloadURL);
                    })
                }

            

                )

        })

    }

    console.log(formData);
    // console.log(imageFile)

  return (

    <main className='p-3 my-7'>
        <h1 className='text-center font-semibold text-3xl my-7'>
         Create a Listing
        </h1> 

        <form className='flex flex-col  sm:flex-row gap-4'>

            <div className='flex flex-col gap-4 flex-1'>

                <input type='text' placeholder='Name' className='border p-3
                rounded-lg ' id='name' maxLength={'62'} minLength={'10'} required/>

                <input type='text' placeholder='Description' className='border p-3
                rounded-lg ' id='descreption' maxLength={'62'} minLength={'10'} required/>

                <input type='text' placeholder='Addess' className='border p-3
                rounded-lg ' id='address' maxLength={'62'} minLength={'10'} required/>

                <div className='flex flex-row gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sell' className='w-5'></input>
                        <span>Sell</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5'></input>
                        <span>Rent</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='parkingSpot' className='w-5'></input>
                        <span>Parking Spot</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5'></input>
                        <span>Furnished</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5'></input>
                        <span>Offer</span>
                    </div>
                    
                </div>

                <div className='flex flex-row flex-wrap gap-2'>
                    
                    <div className='flex items-center gap-2'>

                        <input type='number' id='bedrooms' className='border p-3 rounded-lg
                            border-gray-300' min='1' max='10'
                         required/>
                        <p>Bed rooms</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input type='number' id='bathrooms' className='p-3 border rounded-lg
                         border-gray-300' max='10'
                        min='1' required/>
                        <p>Bath rooms</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input type='number' id='regularPrice' className='p-3 border rounded-lg
                         border-gray-300' max='10'
                        min='1' required/>
                        <div className='flex flex-col'>
                            <p>Regular Price</p>
                            <span className='text-xs'>($ / month)</span>
                        </div>
                       
                    </div>

                    <div className='flex items-center gap-2'>
                        <input type='number' id='discountPrice' className='p-3 border rounded-lg
                         border-gray-300' max='10'
                        min='1' required/>
                        
                        <div className='flex flex-col'>
                            <p>Discount Price</p>
                            <span className='text-xs'>($ / month)</span>
                        </div>
                      
                    </div>

                </div>

            </div>

            <div className='flex flex-col flex-1 gap-4'>

                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'> The first image
                will be the cover (max 6)</span>
                </p>

                <div className='flex gap-4'>

                    <input onChange={handleImageFile} className='p-3 border border-gray-300 rounded w-full' 
                    type='file' id='image' accept='image/*' multiple />
                    
                    <button type='button' onClick={handleImageFileUpload} className='p-3 text-green-700 border border-green-700 rounded
                    uppercase hover:shadow-lg disabled:opacity-80'>
                        {uploading?'uploading...':'upload'}
                    </button>
                </div>

                <p className='text-red-700 text-sm'>{imageUploadError&&imageUploadError}</p>

                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url,index)=>(

                        <div key={url} className='flex flex-row 
                        p-3 border items-center justify-between rounded-lg'>

                           <img src={url} alt='flex listing images' 
                           className='w-20 h-20 object-cover rounded-lg'
                           />

                           <button onClick={()=>handleImageDelete(index)} type='button' className='p-3 text-red-700 hover:opacity-75 flex uppercase'>delete</button>
                        </div>
                        

                    ))
                }

                <button  className='p-3 bg-slate-700 text-white rounded-lg uppercase 
                hover:opacity-95 disabled:opacity-80'>
                Create Listing
                </button>

            </div>

    

        </form>
    </main>
  )
}
