/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */

import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'
import { NumberFormatBase } from 'react-number-format';
import { useNavigate } from 'react-router-dom'
import '../assets/css/loadingModal.css'

export const EditEventModal = (props) => {
    const token = sessionStorage.getItem('myToken')
    if (!token) {
        window.location = "/login"
    }

    const eventdetail = props.id
    const [Title, setTitle] = useState()
    const [Description, setDescription] = useState('')
    const [start_date, setStartDate] = useState('')
    const [Time, setTime] = useState('')
    const [Image, setImage] = useState('')
    const [sub_title, setSubTitle] = useState('')
    const [end_date, setEndDate] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [preview, setPreview] = useState()
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(1)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get(url.Mainurl + url.getsingleEvent + eventdetail).then((res) => {
            setTitle(res.data.title)
            setDescription(res.data.description)
            setStartDate(res.data.start_date)
            setTime(res.data.time)
            setSubTitle(res.data.sub_title)
            setEndDate(res.data.end_date)
            setPhone(res.data.phone)
            setAddress(res.data.address)
            setLoading(0)
        })
    }, [])

    let navigate = useNavigate()

    const UpdateEvent = (e) => {
        e.preventDefault()
        setLoading(1)
        const formData = new FormData()
        formData.append('title', Title)
        formData.append('description', Description)
        formData.append('image', Image)
        formData.append('start_date', start_date)
        formData.append('end_date', end_date)
        formData.append('phone', phone)
        formData.append('sub_title', sub_title)
        formData.append('address', address)
        formData.append('time', Time)
        Swal.fire({
            title: 'ທ່ານຈະແກ້ໄຂແທ້ຫລືບໍ່?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ແກ້ໄຂ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(url.Mainurl + url.patchEvent + eventdetail, formData).then((res) => {
                    setLoading(0)
                    Swal.fire({
                        icon: 'success',
                        title: 'ແກ້ໄຂສຳເລັດ!',
                        confirmButtonText: 'OK'
                    }).then((res) => {
                        if (res.isConfirmed) {
                            setShow(false)
                            return navigate('/reloadEvent')
                        } else {
                            setShow(false)
                            return navigate('/reloadEvent')
                        }
                    })
                }).catch(() => {
                    setLoading(0)
                    Swal.fire({
                        icon: 'error',
                        title: 'ກະລຸນາລອງໃຫມ່ອີກຄັ້ງ',
                        timer: 2000
                    })
                })
            }
        })
    }

    function imageHandler(e) {
        setImage(e.target.files[0])
        setPreview(e.target.files[0])
      }

    return (

        <><Button variant="primary" onClick={handleShow}>
            <i className="fas fa-edit">ແກ້ໄຂ</i>
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
                    <Modal.Title>ແກ້ໄຂຂໍ້ມູນກິດຈະກຳ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={UpdateEvent} method='PUT' encType='multipart/form-data'>
                        <Form.Group className="mb-3" controlId="eventid">
                            <Form.Label>ຫົວຂໍ້ກິດຈະກຳ</Form.Label>
                            <Form.Control value={Title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="eventid">
                            <Form.Label>ຫົວຂໍ້ຍ່ອຍ</Form.Label>
                            <Form.Control
                                onChange={(e) => setSubTitle(e.target.value)}
                                value={sub_title}
                                type="text"
                                placeholder="Enter Sub Title"
                                autoFocus />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="eventid"
                        >
                            <Form.Label>ລາຍລະອຽດ</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                name='description'
                                onChange={(e) => setDescription(e.target.value)}
                                value={Description} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="eventid">
                            <Form.Label>ເລືອກຣູບພາບ</Form.Label>
                            <div>

                                <Form.Control type='file' accept='image/*' onChange={imageHandler}></Form.Control>
                                {/* <p>{Image}</p> */}
                            </div>
                        </Form.Group>
                        {preview ? <div className="input-group mt-3">
                    <p>Preview Image</p>
                    </div> : ""}
                   <div className="input-group mt-1">
                    
                    {preview === null}
                   {preview && (
                        <img className='float-left' style={{maxWidth: 150+'px'}} src={URL.createObjectURL(preview)} alt={Image}/>
                        )}
                   
                   </div>
                        <Form.Group className="mb-3" controlId="eventid">
                            <Form.Label>ວັນເລີ່ມກິດຈະກຳ</Form.Label>
                            <Form.Control
                                onChange={(e) => setStartDate(e.target.value)}
                                value={start_date}
                                type="date"
                                placeholder="dd-mm-yy"
                                autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="eventid">
                            <Form.Label>ວັນສິ້ນສຸດກິດຈະກຳ</Form.Label>
                            <Form.Control
                                onChange={(e) => setEndDate(e.target.value)}
                                value={end_date}
                                type="date"
                                placeholder="dd-mm-yy"
                                autoFocus />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="eventid">
                            <Form.Label>ເວລາເລີ່ມກິດຈະກຳ</Form.Label>
                            <Form.Control
                                onChange={(e) => setTime(e.target.value)}
                                value={Time}
                                type="time"
                                placeholder="Time"
                                autoFocus />
                        </Form.Group> */}
                        <Form.Group className="mb-3" controlId="eventid">
                            <Form.Label>ສະຖານທີ່ຈັດກິດຈະກຳ</Form.Label>
                            <Form.Control
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                type="text"
                                placeholder="Address"
                                autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="eventid">
                            <Form.Label>ເບີຕິດຕໍ່</Form.Label>
                            <NumberFormatBase
                            className='form-control'
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                type="text"
                                placeholder="Phone number"
                                autoFocus />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>
                                ປິດ
                            </Button>
                            <Button variant="primary" type='submit'>
                                ແກ້ໄຂ
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal></>
    )
}

export default EditEventModal