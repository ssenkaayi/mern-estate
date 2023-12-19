import React from 'react'
import { useParams} from 'react-router-dom'
import { useState,useEffect } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'

export default function Listings() {

  SwiperCore.use([Navigation])
  // using the mvc archtecture
  
  //model
  const[listing,setListing] = useState(null);
  const[loading,setLoading] = useState(false)
  const[error,setError] = useState(false)
  const params = useParams() 
  const listing_id = params.id
  // console.log(listing_id)


  useEffect(()=>{

    const fetchListing = async()=>{

      try{
  
        setLoading(true);
        const res = await fetch(`/listing/getListing/${listing_id}`,{
          method:'GET',
        
        })
        const data = await res.json();
      
        if(data.succuss===false){
          setError(true)
          setLoading(false)
          return
        }
        
        setError(false)
        setLoading(false)
       
        setListing(data)
    
      }
  
      catch(error){
        setError(error.message)
        setLoading(false)
  
    }
  }

    fetchListing()

    
  },[listing_id])

  //control

  //visual

  return (

    <main>
      {loading?'loading':''}
      {error?'error displaying listing':''}
      {listing && !loading && !error && (
        <div>
          {/* <img src={`${listing.imageUrls}`} alt=''></img> */}
          <Swiper navigation>
            {
              listing.imageUrls.map((url)=>(
                <SwiperSlide key={url}>
                  <div
                  className='h-[400px]' style={{background:`url(${url}) center
                  no-repeat`,backgroundSize:'cover'}}></div>
                </SwiperSlide>

              ))
            }

          </Swiper>
        </div>
      )}
    
    </main>

  )
}
