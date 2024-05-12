import './lancerprofile.css'
import React, { useState } from 'react'
import BioCard from './BioCard/BioCard'
import LastChats from '../Last Chats/LastChats'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import GigFormWrapper from '../GigForm/GigFormWrapper';

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

  return (

    <>
      <div className='lancerprofile-container'>
        <div className='p-4 d-flex flex-column w-100 h-100'>
          <BioCard info={bioCardInfo} />

          <div className='w-100 d-flex mt-4 border p-4 align-items-center justify-content-start'>
            <span className='font-semibold'>ACTIVE GIGS</span>
          </div>

          <div className='d-flex flex-wrap mt-3 p-3'>
            ...gigs
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
