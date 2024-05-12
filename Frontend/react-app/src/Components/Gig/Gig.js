import React from 'react'

export default function Gig({gigData}) {
  return (
    <div className="card border-0 m-2" style={{width: '18rem'}}>
        <img src={(gigData.gigImg)} className="rounded mb-3" 
            alt="..." style={{height: '160px'}}/>
        <div className="card-body p-0">
            <span className="text-sm font-bold">{gigData.username}</span>
            <div class="">
                <p className="line-clamp-2">{gigData.desc}</p>
            </div>
            <div>&#9733;
                <span className='text-xs font-bold'>{' '}{gigData.rating}{' '}</span>
                <span>({gigData.noOfRating})</span>
            </div>
            <span className='text-xs font-bold'>From &#8377;{gigData.price}</span>
        </div>
    </div>
  )
}
