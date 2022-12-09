import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation();
  const splitLocation = location.pathname
  const token = sessionStorage.getItem('myToken')
  const conFirmToken = sessionStorage.getItem('conFirmToken')

  return (
    <footer className={`main-footer ${!token && token != conFirmToken && splitLocation === "/login" ? "d-none" : ""}`}>
      <strong>Copyright © {new Date().getFullYear()} <Link to="/">bestech.la</Link>. </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 1.0.0
      </div>
    </footer>

  )
}

export default Footer