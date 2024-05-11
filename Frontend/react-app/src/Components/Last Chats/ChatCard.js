import React from 'react'

export default function ChatCard() {
  return (
    <div className='flex border-bottom'>
        <div className='pl-2 pr-2 w-1/6 border d-flex aling-items-center justify-content-start'>
            <img src={require('../../assets/images/profileImage.jpg')}
                alt="Profile image"
                className='border rounded-full mt-2 w-30'
                style={{width: '2.8rem', height: '2.8rem'}}
            />
        </div>

        <div class="w-5/6 d-flex align-items-center justify-content-center pt-2 w-70">
            <p className="line-clamp-2 text-xs msg-prev">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum tempore incidunt cupiditate molestias nulla velit repellendus pariatur vel harum suscipit expedita ducimus voluptatum exercitationem, omnis sunt consectetur quos adipisci doloremque?</p>
        </div>
    </div>
  )
}
