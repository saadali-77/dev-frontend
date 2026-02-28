import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../appStore/constant'
import { useDispatch, useSelector } from 'react-redux'
import { updateFeed } from '../appStore/feedSlice'
import { store } from '../appStore/store'
import { UserCard } from './UserCard'

 export const Feed  = () => {
  const feedSelector= useSelector(store=>store.feed)
  console.log(feedSelector)
  const dispatch= useDispatch()
const getFeed= async()=>{
try{
  if(feedSelector) return;
  const res= await axios.get(BASE_URL + '/user/feed',{withCredentials:true})
 dispatch(updateFeed(res.data))
}catch(err){
  console.log(err.message)
}

}
useEffect(()=>{
getFeed()
},[])
if(!feedSelector) return;
if (feedSelector.length===0) return <h2 className='flex justify-center mt-30 text-bold text-green-400'>no more user found</h2>
  




  return ( feedSelector && (
    <div className='flex justify-center my-10'> 
      
        <UserCard user={feedSelector[0]}/>
    </div>)
  )
}

