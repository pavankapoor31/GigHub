import React from 'react'
import BioCard from './BioCard/BioCard'
import LastChats from '../Last Chats/LastChats'

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
  return (
    <div className='w-100 h-100 border border-danger'>
      <div className='p-2 d-flex w-100 border'>
        <BioCard info={bioCardInfo} />
        <LastChats />
      </div>
    </div>
    
  )
}
