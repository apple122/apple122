import React, { useState, useEffect } from "react";
import {Modal, Button,Form} from 'react-bootstrap'
import Swal from "sweetalert2";
import axios from "axios";
import url from '../components/API-links/apiurl'
import { useNavigate } from "react-router-dom";

const EditRandomTime = (props) => {
    const id = props.id
    const [date, setDate] = useState([])
    const [time, setTime] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(0);

    let navigate = useNavigate()

    useEffect(() => {
        axios.get(url.Mainurl + url.getDrawDateID + id).then((res) => {
            setDate(res.data.date)
            setTime(res.data.time)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const UpdateTime = (e) => {
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
                axios.patch(url.Mainurl + url.patchDrawDate + id, {
                    date: date,
                    time: time
                }).then((res) => {
                    setLoading(0)
                    Swal.fire({
                        icon: 'success',
                        title: 'ແກ້ໄຂສຳເລັດ!',
                        confirmButtonText: 'OK!'
                    }).then((res) => {
                        if(res.isConfirmed) {
                            setShow(false)
                            return navigate("/reloadSettime")
                        } else {
                            setShow(false)
                            return navigate("/reloadSettime")
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



    return(
        <>
        <Button variant='primary' onClick={handleShow} className="btn-sm">
            <i className='fas fa-edit'></i>
        </Button>&nbsp;
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
                <Modal.Title>ແກ້ໄຂຂໍ້ມູນ ວັນທີ່ເວລາເລີມສຸ່ມ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={UpdateTime} method='PUT' encType='multipart/form-data'>
                    <div className="row">
                       <div className="col-md-6">
                            <Form.Group controlId='prizeid'>
                                <Form.Label>ວັນທີ່ ເລີມສຸ່ມ</Form.Label>
                                <Form.Control type="date" name='title' value={date} onChange={(e) => setDate(e.target.value)}></Form.Control>
                            </Form.Group>&nbsp;
                       </div>
                       
                       <div className="col-md-6">
                            <Form.Group controlId='prizeid'>
                                <Form.Label>ເວລາ ເລີມສຸ່ມ</Form.Label>
                                <Form.Control type="time" name='title' value={time} onChange={(e) => setTime(e.target.value)}></Form.Control>
                            </Form.Group>
                       </div>
                    </div>
                    <Modal.Footer>
                    <Button variant="primary" type='submit'>
                        ແກ້ໄຂ
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        ປິດ
                    </Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default EditRandomTime