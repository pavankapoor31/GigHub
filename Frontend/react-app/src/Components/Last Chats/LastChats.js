import React from 'react'
import'./lastchats.css'

export default function LastChats() {
  return (
    <div className='d-flex flex-column fit-content border h-100'>
      <ChatCard />
      <ChatCard />
      <ChatCard />
    </div>
  )
}
