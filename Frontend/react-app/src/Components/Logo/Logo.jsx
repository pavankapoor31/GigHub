import React from 'react'


const Logo = ({classes="px-3 py-3"}) => {
  return (
        <img src={require('./../../assets/images/GigHubLogo.png')} alt=""
            width={150}
            className={`${classes}`}
        />
        // <span className='text-bold px-3' style={{fontWeight:'bold', fontSize:'28px'}} > GigHub</span>
  ) 
}

export default Logo