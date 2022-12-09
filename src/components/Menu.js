import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/imgs/logo.jpg'
import SBS from '../assets/imgs/sbs.jpg'
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import { useTheme } from '@material-ui/core/styles';
import { TreeView } from '@material-ui/lab';
import TreeItem from '@material-ui/lab/TreeItem';
import Icon from './uitilities/Icon';

const Menu = () => {
  const location = useLocation();
  const splitLocation = location.pathname
  const token = sessionStorage.getItem('myToken')
  const conFirmToken = sessionStorage.getItem('conFirmToken')
  let navigate = useNavigate()

  function Logout() {
    Swal.fire({
      title: 'ທ່ານຈະອອກຈາກລະບົບແທ້ຫລືບໍ່?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ອອກຈາກລະບົບ',
      cancelButtonText: 'ຍົກເລີກ',
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('myToken')
        sessionStorage.removeItem('conFirmToken')
        window.location = "/luckydraw/admin"
      }
    })
  }

  if (splitLocation != "add-district") {
    sessionStorage.removeItem('province_id')
    sessionStorage.removeItem('input')
  }

  if(splitLocation == "/reloadRandom") {
    return navigate("/random")
  }

  if(splitLocation == "/reloadDistrict") {
    return navigate("/district")
  }

  if(splitLocation == "/reloadEvent") {
    return navigate("/event")
  }

  if(splitLocation == "/reloadPrize") {
    return navigate("/prize")
  }

  if(splitLocation == "/reloadProvince") {
    return navigate("/province")
  }

  if(splitLocation == "/reloadSlider") {
    return navigate("/slider")
  }

  if(splitLocation == "/reloadUser") {
    return navigate("/user")
  }

  if(splitLocation == "/reloadAbout") {
    return navigate("/about")
  }

  if(splitLocation == "/reloadCandidate") {
    return navigate("/Candidates_eligibility")
  }

  if(splitLocation == "/reloadSettime") {
    return navigate("/settime")
  }

  return (
    <aside className={`position-fixed main-sidebar sidebar-dark-primary elevation-4 ${!token && token != conFirmToken && splitLocation === "/login" ? "d-none" : ""}`}>
      {/* Brand Logo */}
      <a href="http://www.bestech.la/" target="_blank" rel="noopener noreferrer" className="brand-link text-decoration-none">
        <img src={Logo} alt="Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
        <span className="brand-text font-weight-light">Bestech</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">

        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src={SBS} alt="logo" className="img-circle elevation-2" />
          </div>
          <div className="info">
            <Link to="/luckydraw/admin" className="d-block text-decoration-none">Random Web</Link>
          </div>
        </div>

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">



            <li className="nav-header">ເມນູທັງຫມົດ</li>

            <li className="nav-item">
              <Link to="/random" className="nav-link">
                <i className="nav-icon fas fa-heart" />
                <p>
                  ໜ້າສຸ່ມ
                </p>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="nav-icon fa fa-file" />
                <p>
                  ຂໍ້ມູນຜູ້ທີ່ມີສິດສູ່ມແລະເລກບີນ
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Candidates_eligibility" className="nav-link">
                <i className="nav-icon fa fa-users" />
                <p>
                  ຂໍ້ມູນຜູ້ມີສິດສຸ່ມ
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/winner" className="nav-link">
                <i className="nav-icon fa fa-list" />
                <p>
                  ລາຍຊື່ຜູ້ຖືກລາງວັນ
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/settime" className="nav-link">
                <i className="nav-icon fa fa-clock" />
                <p>
                  ຈັດການເວລາສຸ່ມລາງວັນ
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/prize" className="nav-link">
                <i className="nav-icon fa fa-trophy" />
                <p>
                  ລາງວັນ
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/province" className="nav-link">
                <i className="nav-icon fa fa-road " />
                <p>
                  ສ້າງແຂວງ
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/district" className="nav-link">
                <i className="nav-icon fa fa-city " />
                <p>
                  ສ້າງເມືອງ
                </p>
              </Link>
            </li>
            <TreeView className='font-phetSart'>
              <TreeItem nodeId="1" label={
                <ListItem button component="a">
                   <i className="fas fa-angle-down pe-1" />
                  <ListItemText primary="ຈັດການໜ້າເວັບ" className='font-phetSart'/> 
                  
                </ListItem>}>
                <TreeItem nodeId="2" label={
                  
                  <ListItem>
                     <i className="far fa-circle nav-icon text-white ps-2" />
                     <Link to="/slider" className="nav-link ps-2">
                   
                    <p>ສະໄລສ</p>
                  </Link>
                  </ListItem>
                  
                }>
                </TreeItem>
                <TreeItem nodeId="3" label={
                  <ListItem button component="a" href="#">
                    <i className="far fa-circle nav-icon ps-2" />
                    <Link to="/event" className="nav-link ps-2">
                    
                    <p>ກິດຈະກຳ</p>
                  </Link>
                  </ListItem>}>
                </TreeItem>

                <TreeItem nodeId="4" label={
                  <ListItem button component="a" href="#">
                    <i className="far fa-circle nav-icon ps-2" />
                    <Link to="/about" className="nav-link ps-2">
                    <p>ກ່ຽວກັບ</p>
                  </Link>
                  </ListItem>}>
                </TreeItem>
                
              </TreeItem>
            </TreeView>

            <TreeView>
              <TreeItem nodeId="5" label={
                <ListItem button component="a" className=''>
                   <i className="fas fa-angle-down pe-1" />
                  <ListItemText primary="ຕັ້ງຄ່າຜູ້ໃຊ້ລະບົບ" className='font-phetSart'/>
                  
                </ListItem>}>
                <TreeItem nodeId="6" label={
                  <ListItem>
                      <i className="far fa-circle nav-icon text-white ps-2" />
                     <Link to="/user" className="nav-link ps-2">
                   
                    <p>ຜູ້ໃຊ້ລະບົບ</p>
                  </Link>
                  </ListItem>
                  
                }>
                </TreeItem>
                <TreeItem nodeId="7" label={
                  <ListItem button component="a" href="#">
                    <i className="far fa-circle nav-icon ps-2" />
                    <Link to="/add-user" className="nav-link ps-2">
                    <p>ສ້າງຜູ້ໃຊ້ລະບົບ</p>
                  </Link>
                  </ListItem>}>
                </TreeItem>
                
              </TreeItem>
            </TreeView>
            <li className="nav-item">
              <Link onClick={Logout} to="" className="nav-link">
                <i className="fas fa-sign-out-alt nav-icon" />
                <p>ອອກຈາກລະບົບ</p>
              </Link>
            </li>

          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>

  )
}

export default Menu