import React from 'react'

export default function Notresponsive() {
  return (
    <div className='not-responsive-info'>
        <img
          src="/images/harisenin_logo.webp"
          alt="logo"
          width={200}
          height="auto"
        />
        <div>
            Sorry, this site is not responsive yet
        </div>
        <div className='info'>
            (your width screen must be more than 900px)
        </div>
    </div>
  )
}
