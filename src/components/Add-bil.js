import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios';
import url from './API-links/apiurl'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { NumberFormatBase } from 'react-number-format';
import '../assets/css/loadingModal.css'

function Add_bil(props) {

    const PropsUID = props.id

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formvalues, setformValues] = useState({})
    const [candidate, setCandidate] = useState([])
    const [image, setImage] = useState()
    const [bil_number, setBil_number] = useState()
    const [bil_price, setBil_price] = useState()
    const [loading, setLoading] = useState(1)

    let navigate = useNavigate()

    useEffect(() => {
        axios.get(url.Mainurl + url.getCandidateID + PropsUID).then((res) => {
            setCandidate(res.data)
            setLoading(0)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const addBil = (e) => {
        e.preventDefault()
        // const formData = new FormData()
        // formData.append('title',Title)
        // formData.append('description', Description)
        // formData.append('quantity', Quantity)
                setLoading(1)
                axios.post(url.Mainurl + url.postBil, {
                    bil_number: bil_number,
                    bil_price: bil_price,
                    bil_pic: image,
                    candidate_id: candidate.id
                }).then((res) => {
                    setLoading(0)
                    Swal.fire({
                        icon: 'success',
                        title: 'ເພິ່ມບິນສຳເລັດ!',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ເພິ່ມບິນອີກ',
                        cancelButtonText: 'ອອກ',
                        showCloseButton: true,
                    }).then((res) => {
                        if (res.isConfirmed) {
                        } else if (res.isDismissed) {
                            setShow(false)
                            return navigate("/reloadCandidate")
                        } else {
                            setShow(false)
                            return navigate("/reloadCandidate")
                        }
                    })
                }).catch((error) => {
                    setLoading(0)
                    if (error.response.status == 400) {
                        Swal.fire({
                            icon: 'error',
                            title: 'ເລກບິນນີ້ຖືກເພິ່ມເຂົ້າໃນລະບົບແລ້ວ',
                            timer: 2000
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'ເກີດຂໍ້ຜິດພາດ',
                            timer: 2000
                        })
                    }
                   
                })
    }

    return (
        <>
            <Button variant='primary' className='btn btn-sm' onClick={handleShow}>
                {/* <i className='fas fa-edit'>ເພິ່ມບິນ</i> */}ເພິ່ມບິນ
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
                    <Modal.Title>ເພິ່ມບິນ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={addBil} method='POST' encType='multipart/form-data' className='row'>
                        <Form.Group className='col-6'>
                            <Form.Label>ເລກບິນ</Form.Label>
                            <NumberFormatBase name="bil_number" className='form-control' placeholder='ກະລຸນາປ້ອນເລກບິນ' minLength={16} maxLength={17} onChange={(e) => setBil_number(e.target.value)} required></NumberFormatBase>
                        </Form.Group>
                        <Form.Group className='col-6 mb-3'>
                            <Form.Label>ມູນຄ່າບິນ</Form.Label>
                            <input type="number" name="bil_price" className='form-control' placeholder='ກະລຸນາປ້ອນມູນຄ່າບິນ' min={10000} onChange={(e) => setBil_price(e.target.value)} required></input>
                        </Form.Group>
                        <Form.Group className='col-6 mb-3'>
                            <Form.Label>ຊື່ຜູ້ມີສິດສຸ່ມ</Form.Label>
                            <input className='form-control' value={candidate.fullName} disabled={true}></input>
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="primary" type='submit'>
                                ເພິມບິນ
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

export default Add_bil