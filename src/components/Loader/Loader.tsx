import React from 'react'
import './loader.css'
import MySVGComponent from './svgComponent'
import { ReactSVG } from 'react-svg'
const Loader = () => {
  return (
    <div className='w-full flex justify-center h-96 items-center'>
<div className="loader">
  <div className="loader__bar"></div>
  <div className="loader__bar"></div>
  <div className="loader__bar"></div>
  <div className="loader__bar"></div>
  <div className="loader__bar"></div>
  <div className="loader__ball bg-primary-800"></div>
</div>
</div>
  )
}

export default Loader
