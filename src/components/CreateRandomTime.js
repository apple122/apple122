import React, { useState } from "react";
import {Modal, Button,Form} from 'react-bootstrap'
import axios from "axios";
import url from '../components/API-links/apiurl'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateRandomTime = () => {
    const [time, setTime] = useState()
    const [date, setDate] = useState()
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(0)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let navigate = useNavigate()

    const CreateTime = (e) => {
        e.preventDefault()
        setLoading(1)
            axios.post(url.Mainurl + url.postDrawDate, {
                date: date,
                time: time
            }).then((res) => {
                setLoading(0)
                Swal.fire({
                    icon: 'success',
                    title: 'ຕັ້ງເວລາສຳເລັດ!',
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
                    title: 'something went wrong',
                    cancelButtonText: 'close'
                })
            })

    }
    return(
        <>
        <Button variant='primary' onClick={handleShow} className="card-title btn btn-success float-right">
            ເພີມຂໍ້ມູນ
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
                <Modal.Title>ເພີມຂໍ້ມູນ ວັນທີ່ເວລາເລີມສຸ່ມ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={CreateTime} method='POST' encType='multipart/form-data'>
                    <div className="row">
                       <div className="col-md-6">
                            <Form.Group controlId='prizeid'>
                                <Form.Label>ວັນທີ່/ເດືອນ/ປີ ເລີມສຸ່ມ</Form.Label>
                                <Form.Control type="date" name='title' placeholder="ວັນທີ່ ເລີມສຸ່ມ" onChange={(e) => setDate(e.target.value)} required={true}></Form.Control>
                            </Form.Group>&nbsp;
                       </div>
                       
                       <div className="col-md-6">
                            <Form.Group controlId='prizeid'>
                                <Form.Label>ເວລາ ເລີມສຸ່ມ</Form.Label>
                                <Form.Control type="time" name='title' placeholder="ເວລາ ເລີມສຸ່ມ" onChange={(e) => setTime(e.target.value)} required={true}></Form.Control>
                            </Form.Group>
                       </div>
                    </div>
                    <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        ປິດ
                    </Button>
                    <Button variant="primary" type='submit'>
                        ບັນທືກ
                    </Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default CreateRandomTime