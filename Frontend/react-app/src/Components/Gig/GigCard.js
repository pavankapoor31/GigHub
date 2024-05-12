import React from 'react'

const GigCard = ({gigData}) => {
  return (
    <div className="card border-0 m-2" style={{width: '19rem'}}>
    <img src={gigData.coverImage} className="rounded mb-3" 
        alt="No image" style={{height: '160px'}}/>
    <div className="card-body p-0">
        <div class="">
            <span className="line-clamp-2">{gigData.description}</span>
        </div>
        <span className='text-xs font-bold'>From &#8377;{gigData.budget} /hr</span>
    </div>
</div>
  )
}

export default GigCard