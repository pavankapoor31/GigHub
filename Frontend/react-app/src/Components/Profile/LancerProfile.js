import './lancerprofile.css'
import React, { useEffect, useState } from 'react'
import BioCard from './BioCard/BioCard'
import LastChats from '../Last Chats/LastChats'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import GigFormWrapper from '../GigForm/GigFormWrapper';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { BASE_URL } from '../../global_config';
import axios from 'axios';
import GigCard from '../Gig/GigCard';
const bioCardInfo = {
  name: 'Reetik',
  headline: 'Hi, I am a react developer!',
  bio: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, nihil inventore. Error harum beatae laboriosam? Inventore facere non amet consequatur, corrupti ducimus! Nemo porro dicta excepturi impedit hic voluptatem at!',
  location: 'Melbourne, Australia',
  linkedin: 'reetik_kumar',
  email: 'reetik@gmail.com',
  portfolio: 'reetik.com'
}

export default function LancerProfile() {
  const [isNewGig, setIsNewGig] = useState(false);
  const [myGigs, setMyGigs] = useState([]);
  const [profileDetails,setProfileDetails] = useState({});
  const role = useSelector(state=>state.gighubReducer.role)

  useEffect(
    ()=>{
      let id = localStorage.getItem('profile.id');
      id = JSON.parse(id);
      axios.get(`${BASE_URL}/api/${role==="buyer"?'clients':'freelancers'}?filter={"where":{"or":[{"id":"${id}"},{"username":"${id}"},{"client_id":"${id}"}]}}`).then(
        (res)=>{
          setProfileDetails(res.data[0]);
          console.log(res.data,'profileDetails')
        }
      )
    },[role]
  )

  useEffect(
    ()=>{ 
        let id = localStorage.getItem('profile.id');
        id = JSON.parse(id);
        if(role==="seller"){
          let details = localStorage.getItem("freelancer_data");
          details = JSON.parse(details)
          if(details){
          axios.get(`${BASE_URL}/api/gigs?filter={"where":{"or":[{"freelancer_id":"${details.id}"},{"id":"${id}"}]}}`).then(
            (res)=>{
               setMyGigs(res.data);
            }
          )}

        }else {
          let details = localStorage.getItem("client_data");
          if(details){
            details = JSON.parse(details)
            console.log(details,'details12')
            axios.get(`${BASE_URL}/api/jobs?filter={"where":{"or":[{"id":"${details.id}"},{"id":"${id}"}]}}`).then(
              (res)=>{
                 setMyGigs(res.data);
              }
            )
          }
        }
        
    },[role]
  )
  return (
    <>
      <div className='lancerprofile-container'>
        <div className='p-4 d-flex flex-column w-100 h-100'>
          <BioCard info={profileDetails} />

          <div className='w-100 d-flex mt-4 border p-4 align-items-center justify-content-start'>
            <span className='font-semibold'>ACTIVE GIGS</span>
          </div>

          <div className='d-flex flex-wrap mt-3 p-3'>
           {myGigs.map(
            (item)=>{
              return <GigCard gigData={item}/>
            }
           )}
            <div className='border border-black rounded d-flex justify-content-center' style={{height: '236px', width: '312px'}}>
              <button onClick={() => setIsNewGig(true)}>
                <AddCircleSharpIcon style={{height: '90px', width: '90px'}}></AddCircleSharpIcon>
                <span className='d-flex font-bold'>Create a new Gig</span>
              </button>

            </div>
          </div>
        </div>
        <div className='last-chats-container'>
          <LastChats />
        </div>
      </div>

      {isNewGig && <GigFormWrapper open={isNewGig} onClose={() => setIsNewGig(false)} />}
    </>
    
  )
}
