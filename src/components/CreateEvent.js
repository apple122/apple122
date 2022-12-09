import axios from 'axios'
import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import url from './API-links/apiurl'
import Spinner from './uitilities/Spinner'
import { NumberFormatBase } from 'react-number-format';

const CreateEvent = () => {

    const [Title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [start_date, setStartDate] = useState('')
    const [end_date, setEndDate]= useState('')
    const [time, setTime] = useState('')
    const [address, setAddress]= useState('')
    const [phone, setPhone]= useState('')
    const [sub_title, setSubTitle]= useState('')
    const [image, setImage]= useState('')
    const [loading, setLoading] = useState(true)
   
   
//    const [formValue, setFormValue]= useState({})

//    const handleChange = (e) => {
//     const {name, value} = e.target;
//     setFormValue({...formValue, [name]: value })
    
// }

let navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(false)
        // setFormValue(formValue)
        const formData = new FormData()
        formData.append('image', image)
        formData.append('title', Title)
        formData.append('description', description)
        formData.append('start_date', start_date)
        formData.append('end_date', end_date)
        formData.append('address', address)
        formData.append('phone', phone)
        formData.append('sub_title', sub_title)
        formData.append('time', time)


        axios.post(url.Mainurl + url.createEvent, formData).then(res => {
            setLoading(true)
                Swal.fire({ 
                    icon: 'success',
                    title: 'ເພິ່ມກິດຈະກຳສຳເລັດ!',
                }).then(function() {
                    return navigate("/event")
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
                                    <h3 className="card-title">ສ້າງກິດຈະກຳ</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={handleSubmit} method='POST' encType='multipart/form-data'>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຫົວຂໍ້</label>
                                                    <input type="text" className="form-control" value={Title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" name="title" id='title' required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile">ຣູບພາບ</label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} id="image" name='image' required/>
                                                        </div>
                                                        {/* <button type='submit'>Upload</button>  */}
                                                    </div>
                                    
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຄຳອະທິບາຍ</label>
                                                    <textarea  name="description"  id='description'  className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="enter description" required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ເດືອນ/ວັນ/ປີ ເລີ່ມກິດຈະກຳ</label>
                                                    <input type="date" className="form-control" name="start_date" id='date' value={start_date} onChange={(e) => setStartDate(e.target.value)} placeholder="Enter Date" required/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ເດືອນ/ວັນ/ປີ ຫມົດຊ່ວງກິດຈະກຳ</label>
                                                    <input type="date" className="form-control" name='end_date' value={end_date} onChange={(e) => setEndDate(e.target.value)} placeholder="Enter Date" required/>
                                                </div>
                                            </div>
                                            {/* <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ເວລາເລີ່ມສຸ່ມລາງວັນ</label>
                                                    <input type="time" className="form-control" name="time" value={time} onChange={(e) => setTime(e.target.value)} id='time' placeholder="Enter Time" required/>
                                                </div>
                                            </div> */}
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ສະຖານທີ່ບໍລິສັດ</label>
                                                    <input type="text" className="form-control" name='address' value={address} onChange={(e) => setAddress(e.target.value)} placeholder="ປ້ອນສະຖານທີ່ບໍລິສັດ ຍົກຕົວຢ່າງ: ບ້ານບຶງຂະຫຍອງ, ເມືອງສີສັດຕະນາກ, ແຂວງນະຄອນຫລວງວຽງຈັນ" required/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ເບີຕິດຕໍ່</label>
                                                    <NumberFormatBase min={0} className="form-control" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Contact" required/>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຫົວຂໍ້ຍ່ອຍ</label>
                                                    <input type="text" className="form-control" name='sub_title' value={sub_title} onChange={(e) => setSubTitle(e.target.value)} placeholder="Enter Sub Title" required/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-success float-right">ສ້າງກິດຈະກຳ</button>
                                        <Link to="/event" className="btn btn-danger">Cancel</Link>
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

export default CreateEvent