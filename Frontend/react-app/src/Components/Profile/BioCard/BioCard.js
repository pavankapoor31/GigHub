import React from 'react'
import './BioCard.css'

export default function BioCard({info}) {


  return (
    <div className='d-flex flex-column border rounded-top'>
      <div className='bio-card-container d-flex justify-content-between rounded-top'>
        
        <img src={require('../../../assets/images/profileImage.jpg')}
            alt="Profile image"
            className='border rounded-full m-2'
            style={{width: '5rem', height: '5rem'}}
        />

        <div className='d-flex w-100 pt-2 pb-2 pl-3 pr-3'>
          <div className='d-flex w-100 flex-column'>
            <div className='d-flex font-sans justify-content-between align-items-center'>
              <div className='text-lg font-sans font-semibold'>{info.name}</div>
              {/* <span>ICONS</span> */}
            </div>

            <div className='d-flex justify-content-between align-items-center gap-4'>
              <div className='text-xs'>{info.headline}</div>
              
              <div className='d-flex gap-2'>
                {/* <div className='d-flex flex-column justify-content-between align-items-center'>
                  <span className='text-sm font-sans font-semibold'>Followers</span>
                  <span className='text-xs'>{info.followers}</span>
                </div>

                <div className='d-flex flex-column justify-content-between align-items-center'>
                  <span className='text-sm font-sans font-semibold'>Following</span>
                  <span className='text-xs'>{info.following}</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className='about d-flex flex-column p-2 align-items-start'>
        <span className='text-md font-sans font-semibold'>About me</span>
        <p className='text-xs text-slate-500'>{info.bio}{info.bio}</p>
      </div>

      <div className='about row'>
        <div className='col-3 pb-2 d-flex flex-column'>
          <span className='text-md font-semibold'>Location</span>
          <span className='text-xs text-slate-500'>{info.location}</span>
        </div>

        <div className='col-7 pb-2'>
            {/* <button>Btn</button> */}
        </div>
      </div>


    </div>
  )
}
