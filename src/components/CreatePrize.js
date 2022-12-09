import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import url from './API-links/apiurl'
import Spinner from './uitilities/Spinner'
import { NumberFormatBase } from 'react-number-format';

const CreatePrize = () => {
    // const [Title, setTitle] = useState('')
    // const [Description, setDescription]= useState('')
    // const [Image, setImage]= useState()
    // const [Quantity, setQuantity]= useState('')
    const [formvalues, setformValues]= useState({})
    const [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(false)
        // const formData = new FormData()
        // formData.append('title',Title)
        // formData.append('description', Description)
        // formData.append('image', Image)
        // formData.append('quantity', Quantity)
        setformValues(
            axios.post(url.Mainurl + url.createPrize, formvalues).then((res) => {
                setLoading(true)
                Swal.fire({
                    icon: 'success',
                    title: 'ສ້າງລາງວັນສຳເລັດ',
                    confirmButtonText: 'ເພິ່ມອີກ',
                    cancelButtonText: 'ອອກ',
                    cancelButtonColor: '#ff0000',
                    showCancelButton: true
                }).then((res) => {
                    if(res.isConfirmed) {
                        return navigate("/add-prize")
                    } else {
                        return navigate("/prize")
                    }
                })
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'something went wrong',
                    cancelButtonText: 'close'
                })
            })
        )
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setformValues({...formvalues, [name]: value })
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
                                    <h3 className="card-title">ເພິ່ມລາງວັນ</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຊື່ລາງວັນ</label>
                                                    <input type="text" className="form-control" name='title' value={formvalues.title} onChange={handleChange} placeholder="Enter Name" />
                                                </div>
                                            </div>
                                            {/* <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile">image</label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input type="file" className="custom-file-input" id="exampleInputFile" onChange={(e) => setImage(e.target.files[0])}  />
                                                            <label className="custom-file-label" htmlFor="exampleInputFile">Choose File</label>
                                                        </div>
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">Upload</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ມູນຄ່າລາງວັນ</label>
                                                    <NumberFormatBase min={0} className="form-control" name='description' value={formvalues.description} onChange={handleChange} placeholder="Enter Amount" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຈຳນວນ</label>
                                                    <NumberFormatBase min={0} className="form-control" name='quantity' value={formvalues.quantity} onChange={handleChange} placeholder="Enter qty" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">ເພິ່ມລາງວັນ</button>
                                        <Link to="/prize" className="btn btn-danger float-right">ອອກ</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div> : <Spinner/> }
        </div>
    )
}

export default CreatePrize