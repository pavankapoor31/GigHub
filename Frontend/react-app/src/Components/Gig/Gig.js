import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../global_config'
import { useDispatch } from 'react-redux'
import { setFreelancerData } from '../../redux/actions/gighub.actions'
import { useNavigate } from 'react-router-dom'

export default function Gig({gigData}) {
    const [freelancerInfo,setFreelancerInfo] = useState({})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ratings,setRatings] = useState({})
    useEffect(()=>{
        if(!gigData.freelancer_id) return;
        axios.get(`${BASE_URL}/api/freelancers?filter={"where":{"or":[{"id":"${gigData.freelancer_id}"},{"username":"${gigData.freelancer_id}"}]}}`).then(
            (res)=>{
                if(res.data.length>0)
                setFreelancerInfo(res.data[0]);
                dispatch(setFreelancerData(res.data[0]));
                setRatings(res.data?.ratings??{})
            }
        ).catch ((err)=>{console.log(err)})
    },[gigData?.freelancer_id])

    const handleOpenGig = ()=>{
        if(gigData.freelancer_id){
            navigate(`/details/${gigData.id}`)
        }
    }
  return (
    <div className="card border-0 m-2 cursor-pointer" style={{width: '19rem'}}
        onClick={() => {handleOpenGig()}}
    >
        <img src={gigData.image} className="rounded mb-3" 
            alt="No image" style={{height: '160px'}}/>
        <div className="card-body p-0">
            <span className="text-sm font-bold">{freelancerInfo.name}</span>
            <div class="">
                <p className="line-clamp-2">{gigData.description}</p>
            </div>
            { Object.values(ratings).length>0 && <div>&#9733;
                <span className='text-xs font-bold'>{''}{ratings.stars}{' '}</span>
                <span>({ratings.count})</span>
            </div>}
            <span className='text-xs font-bold'>From &#8377;{gigData.budget} /hr</span>
        </div>
    </div>
  )
}
