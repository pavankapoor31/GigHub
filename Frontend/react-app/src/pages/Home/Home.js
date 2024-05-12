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
    if(!currentUser){
      navigate(`/login`);
    }
  },[currentUser])
  if(loading) return <>
     <div className='d-flex justify-content-center mt-5'>
     <CircularProgress />
     </div>
  </>
  return (
<<<<<<< Updated upstream
  <>
    <div className='h-100 w-100' style={{overflowY:'auto'}}>
      {role==="buyer"? <h3 className='pl-2'> Gigs you might want to check! </h3> : <h3> Jobs you might want to check!</h3>}
      {role==="buyer" && <div className='d-flex flex-wrap gap-2' style={{height:'calc(100vh - 2.5rem'}}>
=======
    <div className='h-100 w-100 d-flex overflow-auto align-itens-center justify-content-center'>
      {/* <GigFormWrapper open={true}/> */}
      <div className='d-flex flex-wrap align-itens-center justify-content-center'>
>>>>>>> Stashed changes
        {
            gigDataArray.map((item) => <Gig gigData={item}  key = {item.id}/>)
        }
      </div>}
      {role==="seller" && <div className='d-flex flex-wrap gap-2' style={{height:'calc(100vh - 2.5rem'}}>
        {
            gigDataArray.map((item) => <Gig gigData={item}  key = {item.id}/>)
        }
      </div>}
    </div>
    </>
  )
}
