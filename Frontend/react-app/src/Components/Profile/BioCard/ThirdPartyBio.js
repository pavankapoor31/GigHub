import React, { useEffect,useState } from 'react'
import './BioCard.css'
import { ReactComponent as LocationIcon } from '../../../assets/images/mapIcon.svg'
import { CircularProgress, Rating } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../../global_config'
import axios from 'axios'
import MessagesProp from '../../Messages/MessagesProp'
export default function ThirdPartyBio({id,role}) {
const [gigData, setGigData] = useState({})
const {gigId} = useParams();
const [info,setInfo] = useState([]);
const [freeLancerData,setFreeLancerData] = useState([]);
const [loading,setLoading] = useState(true);
useEffect(
    ()=>{
        axios.get(`${BASE_URL}/api/gigs/${gigId}`).then(
            (res)=>{
                setGigData(res.data);
                if(res.data.freelancer_id){
                    axios.get(`${BASE_URL}/api/freelancers?filter={"where":{"or":[{"username":"${res.data.freelancer_id}"},{"id":"${res.data.freelancer_id}"}]}}`).then(
                    (freeRes)=>{
                        setFreeLancerData(freeRes.data[0])
                    }
                    ).finally(
                        ()=>{
                            setLoading(false)
                        }
                    )
                }else{
                    setLoading(false)
                }
            }
        )
    },[]
)
const handleRatingsChanged = (e)=>{
    console.log(e.target.value,'value') 
}
if(loading){
    return  <div className='d-flex justify-content-between align-items-center'>
        <CircularProgress />
    </div>
}
  return (
    <div className='d-flex flex-column border h-fit fit-content rounded'>
      <div className='main-color bio-card-container d-flex justify-content-between rounded-top'>
        
      { freeLancerData.image && <img src={freeLancerData.image}
            alt="Profile image"
            className='border rounded-full m-2'
            style={{width: '5rem', height: '5rem'}}
        />
}
        <div className='d-flex w-100 pt-2 pb-2 pl-3 pr-3'>
          <div className='d-flex w-100 flex-column'>
            <div className='d-flex font-sans justify-content-between align-items-center'>
              <div className='fs-4 font-sans font-semibold'>{freeLancerData.name}</div>
            </div>

            <div className='d-flex justify-content-between align-items-center gap-4'>
              <div className='text-xs'>{freeLancerData.bio}</div>
              
              <div className='d-flex gap-2'>
               <Rating  onChange={handleRatingsChanged} />
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className='d-flex flex-column p-2 align-items-start'>
        <span className='text-md font-sans font-semibold'>About {freeLancerData.name}</span>
        <p className='text-xs text-slate-500'>{freeLancerData?.bio}</p>
      </div>

      <div className='row align-items-center pb-2'>
        <div className='col-3 d-flex flex-column'>
          <span className='text-md font-sans font-semibold'>Location</span>
          <span className='text-xs d-flex align-items-center text-slate-500'><LocationIcon className='ml-n2'/> {freeLancerData.location}</span>
        </div>

        <div className='col-9 d-flex justify-content-end'>
          <div className='col-3'>
            <div className='main-color pt-2 pb-2 pl-4 d-flex flex-column align-items-start rounded-start'>
              <span className='text-sm font-sans font-semibold'>Portfolio</span>
              <a className='text-xs' href='#'>{freeLancerData?.portfolio?.portfolio?.length>0?freeLancerData?.portfolio?.portfolio:"Not available"}</a>
            </div>
          </div>

          <div className='col-3'>
            <div className='main-color pt-2 pb-2 d-flex flex-column align-items-start'>
              <span className='text-sm font-sans font-semibold'>Linkedin</span>
              <a className='text-xs' href='#'>{freeLancerData?.portfolio?.linkedin?.length>0?freeLancerData?.portfolio?.linkedin:"Not available"}</a>
            </div>
          </div>

          <div className='col-3'>
            <div className='main-color pt-2 pb-2 d-flex flex-column align-items-start rounded-end'>
              <span className='text-sm font-sans font-semibold'>Email</span>
              <a className='text-xs' href={`mailTo:${freeLancerData?.email}`}>{freeLancerData?.email?.split('@')[0]}</a>
            </div>
          </div>

        </div>
        <div className='d-flex flex-column p-2 align-items-start'>
        <span className='text-md font-sans font-semibold'>{freeLancerData.name}'s skills</span>
        <p className='text-xs text-slate-500'>{freeLancerData?.skills?.join(' , ')}</p>
      </div>
      </div>
        {<>

            <h4 className='mt-2 ml-2 '>
                Gig description
            </h4>
            <div style={{ marginLeft:'10px'}}>
                {
                    gigData.description
                }
            </div>
                </>
           
        }
        <MessagesProp messagerId ={freeLancerData?.id}/>
    </div>
  )
}
