import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'
import { useNavigate } from 'react-router-dom';
import '../assets/css/loadingModal.css'

function EditProvinceModal(props) {
    const token = sessionStorage.getItem('myToken')
    if (!token) {
        window.location = "/login"
    }
    const provinceId = props.id
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Quantity, setQuantity] = useState('')
    const [province, setProvince] = useState([])
    const [formvalues, setformValues] = useState({})
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(1)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
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
    
    const UpdateProvince = (e) => {
        e.preventDefault()
        setLoading(1)
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
                axios.put(url.Mainurl + url.putProvince + provinceId, formvalues).then((res) => {
                    setLoading(0)
                    Swal.fire({
                        icon: 'success',
                        title: 'ແກ້ໄຂສຳເລັດ!',
                        confirmButtonText: 'OK!'
                    }).then((res) => {
                        if(res.isConfirmed) {
                            setShow(false)
                            return navigate("/reloadProvince")
                        } else if (res.isDismissed) {
                            setShow(false)
                            return navigate("/reloadProvince")
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
                <i className='fas fa-edit'>ແກ້ໄຂແຂວງ</i>
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
                    <Modal.Title>ແກ້ໄຂຂໍ້ມູນແຂວງ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={UpdateProvince} method='PUT' encType='multipart/form-data'>
                        <Form.Group controlId='prizeid'>
                            <Form.Label>ຊື່ແຂວງ</Form.Label>
                            <Form.Control name='name' defaultValue={province.filter((e) => e.id === provinceId).map((e) => e.name)} onChange={handleChange} type='text' placeholder={Title}></Form.Control>
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

export default EditProvinceModal