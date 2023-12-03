import React from 'react'

export default function Listing() {
  return (
    <main className='p-3 mx-auto'>
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
                    <input className='p-3 border border-gray-300 rounded w-full' 
                    type='file' id='image' accept='image/*' multiple />
                    
                    <button className='p-3 text-green-700 border border-green-700 rounded
                    uppercase hover:shadow-lg disabled:opacity-80'>
                        Upload
                    </button>
                </div>

                <button className='p-3 bg-slate-700 text-white rounded-lg uppercase 
                hover:opacity-95 disabled:opacity-80'>
                Create Listing
                </button>

            </div>

    

        </form>
    </main>
  )
}
