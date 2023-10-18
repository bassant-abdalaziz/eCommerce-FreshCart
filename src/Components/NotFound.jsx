import React from 'react'
import img from '../../src/assets/error.svg'
export default function NotFound() {
  return (
    <div className='w-50 mx-auto my-3 text-center'>
    <h2 className='my-3'>Not Found</h2>
    <img src={img} alt="" className='my-4' />
    </div>
  )
}
