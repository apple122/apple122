import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

function Back() {
  function back() {
    window.history.back()
  }
  return (
    <div>
        <p style={{ cursor: "pointer" }} onClick={back} className="text-black"> <FaArrowLeft/> Back</p>
    </div>
  )
}

export default Back