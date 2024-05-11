import React from 'react'
import BioCard from './BioCard/BioCard'

const bioCardInfo = {
  name: 'Reetik',
  headline: 'Hi, I am a react developer!',
  bio: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, nihil inventore. Error harum beatae laboriosam? Inventore facere non amet consequatur, corrupti ducimus! Nemo porro dicta excepturi impedit hic voluptatem at!',
}

export default function LancerProfile() {
  return (
    <div className='p-2 w-100'>
      <BioCard info={bioCardInfo} />
    </div>
  )
}
