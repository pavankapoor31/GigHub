import'./lastchats.css'
import React from 'react'
import ChatCard from './ChatCard';

const lastmessages = [ 
  {
    username: 'Vishal',
    message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, nihil inventore. Error harum beatae laboriosam? Inventore facere non amet consequatur, corrupti ducimus! Nemo porro dicta excepturi impedit hic voluptatem at!',
    timestamp: '2:30pm' 
  },
  {
    username: 'Mujeer',
    message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, nihil inventore. Error harum beatae laboriosam? Inventore facere non amet consequatur, corrupti ducimus! Nemo porro dicta excepturi impedit hic voluptatem at!',
    timestamp: '2:30pm' 
  },
  {
    username: 'Pavan',
    message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, nihil inventore. Error harum beatae laboriosam? Inventore facere non amet consequatur, corrupti ducimus! Nemo porro dicta excepturi impedit hic voluptatem at!',
    timestamp: '2:30pm' 
  },
  {
    username: 'Maihma',
    message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, nihil inventore. Error harum beatae laboriosam? Inventore facere non amet consequatur, corrupti ducimus! Nemo porro dicta excepturi impedit hic voluptatem at!',
    timestamp: '2:30pm' 
  },
]


export default function LastChats() {
  return (
    <div className='d-flex border flex-column h-100'>
      {
        lastmessages.map(msg => <ChatCard lastMsg={msg}/>)
      }
    </div>
  )
}
