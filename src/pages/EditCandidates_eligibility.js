import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap'
import { NumberFormatBase } from 'react-number-format';
import axios from "axios";
import url from '../components/API-links/apiurl'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../assets/css/loadingModal.css'

export default function EditCandidates_eligibility(props) {

    const PropsUID = props.id

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formValues, setFormvalues] = useState([])
    const [name, setName] = useState([])
    const [phone, setPhone] = useState([])
    const [village, setVillage] = useState([])
    const [province_id, setProvince_id] = useState([])
    const [district_id, setDistrict_id] = useState([])
    const [district, setDistrict] = useState([])
    const [province, setProvince] = useState([])
    const [loading, setLoading] = useState(1)

    useEffect(() => {
        axios.get(url.Mainurl + url.getCandidateID + PropsUID).then((res) => {
            setFormvalues(res.data)
            setName(res.data.fullName)
            setPhone(res.data.phone)
            setVillage(res.data.village)
            setProvince_id(res.data.province_id)
            setDistrict_id(res.data.district_id)
        })

        axios.get(url.Mainurl + url.getProvince).then((res) => {
            setProvince(res.data)
        })

        axios.get(url.Mainurl + url.getDistrict).then((res) => {
            setDistrict(res.data)
            setLoading(0)
        })

    }, [])

    let navigate = useNavigate()
    
    const UpdateCandidate = (e) => {
        e.preventDefault()
        setLoading(1)
        // const formData = new FormData()
        // formData.append('title',Title)
        // formData.append('description', Description)
        // formData.append('quantity', Quantity)
        Swal.fire({
            title: 'ທ່ານຈະແກ້ໄຂຂໍ້ມູນແທ້ຫລືບໍ່?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ແກ້ໄຂ',
            cancelButtonText: 'ຍົກເລີກ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(url.Mainurl + url.putCandidate + PropsUID, {
                    fullName: name,
                    province_id: province_id,
                    district_id: district_id,
                    village: village,
                    phone: phone
                }).then((res) => {
                    setLoading(0)
                    Swal.fire({
                        icon: 'success',
                        title: 'ແກ້ໄຂສຳເລັດ!',
                        confirmButtonText: 'OK!'
                    }).then((res) => {
                        if(res.isConfirmed) {
                            setShow(false)
                            return navigate("/reloadCandidate")
                        } else if (res.isDismissed) {
                            setShow(false)
                            return navigate("/reloadCandidate")
                        }
                    })
                }).catch(() => {
                    setLoading(0)
                    Swal.fire({
                        icon: 'error',
                        title: 'ເກີດຂໍ້ຜິດພາດ',
                        timer: 2000
                    })
                })
            }
        })
    }

    return (
        <>
            <Button className='btn btn-warning btn-sm' onClick={handleShow}><i class="bi bi-card-checklist"></i> ແກ້ໄຂ</Button>
            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    {loading === 1 ?
                    <div className='position-lodding'>
                    <div class="spinner-border text-light" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div> : "" }
                <Modal.Header closeButton>
                    <Modal.Title><strong>ແກ້ໄຂຂ້ໍມູນຜູ້ມີສິດສຸ່ມ</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method='PUT' onSubmit={UpdateCandidate} encType='multipart/form-data' className='row'>
                        <Form.Group className='col-6'>
                            <Form.Label>ຊື່ ແລະ ນາມສະກຸນ</Form.Label>
                            <input name="fullName" className='form-control' defaultValue={name} onChange={e => setName(e.target.value)} required></input>
                        </Form.Group>

                        <Form.Group className='col-6 mb-3'>
                            <Form.Label>ເບີໂທ</Form.Label>
                            <NumberFormatBase name="phone" className='form-control' defaultValue={phone} onChange={e => setPhone(e.target.value)} required></NumberFormatBase>
                        </Form.Group>

                        <Form.Group className='col-6'>
                            <Form.Label>ບ້ານ</Form.Label>
                            <input name="village" type="text" className='form-control' defaultValue={village} onChange={e => setVillage(e.target.value)} required></input>
                        </Form.Group>

                        <Form.Group className='col-6 mb-3'>
                            <Form.Label>ແຂວງ</Form.Label>
                            <select name="province_id" className="form-control" onChange={e => setProvince_id(e.target.value)} required>
                                <option value={province_id}>{formValues.province?.name}</option>
                                {province.map((items) => 
                                    <option value={items.id}>{items.name}</option>
                                )}
                            </select>
                        </Form.Group>

                        <Form.Group className='col-6 mb-3'>
                            <Form.Label>ເມືອງ</Form.Label>
                            <select name="district_id" className="form-control" onChange={e => setDistrict_id(e.target.value)} required>
                                <option value={district_id}>{formValues.district?.name}</option>
                                {district.filter((items) => items.provinceId == province_id).map((item) => 
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </select>
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="primary" type='submit'>
                                ແກ້ໄຂ
                            </Button>
                            <Button variant="danger" onClick={handleClose}>
                                ປິດ
                            </Button>
                            {/* <Button variant="primary" type='submit'>
                        ແກ້ໄຂ
                    </Button> */}
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}