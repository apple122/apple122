import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import url from '../components/API-links/apiurl'
import Swal from 'sweetalert2'
import Spinner from '../components/uitilities/Spinner'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const token = sessionStorage.getItem('myToken')
  const [loading, setLoading] = useState(false)
  if(!token) {
    window.location = "/login"
  }
  const [array, setArray] = useState([])
  
  useEffect(() => {
    axios.get(url.Mainurl + url.getAbout).then((res) => {
      setLoading(true)
      setArray(res.data)
      setImage(res.data[0].image)
      setTitle(res.data[0].title)
      setDescription(res.data[0].description)        
    })
  }, [])
  const [Image, setImage]= useState()
  const [Title, setTitle] = useState()
  const [Description, setDescription] = useState()
  const [preview, setPreview] = useState()
  let navigate = useNavigate()

  const handleSubmit = (e) => {
    
    e.preventDefault()
    setLoading(false)
    const formData = new FormData()
    formData.append('title',Title)
    formData.append('description', Description)
    formData.append('image', Image)
        axios.patch(url.Mainurl + url.patchAbout + 1, formData).then((res) => {
          setLoading(true)
            Swal.fire({
                icon: 'success',
                title: 'ປ່ຽນຂໍ້ມູນສຳເລັດ',
                confirmButtonText: 'ok'   
            }).then((res) => {
              if(res.isConfirmed) {
                return navigate('/reloadAbout')
              }
            })
        }).catch(() => {
          setLoading(true)
            Swal.fire({
                icon: 'error',
                title: 'something went wrong',
                cancelButtonText: 'close'
            })
        })
}

function imageHandler(e) {
  setImage(e.target.files[0])
  setPreview(e.target.files[0])
}

  return (
    <div className="content-wrapper">
      {loading === true ? <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Update About</h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <form onSubmit={handleSubmit} method="POST" encType='multipart/form-data'>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="inputName">ຫົວຂໍ້</label>
                    <input onChange={e => setTitle(e.target.value)} type="text" id="inputName" className="form-control" defaultValue={Title} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputDescription">ຄຳອະທິບາຍ</label>
                    <textarea id="inputDescription" onChange={e => setDescription(e.target.value)} className="form-control" rows={4} defaultValue={Description} />
                  </div>
                  <label htmlFor="inputImage">ຣູບພາບ</label>
                  <div className="input-group">
                    <div className="custom-file">
                     
                      <input type="file" className="form-control" onChange={imageHandler} id="image" name='image' />
                      {/* <label className="custom-file-label" htmlFor="exampleInputFile"></label> */}
                      
                      
                    </div>
                    {preview ? <div className="input-group mt-3">
                    <p>Preview Image</p>
                    </div> : ""}
                   <div className="input-group mt-1">
                    
                    {preview === null}
                   {preview && (
                        <img className='float-left' style={{maxWidth: 150+'px'}} src={URL.createObjectURL(preview)} alt={Image}/>
                        )}
                   
                   </div>
                  </div>
                  <button type='submit' className='mt-4 btn btn-success float-left'>ອັບໂຫລດ</button>
                </div>
                </form>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
          </div>

        </div>
      </div> : <Spinner/> }
    </div>
  )
}

export default About