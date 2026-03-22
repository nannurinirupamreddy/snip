import React from 'react'
import notFoundGif from '../assets/404.gif';

function NotFoundPage() {
  return (
    <>
        <div className="header">
            <h1 className='bracket'>{`[`}</h1>
            <h1 className='text'>snip</h1>
            <h1 className='bracket'>{`]`}</h1>
            <p>paste long. get short. move on.</p>
        </div>
        <div className="display_msg">
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <button onClick={() => window.location.href = '/'} className='home-btn'>Go Home</button>
        </div>
    </>
  )
}

export default NotFoundPage