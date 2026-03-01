import React, { useEffect } from 'react'
import {Navbar} from '../components/Navbar'
import {Footer} from '../components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../appStore/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../appStore/userSlice'
const Body = () => {
  const Navigate= useNavigate()
  const dispatch= useDispatch()
  const userstore= useSelector(store=>store.user)
const fetchUser= async()=>{
  if(userstore) return;
    try{ const res= await axios.get(BASE_URL + 'api/profile/view',{
      withCredentials:true
    })
  dispatch(addUser(res.data))
  }catch(err){
    if(err.status===401){
   Navigate('/login')
    }
      console.log(err.message)
    }
}
useEffect(()=>{
fetchUser()
},[])
  return (
    <div>
        <Navbar/>
        
        <Outlet/>

<Footer/>
    </div>
  )
}

export default Body
