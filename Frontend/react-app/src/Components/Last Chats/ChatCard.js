import React from 'react'

export default function ChatCard({lastMsg}) {
  return (
    <div className='flex border-bottom'>
        <div className='w-1/6 d-flex aling-items-start justify-content-center'>
            <img src={require('../../assets/images/profileImage.jpg')}
                alt="Profile image"
                className='border rounded-full mt-3 w-30'
                style={{width: '2.8rem', height: '2.8rem'}}
            />
        </div>

        <div className="w-5/6 d-flex flex-column align-items-start justify-content-center pt-3 w-70">
            <span className='text-lg font-sans font-semibold'>{lastMsg.username}</span>
            <p className="line-clamp-2 not-italic text-xs text-muted msg-prev">{lastMsg.message}</p>
        </div>

        <div className='text-xs font-semibold pb-1 d-flex align-items-end justify-content-center'>
          <span>{lastMsg.timestamp}</span>
        </div>
    </div>
  )
}
