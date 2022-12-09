import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'
import District from './District';
import { Select } from 'react-select';
import Province from './Province';
import { useNavigate } from 'react-router-dom'
import '../assets/css/loadingModal.css'

function EditDistrictModal(props) {
    const DistrictID = props.id
    const ProvinceID = props.province_id
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Quantity, setQuantity] = useState('')
    const [district, setDistrict] = useState([])
    const [province, setProvince] = useState([])
    const [formvalues, setformValues] = useState({})
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(1)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const token = sessionStorage.getItem('myToken')
    if (!token) {
        window.location = "/login"
    }

    useEffect(() => {
        axios.get(url.Mainurl + url.getDistrict).then((res) => {
            setDistrict(res.data)
        })

        axios.get(url.Mainurl + url.getProvince).then((res) => {
            setProvince(res.data)
            setLoading(0)
        })

    }, [])

    let navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValues({ ...formvalues, [name]: value })
    }

    const updateDistrict = (e) => {
        e.preventDefault()
        setLoading(1)
        // const formData = new FormData()
        // formData.append('title',Title)
        // formData.append('description', Description)
        // formData.append('quantity', Quantity)
        Swal.fire({
            title: 'ທ່ານຈະແກ້ໄຂແທ້ຫລືບໍ່?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ແກ້ໄຂ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(url.Mainurl + url.putDistrict + DistrictID, formvalues).then((res) => {
                    setLoading(0)
                    Swal.fire({
                        icon: 'success',
                        title: 'ແກ້ໄຂສຳເລັດ!',
                        confirmButtonText: 'OK',
                        timer: 2000
                    }).then((res) => {
                        if(res.isConfirmed) {
                            setShow(false)
                            return navigate('/reloadDistrict')
                        } else {
                            setShow(false)
                            return navigate('/reloadDistrict')
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
        <div>
           <Button variant='primary' className='ms-1' onClick={handleShow}>
                <i className='fas fa-edit'>ແກ້ໄຂເມືອງ</i>
            </Button>
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
                    <Modal.Title>ແກ້ໄຂຂໍ້ມູນເມືອງ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={updateDistrict} method='PUT' encType='multipart/form-data'>
                    <Form.Group controlId='prizeid'>
                            
                            <Form.Label>ເລືອກແຂວງ</Form.Label>
                            <select onChange={handleChange} name='provinceId' className='form-control'>
                                <option value={ProvinceID}>{province.filter((e) => e.id === ProvinceID).map((e) => e.name)} </option>
                                {province.map((e) => 
                                 <option value={e.id}>{e.name}</option>
                                )}
                            </select>
                        </Form.Group>
                   
                        <Form.Group controlId='prizeid'>
                            
                            <Form.Label>ຊື່ເມືອງ</Form.Label>
                            <Form.Control name='name' defaultValue={district.filter((e) => e.id === DistrictID).map((e) => e.name)} onChange={handleChange} type='text' placeholder={Title}></Form.Control>
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
        </div>
    )
}

export default EditDistrictModal