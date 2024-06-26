import React from 'react'
import './BioCard.css'
import { ReactComponent as LocationIcon } from '../../../assets/images/mapIcon.svg'
import { Rating } from '@mui/material'

export default function BioCard({info}) {


  return (
    <div className='d-flex flex-column border h-fit fit-content rounded'>
      <div className='main-color bio-card-container d-flex justify-content-between rounded-top'>
        
        <img src={require('../../../assets/images/profileImage.jpg')}
            alt="Profile image"
            className='border rounded-full m-2'
            style={{width: '5rem', height: '5rem'}}
        />

        <div className='d-flex w-100 pt-2 pb-2 pl-3 pr-3'>
          <div className='d-flex w-100 flex-column'>
            <div className='d-flex font-sans justify-content-between align-items-center'>
              <div className='fs-4 font-sans font-semibold'>{info.name}</div>
              {/* <span>ICONS</span> */}
            </div>

            <div className='d-flex justify-content-between align-items-center gap-4'>
              <div className='text-xs'>{info.bio}</div>
              
              <div className='d-flex gap-2'>
               <Rating/>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className='d-flex flex-column p-2 align-items-start'>
        <span className='text-md font-sans font-semibold'>About me</span>
        <p className='text-xs text-slate-500'>{info?.bio}</p>
      </div>

      <div className='row align-items-center pb-2'>
        <div className='col-3 d-flex flex-column'>
          <span className='text-md font-sans font-semibold'>Location</span>
          <span className='text-xs d-flex align-items-center text-slate-500'><LocationIcon className='ml-n2'/> {info.location}</span>
        </div>

        <div className='col-9 d-flex justify-content-end'>
          <div className='col-3'>
            <div className='main-color pt-2 pb-2 pl-4 d-flex flex-column align-items-start rounded-start'>
              <span className='text-sm font-sans font-semibold'>Portfolio</span>
              <a className='text-xs' href='#'>{info?.portfolio?.portfolio?.length>0?info?.portfolio?.portfolio:"Not available"}</a>
            </div>
          </div>

          <div className='col-3'>
            <div className='main-color pt-2 pb-2 d-flex flex-column align-items-start'>
              <span className='text-sm font-sans font-semibold'>Linkedin</span>
              <a className='text-xs' href='#'>{info?.portfolio?.linkedin?.length>0?info?.portfolio?.linkedin:"Not available"}</a>
            </div>
          </div>

          <div className='col-3'>
            <div className='main-color pt-2 pb-2 d-flex flex-column align-items-start rounded-end'>
              <span className='text-sm font-sans font-semibold'>Email</span>
              <a className='text-xs' href={`mailTo:${info?.email}`}>{info?.email?.split('@')[0]}</a>
            </div>
          </div>

        </div>
      </div>


    </div>
  )
}
