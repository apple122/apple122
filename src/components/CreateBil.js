import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import url from './API-links/apiurl'
import Swal from 'sweetalert2'
import Select from 'react-select'
import Spinner from './uitilities/Spinner'
import { NumberFormatBase } from 'react-number-format'
import { useParams } from 'react-router-dom'

function CreateBil() {
    let {id} = useParams();

    // const [candidate, setCandidate] = useState([])
    const [checkCandidate, getCheckCandidate] = useState()
    const [image, setImage] = useState()
    const [bil, setBil] = useState()
    const [amount, setAmount] = useState()
    const [loading, setLoading] = useState(false)


    let convertAmount = parseInt(amount);
    let totalPage = null;
    let candidate;
    let sliceData;

    const fullName = sessionStorage.getItem('fullName')
    const province_id = sessionStorage.getItem('Province_id')
    const district_id = sessionStorage.getItem('district_id')
    const village_name = sessionStorage.getItem('village')
    const phone_number = sessionStorage.getItem('phone')
    const checkInput = sessionStorage.getItem('checkInput')

    useEffect(() => {
    
            if (id != "none") {
                getCheckCandidate(1)   
                axios.put(url.Mainurl + url.putCandidate + id, {
                    fullName: fullName,
                    province_id: province_id,
                    district_id: district_id,
                    village: village_name,
                    phone: phone_number
                }).then(res => {
                    setLoading(true)
                    
                }).catch((err) => {
                    setLoading(true)
                    console.log(err.message)
                })
            } else if (id == "none") {
                getCheckCandidate(0)
                axios.post(url.Mainurl + url.postCandidate, {
                    fullName: fullName,
                    province_id: province_id,
                    district_id: district_id,
                    village: village_name,
                    phone: phone_number
                }).then(res => {
                    setLoading(true)
                }).catch((err) => {
                    setLoading(true)
                    console.log(err.message)
                })
            }

    }, [])

    let navigate = useNavigate()
    if (!checkInput) {
        return navigate("/")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(false)
        if (checkCandidate === 0) {
            const firstProcess =  () => {
                axios.get(url.Mainurl + url.getCandidate).then((res) => {
                    totalPage = res.data.totalPages-1
                    // console.log('page', totalPage)
                }).then(() => {
                    axios.get(url.Mainurl + url.getCandidate + `?page=${totalPage}`).then((res2) => {
                        candidate = res2.data.lists
                        let candidateOne = candidate.sort(function (a, b) {
                            return b.id - a.id
                        })
                        sliceData = candidateOne.slice(0, 1)
        
                        axios.post(url.Mainurl + url.postBil, {
                            'bil_number': bil,
                            'bil_price': convertAmount,
                            'bil_pic': image,
                            'candidate_id': sliceData[0].id,
                        }).then(res => {
                            setLoading(true)
                            Swal.fire({
                                icon: 'success',
                                title: 'ເພິ່ມບິນແລະຜູ້ມີສິດສຸ່ມສຳເລັດ!',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'ເພິ່ມບິນອີກ',
                                cancelButtonText: 'ອອກ',
                                showCloseButton: true,
        
                            }).then((result) => {
                                if(result.isConfirmed) {
                                    if(id === "none") {
                                        return navigate(`/add-bil/none`)
                                    } else {
                                        return navigate(`/add-bil/${id}`)
                                    }
                                } else if (result.isDismissed) {
                                    sessionStorage.removeItem('fullName')
                                    sessionStorage.removeItem('Province_id')
                                    sessionStorage.removeItem('district_id')
                                    sessionStorage.removeItem('village')
                                    sessionStorage.removeItem('phone')
                                    sessionStorage.removeItem('checkInput')
        
                                    return navigate("/")
                                }
        
                            })
                        }).catch(() => {
                            setLoading(true)
                            Swal.fire({
                                icon: 'error',
                                title: 'ເກີດຂໍ້ຜິດພາດ',
                                cancelButtonText: 'close',
                                timer: 2000
                            })
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                })
               
            }
            
            firstProcess()
        } else if (checkCandidate === 1){
            setLoading(false)
            axios.post(url.Mainurl + url.postBil, {
                'bil_number': bil,
                'bil_price': convertAmount,
                'bil_pic': image,
                'candidate_id': id,
            }).then(res => {
                setLoading(true)
                Swal.fire({
                    icon: 'success',
                    title: 'ເພິ່ມບິນສຳເລັດ!',
                    showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ເພິ່ມບິນອີກ',
                        cancelButtonText: 'ອອກ',
                        showCloseButton: true,
                }).then((result) => {
                    if(result.isDismissed) {
                        sessionStorage.removeItem('fullName')
                        sessionStorage.removeItem('Province_id')
                        sessionStorage.removeItem('district_id')
                        sessionStorage.removeItem('village')
                        sessionStorage.removeItem('phone')
                        sessionStorage.removeItem('checkInput')
    
                        return navigate("/")
                    } else if (result.isConfirmed) {
                        if(id === "none") {
                            return navigate(`/add-bil/none`)
                        } else {
                            return navigate(`/add-bil/${id}`)
                        }
                    } else {
                        localStorage.removeItem('fullName')
                        localStorage.removeItem('Province_id')
                        localStorage.removeItem('district_id')
                        localStorage.removeItem('village')
                        localStorage.removeItem('phone')
                        localStorage.removeItem('checkInput')
                    }
                })
            }).catch((err) => {
                setLoading(true)
                if(err.response.status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'ບິນນີ້ຖືກເພິ່ມແລ້ວ',
                        cancelButtonText: 'close',
                        timer: 2000
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ເກີດຂໍ້ຜິດພາດ',
                        cancelButtonText: 'close',
                        timer: 2000
                    })
                }
               
            })
        }
        // setFormValue(formValue)


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
                                    <h3 className="card-title">ເພິ່ມບິນ</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={handleSubmit} method="POST" encType='multipart/form-data'>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ເລກບິນ</label>
                                                    <NumberFormatBase onChange={e => setBil(e.target.value)} minLength={16} maxLength={17} className="form-control" placeholder="Enter bill price" required/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຈຳນວນມູນຄ່າບິນ</label>
                                                    <input type="number" onChange={e => setAmount(e.target.value)} className="form-control" placeholder="Enter bill price" min={10000} required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຊື່ຜູ້ມີສິດສຸ່ມ</label>
                                                    <input value={checkInput ? fullName : ""} className='form-control' disabled />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-success float-right">ເພິ່ມຂໍ້ມູນ</button>
                                        <Link to="/add-candidate" className="btn btn-danger">ຍ້ອນກັບ</Link>
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

export default CreateBil