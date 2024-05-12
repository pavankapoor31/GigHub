import React, { useContext, useEffect, useState } from 'react'
import Gig from '../../Components/Gig/Gig';
import { BASE_URL } from '../../global_config';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../server/AuthContext';
const domains = ["Frontend Development","Backend Development","Database Management","DevOps","Machine Learning"]
export default function Home() {
const  [gigDataArray,setGigDataArray] = useState([]);
const  [loading,setLoading] = useState(true);
 const role = useSelector((state)=>state.gighubReducer.role)
  useEffect(
    ()=>{
      setLoading(true)
      if(role==="buyer")
      axios.get(`${BASE_URL}/api/gigs`).then(
        (res)=>{
          setGigDataArray(res.data)
        }).finally(
          ()=>setLoading(false)
        )
      else{
        axios.get(`${BASE_URL}/api/jobs`).then(
          (res)=>{
            setGigDataArray(res.data)
          }).finally(
            ()=>setLoading(false)
          )
      }
    },[role]
  )

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let profileId = localStorage.getItem('profile.id');
    profileId = JSON.parse(profileId);
    if(!currentUser && !profileId){
      navigate(`/login`);
    }
  },[currentUser]);
  
  if(loading) return <>
     <div className='d-flex justify-content-center mt-5'>
     <CircularProgress />
     </div>
  </>
  return (  
    <>
      <div className=' w-100 mx-auto' style={{ overflowY: 'auto', height:'calc(100vh - 6rem)'}}>
        {role === 'buyer' ? (
          <h3 className='pl-2'>Gigs you might want to check!</h3>
        ) : (
          <h3 className='pl-3'>Jobs you might want to check!</h3>
        )}
        {role === 'buyer' && (
          <div className='d-flex flex-wrap justify-content-center gap-2'>
            {gigDataArray.map((item) => (
              <Gig gigData={item} key={item.id} />
            ))}
          </div>
        )}
        {role === 'seller' && (
          <div className='d-flex flex-wrap justify-content-center gap-2'>
            {gigDataArray.map((item) => (
              <Gig gigData={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
