import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import url from './API-links/apiurl'
import Swal from 'sweetalert2'
import { NumberFormatBase } from 'react-number-format'
import { useNavigate } from 'react-router-dom'
import { get } from 'react-hook-form'
import { FormGroup } from 'react-bootstrap'
import LoadingSpin from "react-loading-spin";

const CreateCandidate = () => {
    const [candidate, setCandidate] = useState([])
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [village, setVillage] = useState("")
    const [inputDistrict, getDistrict] = useState()
    const [inputProvince, getProvince] = useState()
    const [checkPhoneNumber, setCheckPhoneNumber] = useState(false)
    let DistrictId = parseInt(inputDistrict)
    let ProvinceId = parseInt(inputProvince)
    const [msg, setMsg] = useState("")
    const [click, setClick] = useState(0)
    const [id, setId] = useState()
    const [enableNext, setEnableNext] = useState(0)
    const [loading, setLoading] = useState(0)

    useEffect(() => {
        const getData1 = async () => {
            const data = await axios.get(url.Mainurl + url.getDistrict).then((res) => {
                setDistrict(res.data)
            })
        }

        const getData2 = async () => {
            const data = await axios.get(url.Mainurl + url.getProvince).then((res) => {
                setProvince(res.data)
            })

        }
        getData1()
        getData2()
    }, [])

    let navigate = useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault()
        // setFormValue(formValue)
        sessionStorage.setItem('fullName', name)
        sessionStorage.setItem('Province_id', ProvinceId)
        sessionStorage.setItem('district_id', DistrictId)
        sessionStorage.setItem('village', village)
        sessionStorage.setItem('phone', phone)
        sessionStorage.setItem('checkInput', 1)

        return navigate(`/add-bil/${id == undefined ? "none" : id}`)
    }

    function clearData() {
        sessionStorage.removeItem('fullName')
        sessionStorage.removeItem('province_id')
        sessionStorage.removeItem('district_id')
        sessionStorage.removeItem('village')
        sessionStorage.removeItem('phone')
        sessionStorage.removeItem('checkInput')
    }

    function checkCandidate() {
        setClick(1)
        if (phone.length === 11) {
            setLoading(1)

            axios.get(url.Mainurl + url.getCandidate + `?phone=${phone}`).then(res => {
                setLoading(0)
                setCandidate(res.data.lists)
                setId(res.data.lists[0].id)
                setName(res.data.lists[0].fullName)
                setVillage(res.data.lists[0].village)
                getProvince(res.data.lists[0].province.id)
                getDistrict(res.data.lists[0].district.id)
                setMsg("ເບີນີ້ຖືກເພິ່ມເຂົ້າໃນລະບົບແລ້ວ")
                setEnableNext(1)
            })

        }

        if (phone.length === 11 && candidate.length === 0) {
            setMsg("ເບີນີ້ຍັງບໍ່ຖືກເພິ່ມເຂົ້າໃນລະບົບ")
            setEnableNext(1)
        }
    }

    function reset() {
        setId(null)
        setName("")
        setVillage("")
        setPhone("")
        setMsg("")
        getProvince()
        getDistrict()
        setEnableNext(0)
        setClick(0)
        clearData()
    }

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">ເພິ່ມຂໍ້ມູນຜູ້ມີສິດສຸ່ມ</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={handleSubmit} method="POST" encType='multipart/form-data'>
                                    <div className="card-body">

                                        <div className="row">

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>ເບີໂທ</label>

                                                    <div className='input-group'>
                                                        <NumberFormatBase onChange={e => setPhone(e.target.value)} value={phone} className="form-control" min={0} maxLength={11} placeholder="ກະລຸນາປ້ອນເບີໃຫ້ຄົບ 11 ໂຕ ຕົວຢ່າງ 020xxx..." required />
                                                        {phone.length === 11 && click === 0 ? loading === 0 ? <button type='button' className='btn btn-success input-group-text ms-3' onClick={checkCandidate}>ກວດສອບເບີໂທ</button> : <LoadingSpin size={40} /> : ""}
                                                        {click === 1 ? <button type='button' className='btn btn-warning input-group-text ms-3' onClick={reset}>Reset</button> : ""}
                                                        {click === 0 && candidate.length === 0 && phone.length === 11 ? <p className='input-group-text ms-3'>ກະລຸນາກວດສອບເບີໂທກ່ອນ</p> : ""}
                                                        {phone.length === 11 ? candidate.length === 1 ? <p className='input-group-text ms-3'>{msg}</p> : <p className='input-group-text ms-3'>{msg}</p> : ""}
                                                        { }
                                                    </div>
                                                    {/* <p>{candidate.filter(e => e.phone == phone).map(e => <p className='text-danger'>ເບີ {phone} ມີຄົນໃຊ້ໄປແລ້ວ</p>)}</p> */}
                                                </div>
                                            </div>
                                            <div className='col-md-6'>



                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຊື່ ແລະ ນາມສະກຸນ</label>
                                                    <input onChange={e => setName(e.target.value)} defaultValue={name} type="text" className="form-control" name='name' placeholder="Enter Name" required />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ບ້ານ</label>
                                                    <input onChange={e => setVillage(e.target.value)} defaultValue={village} type="text" className="form-control" placeholder="Enter Village" required />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ແຂວງ</label>
                                                    <select className="form-control form-select" name='province_id' onChange={e => getProvince(e.target.value)} required>
                                                    {<option value={inputProvince}>{inputProvince != null ? province.filter(a => a.id == inputProvince).map((e) => e.name) : "--ກະລຸນາເລືອກແຂວງ--"}</option>}

                                                        {province.map((e) =>
                                                            <option key={e.id} value={e.id}>{e.name}</option>
                                                        )}
                                                    </select>
                                                    {/* <input type="text" className="form-control" placeholder="Enter Province" /> */}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ເມືອງ</label>
                                                    <select className="form-control form-select" name='district_id' onChange={e => getDistrict(e.target.value)} required>
                                                        {<option value={inputDistrict}>{inputDistrict != null ? district.filter(a => a.id == inputDistrict).map((e) => e.name) : "--ກະລຸນາເລືອກເມືອງ--"}</option>}
                                                        {district.filter((e) => e.provinceId === ProvinceId).map((e) =>
                                                            <option key={e.id} value={e.id}>{e.name}</option>
                                                        )}
                                                    </select>
                                                    {/* <input type="text" className="form-control" placeholder="Enter District" /> */}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <Link onClick={clearData} to={`/`} className="btn btn-danger">Cancel</Link>
                                        <button type="submit" className="btn btn-success float-right" disabled={enableNext === 0 ? true : false}>ຕໍ່ໄປ</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateCandidate