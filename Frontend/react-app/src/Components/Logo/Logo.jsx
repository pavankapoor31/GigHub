import React from 'react'


const Logo = () => {
  return (
        <img src={require('./../../assets/images/GigHubLogo.png')} alt=""
            width={150}
            className='px-3 py-3'
        />
        // <span className='text-bold px-3' style={{fontWeight:'bold', fontSize:'28px'}} > GigHub</span>
  ) 
}

export default Logo