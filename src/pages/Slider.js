/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'
import EditSliderModal from './EditSliderModal'
import Spinner from '../components/uitilities/Spinner'

const Slider = () => {
  const token = sessionStorage.getItem('myToken')
  if(!token) {
    window.location = "/login"
  }
  const [slider, setSlider]= useState([])
  const [showModal, setshowModal] = useState(false)
  const [filteredText, setFilterText] = useState("")
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  const SliderList = () => {
    axios.get(url.Mainurl + url.getBanner).then((res) => {
      // console.log(res.data)
      setSlider(res.data)
      setLoading(true)
    })
  }

  const DeleteSlider = (id) => {
   
    Swal.fire({
      title: 'ທ່ານຈະລົບຂໍ້ມູນແທ້ຫລືບໍ່?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ລົບຂໍ້ມູນ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(url.Mainurl + url.deleteBanner + id).then(() => {
          setSlider(slider.filter((val) => {
            Swal.fire({
              icon:'success',
              title: 'ລົບຂໍ້ມູນສຳເລັດ!'
            })
            return val.id !== id
          }))
        }).catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'ເກີດຂໍ້ຜິດພາດ'
          })
        })
      }
    })
  }

  useEffect(() => {
    SliderList()
  },[])

  function reset() {
    inputRef.current.value = "";
    setFilterText("")
    axios.get(url.Mainurl + url.getBanner).then((res) => {
      setSlider(res.data)
    })
  }

  return (
    <div>
    {loading === true ? <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <Link to="/add-slider" className="card-title btn btn-success float-right">ເພິ່ມ Slide</Link>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                <h3 className="card-title">Banner ທັງຫມົດ ( <strong className='text-danger'>{slider.length}</strong> )</h3>
                  <div className="card-tools">
                    <div className="input-group input-group-sm" style={{ width: 500 }}>
                      <input ref={inputRef} onChange={e => setFilterText(e.target.value)} type="text" name="table_search" className="form-control float-right" placeholder="ຄົ້ນຫາດ້ວຍຊື່ຣູບພາບ..." />
                      <div className="input-group-append">
                        <button onClick={reset} type="submit" className="btn btn-default">
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>ຊື່ຣູບພາບ</th>
                        <th>ຣູບພາບ</th>
                        <th className="text-center">ຈັດການ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slider.filter((e) => e.name.toLowerCase().includes(filteredText)).map((item,index) => (
                         <tr key={index}>
                         <td valign='middle'>{item.id}</td>
                         <td valign='middle'>{item.name}</td>
                         <td valign='middle'><img style={{maxWidth: 150+'px', height: 100+'px'}} src={url.file + item.image}></img></td>
                         <td class="text-center py-0 align-middle">
                           <div class="btn-group btn-group-sm">
                             <EditSliderModal name={item.name} id={item.id} showModal={showModal} setshowModal={setshowModal}></EditSliderModal>&nbsp;
                             <button class="btn btn-danger" onClick={() => DeleteSlider(item.id)}><i class="fas fa-trash"></i></button>
                           </div>
                         </td>
                       </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
          </div>
        </div>
      </div>
    </div> : <Spinner /> }
    </div>
  )
}

export default Slider