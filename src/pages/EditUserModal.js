/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react'
import {Modal, Button,Form} from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'
import { useNavigate, useParams } from 'react-router-dom'
import '../assets/css/loadingModal.css'

export const EditUserModal = (props) => {
    const userID = useParams()
    const user_name = props.username
    // console.log(userDetail)
    // console.log(totalPage)
    const token = sessionStorage.getItem('myToken')
    if(!token) {
      window.location = "/login"
    }

    const User = ["ROLE_USER"];
    const Employee = ["ROLE_EMPLOYEE"];
    const Admin = ["ROLE_ADMIN"];
    const [formValue, setformValue]= useState([])
    const [formValues, setformValues]= useState({})
    const [loading, setLoading] = useState(1)


    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false)
        return navigate('/user')
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get(url.Mainurl + url.getSingleUser + userID.id).then((res) => {
            setformValue(res.data)
            setLoading(0)
      })
    },[])
    let navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value}= e.target
        setformValues({...formValues, [name]: value})
    }
    
    const UpdateUser = (e) => {
        e.preventDefault()
        setLoading(1)
        Swal.fire({
            title: 'ທ່ານຈະແກ້ໄຂຂໍ້ມູນແທ້ບໍ່?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ແກ້ໄຂ'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.put(url.Mainurl + url.updateUser + userID.id, formValues).then((res) => {
                    // console.log(res)
                    setLoading(0)
                    Swal.fire({
                        icon: 'success',
                        title: 'ແກ້ໄຂສຳເລັດ!!',
                        confirmButtonText: 'OK!'
                    }).then((res) => {
                        if(res.isConfirmed) {
                            setShow(false)
                            return navigate("/reloadUser")
                        } else if (res.isDismissed) {
                            setShow(false)
                            return navigate("/reloadUser")
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
                <Modal.Title>ແກ້ໄຂຂໍ້ມູນ User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={UpdateUser} method='PUT'>
                <Form.Group>
                        <Form.Label>ຊື່ ແລະ ນາມສະກຸນ</Form.Label>
                        <Form.Control name='fullname' defaultValue={formValue.fullname} onChange={handleChange} type='text' required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>ເບີຕິດຕໍ່</Form.Label>
                        <Form.Control name='phone' defaultValue={formValue.phone} onChange={handleChange} type='number' required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control ame='username' defaultValue={formValue.username} onChange={handleChange} type='text' required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' defaultValue={formValue.email} onChange={handleChange} type='email' required></Form.Control>
                    </Form.Group>
                    {/* <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control defaultValue={formValue.filter((item) => item.id === userDetail).map((e) => e.password)} name='password' onChange={handleChange} type='password'></Form.Control>
                    </Form.Group> */}
                    <div>
                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Select className='col-md p-2 form-select' onChange={handleChange} required>
                            <option selected value={Admin}>{Admin}</option>
                            <option value={formValues.User}>{User}</option>
                            <option value={formValues.Employee}>{Employee}</option>
                            <option value={formValues.Admin}>{Admin}</option>
                        </Form.Select>
                    </Form.Group>
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

export default EditUserModal