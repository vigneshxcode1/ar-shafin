import React from 'react'
import { Link } from 'react-router-dom'
import "./dashbroad.css"
const Dashbroad = () => {
  return (
    <>
     <div className='dashboradtitle'>Dashbroad</div>

    <Link to="/createmosque" className='dashbroadlinks' > createmosque</Link>

    <Link to="/my-mosques"className='dashbroadlinks'  > showmymosque</Link>

   
    </>
   
  )
}

export default Dashbroad