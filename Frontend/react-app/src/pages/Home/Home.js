import React, { useContext, useEffect, useState } from 'react'
import Gig from '../../Components/Gig/Gig';
import { BASE_URL } from '../../global_config';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../server/AuthContext';
// import GigFormWrapper from '../../Components/GigForm/GigFormWrapper';

// const gigDataArray = [
//     {
//       username: 'Reetik',
//       gigImg: 'https://source.unsplash.com/random/150x150/?nature',
//       rating: 4.8,
//       noOfRating: 120,
//       desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
//       price: 1231,
//     },
//     {
//       username: 'John',
//       gigImg: 'https://source.unsplash.com/random/150x150/?technology',
//       rating: 4.5,
//       noOfRating: 90,
//       desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
//       price: 1500,
//     },
//     {
//       username: 'Emma',
//       gigImg: 'https://source.unsplash.com/random/150x150/?food',
//       rating: 4.2,
//       noOfRating: 80,
//       desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
//       price: 1100,
//     },
//     {
//       username: 'Michael',
//       gigImg: 'https://source.unsplash.com/random/150x150/?food',
//       rating: 4.9,
//       noOfRating: 150,
//       desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
//       price: 1800,
//     },
//     {
//         username: 'Emma',
//         gigImg: 'https://source.unsplash.com/random/150x150/?food',
//         rating: 4.2,
//         noOfRating: 80,
//         desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
//         price: 1100,
//       },
//       {
//         username: 'Michael',
//         gigImg: 'https://source.unsplash.com/random/150x150/?food',
//         rating: 4.9,
//         noOfRating: 150,
//         desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
//         price: 1800,
//       },
//       {
//         username: 'Emma',
//         gigImg: 'https://source.unsplash.com/random/150x150/?food',
//         rating: 4.2,
//         noOfRating: 80,
//         desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
//         price: 1100,
//       },
//       {
//         username: 'Michael',
//         gigImg: 'https://source.unsplash.com/random/150x150/?food',
//         rating: 4.9,
//         noOfRating: 150,
//         desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
//         price: 1800,
//       },
//       {
//         username: 'Emma',
//         gigImg: 'https://source.unsplash.com/random/150x150/?food',
//         rating: 4.2,
//         noOfRating: 80,
//         desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
//         price: 1100,
//       },
//       {
//         username: 'Michael',
//         gigImg: 'https://source.unsplash.com/random/150x150/?food',
//         rating: 4.9,
//         noOfRating: 150,
//         desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
//         price: 1800,
//       },
//   ];

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
  <>
    <div className='h-100 w-100' style={{overflowY:'auto'}}>
      {role==="buyer"? <h3 className='pl-2'> Gigs you might want to check! </h3> : <h3> Jobs you might want to check!</h3>}
      {role==="buyer" && <div className='d-flex flex-wrap gap-2' style={{height:'calc(100vh - 2.5rem'}}>
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
