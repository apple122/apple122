/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react'
import {Modal, Button,Form} from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'
import { useNavigate } from 'react-router-dom'
import '../assets/css/loadingModal.css'

export const EditPrizeModal = (props) => {
    const token = sessionStorage.getItem('myToken')
    if(!token) {
      window.location = "/login"
    }
    const prizeDetail = props.id
    const [Title, setTitle]= useState()
    const [Description, setDescription]= useState()
    const [Quantity, setQuantity]= useState()
    const [formvalues, setformValues]= useState({})
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(1)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get(url.Mainurl + url.getSinglePrize + prizeDetail).then((res) => {
           setTitle(res.data.title)
           setDescription(res.data.description)
           setQuantity(res.data.quantity)
           setLoading(0)
        })
        
    },[])

    let navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target;
        setformValues({...formvalues, [name]: value })
        
    }

    const UpdatePrize = (e) => {
        e.preventDefault()
        setLoading(1)
        const formData = new FormData()
        formData.append('title',Title)
        formData.append('description', Description)
        formData.append('quantity', Quantity)
        Swal.fire({
            title: 'ທ່ານຈະແກ້ໄຂຂໍ້ມູນແທ້ ຫລືບໍ່?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ແກ້ໄຂ',
            cancelButtonText: 'ຍົກເລີກ',
          }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(url.Mainurl + url.updatePrize + prizeDetail, formvalues).then((res) => {
                    setLoading(0)
                    Swal.fire({
                        icon: 'success',
                        title: 'ແກ້ໄຂສຳເລັດ!',
                        confirmButtonText: 'OK'
                    }).then((res) => {
                        if(res.isConfirmed) {
                            setShow(false)
                            return navigate('/reloadPrize')
                        } else {
                            setShow(false)
                            return navigate('/reloadPrize')
                        }
                    })
                }).catch(() => {
                    setLoading(0)
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        timer: 2000
                    })
                })
            }
          })
       
        
    }

    return(
        <>
        <Button variant='primary' onClick={handleShow}>
            <i className='fas fa-edit'>ແກ້ໄຂ</i>
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
                <Modal.Title>ແກ້ໄຂລາງວັນ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={UpdatePrize} method='PUT' encType='multipart/form-data'>
                    <Form.Group controlId='prizeid'>
                        <Form.Label>ຊື່ລາງວັນ</Form.Label>
                        <Form.Control name='title' defaultValue={Title} onChange={handleChange} type='text' placeholder="ປ້ອນຊື່ລາງວັນ"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='prizeid'>
                        <Form.Label>ມູນຄ່າລາງວັນ</Form.Label>
                        <Form.Control name='description' defaultValue={Description} onChange={handleChange} type='text' placeholder="ປ້ອນລາຄາ"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='prizeid'>
                        <Form.Label>ຈຳນວນ</Form.Label>
                        <Form.Control name='quantity' defaultValue={Quantity} onChange={handleChange} type='text' placeholder="ຈຳນວນ"></Form.Control>
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
        </Modal>
        </>
    )
}

export default EditPrizeModal