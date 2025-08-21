import React from 'react'
import {Link} from  'react-router-dom'
const NotFound = () => {
  return (
    <>
    <Link to ='/' style={{fontSize:'1.5rem',color:'darkblue'}}>
    <p>go back</p>
    </Link>
    <div className='errorSection'>
        <h1>404</h1>
        <div>Page Not Found</div>
    </div>
    </>
  )
}

export default NotFound;