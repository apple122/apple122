import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import url from './API-links/apiurl'
import Swal from 'sweetalert2'
import Spinner from "./uitilities/Spinner";

function CreateDistrict() {
     // const [Title, setTitle] = useState('')
    // const [Description, setDescription]= useState('')
    // const [Image, setImage]= useState()
    // const [Quantity, setQuantity]= useState('')
    let getProvinceID = sessionStorage.getItem('province_id')
    let getDistrict = sessionStorage.getItem('district')
    let input = sessionStorage.getItem('input')
    const [districtName, setdistrictName]= useState("")
    const [province, setProvince] = useState([])
    const [provinceID, setProvinceID] = useState(input ? getProvinceID : null)
    const [loading, setLoading] = useState(false)

    const showProvince = () => {
        axios.get(url.Mainurl+url.getProvince).then((res) => {
            setProvince(res.data)
            setLoading(true)
        })
    }
   
    useEffect(() => {
        showProvince()
    },[])

    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        sessionStorage.setItem('province_id', provinceID)
        sessionStorage.setItem('input', true)
        setLoading(false)
        // const formData = new FormData()
        // formData.append('title',Title)
        // formData.append('description', Description)
        // formData.append('image', Image)
        // formData.append('quantity', Quantity)
            axios.post(url.Mainurl + url.postDistrict + provinceID, {
                id: provinceID,
                name: districtName
            }).then((res) => {
                setLoading(true)
                Swal.fire({
                    icon: 'success',
                    title: 'ເພິ່ມເມືອງສຳເລັດ!',
                    showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ເພິ່ມເມືອງອີກ',
                        cancelButtonText: 'ອອກ',
                        showCloseButton: true,
                }).then((result) => {
                    if(result.isDismissed) {
                        return navigate("/district")
                    } else if (result.isConfirmed) {
                        return navigate("/add-district")
                        // window.location = "/add-district"                    
                    }
                })
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'ເກີດຂໍ້ຜິດພາດ',
                    cancelButtonText: 'ປິດ'
                })
            })

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
                                    <h3 className="card-title">ເພິ່ມຂໍ້ມູນເມືອງ</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={handleSubmit} method="POST">
                                    <div className="card-body">
                                        <div className="row">
                                        <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>ເລືອກແຂວງ</label>
                                                    <select className="form-control" name='id' onChange={e => setProvinceID(e.target.value)} >
                                                        {input ? <option value={getProvinceID}>{province.filter((item) => item.id == getProvinceID).map((e) => e.name)}</option> : <option>--ກະລຸນາເລືອກແຂວງ--</option>}
                                                        {province.map((e) => 
                                                        <option value={e.id}>{e.name}</option>
                                                        )}
                                                        
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຊື່ເມືອງ</label>
                                                    <input type="text" className="form-control" name='name' onChange={e => setdistrictName(e.target.value)} placeholder="Enter Name" />
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
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-success float-right">ເພິ່ມເມືອງ</button>
                                        <Link to="/district" className="btn btn-danger">ອອກ</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div> : <Spinner/>}
    </div>
  )
}

export default CreateDistrict