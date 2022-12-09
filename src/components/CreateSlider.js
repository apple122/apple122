import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import url from './API-links/apiurl'
import Spinner from './uitilities/Spinner'

const CreateSlider = () => {
    const [Name, setName] = useState('')
    const [Image, setImage] = useState('')
    const [loading, setLoading] = useState(true)
    const [preview, setPreview] = useState()
    let navigate = useNavigate()

    const createSlider = (e) => {
        e.preventDefault()
        setLoading(false)
        const formData = new FormData()
        formData.append('name', Name)
        formData.append('image', Image)
        axios.post(url.Mainurl + url.createBanner, formData).then((res) => {
            // console.log(res)
            setLoading(true)
            Swal.fire({
                icon: 'success',
                title: 'ເພິ່ນຂໍ້ມູນສຳເລັດ!',
                timer: 2000
            }).then(function () {
                return navigate("/slider")
            })

        }).catch(() => {
            setLoading(true)
            alert('ເກີດຂໍ້ຜິດພາດ')
        })
    }

    function imageHandle(e) {
        setImage(e.target.files[0])
        setPreview(e.target.files[0])
    }

    return (
        <div>
            {loading === true ? <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            {/* left column */}
                            <div className="col-md-12">
                                {/* general form elements */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">ເພິ່ມຣູບ Slide</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={createSlider} method='POST' encType='multipart/form-data'>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Title Name</label>
                                                        <input type="text" className="form-control" value={Name} onChange={((e) => setName(e.target.value))} name='name' placeholder="Enter Title" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputFile">image</label>
                                                        <div className="input-group">
                                                            <div className="custom-file">
                                                                <input type="file" className="form-control" name='image' onChange={imageHandle} id="exampleInputFile" />
                                                            </div>
                                                            <div className="input-group-append">
                                                                {/* <span className="input-group-text">Upload</span> */}
                                                            </div>
                                                        </div>
                                                        {preview ? <div className="input-group mt-3">
                                                            <p>Preview Image</p>
                                                        </div> : ""}
                                                        <div className="input-group mt-1">

                                                            {preview === null}
                                                            {preview && (
                                                                <img className='float-left' style={{ maxWidth: 150 + 'px' }} src={URL.createObjectURL(preview)} alt={Image} />
                                                            )}

                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">description</label>
                                                    <textarea id="inputDescription" className="form-control" rows={3} placeholder="enter description" />
                                                </div>
                                            </div> */}
                                            </div>
                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary float-right">ເພິ່ມຂໍ້ມູນ</button>
                                            <Link to="/slider" className="btn btn-danger">Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div> : <Spinner />}
        </div>
    )
}

export default CreateSlider