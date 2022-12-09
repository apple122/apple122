import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import EditUserModal from './EditUserModal'
import url from '../components/API-links/apiurl'
import Spinner from '../components/uitilities/Spinner'
import LoadingSpin from 'react-loading-spin'

const Users = () => {
    const token = sessionStorage.getItem('myToken')
    if (!token) {
        window.location = "/login"
    }
    const [userList, setuserList] = useState([])
    const [ShowModal, setShowModal] = useState(false)
    const [countPage, setCountPage] = useState([])
    const [filterText, setFilterText] = useState("")
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadingSpin, setLoadingSpin] = useState(0)
    const inputRef = useRef(null)
    let totalPage = countPage - 1

    const showuseList = () => {
        axios.get(url.Mainurl + url.getUser).then((res) => {
            // console.log(res.data.lists)
            setuserList(res.data.lists.reverse())
            setCountPage(res.data.totalPages)
            setLoading(true)
        }).catch((err) => {
            console.log(err)
        })
    }


    const deleteUser = (id) => {
        Swal.fire({
            title: 'ທ່ານຈະລົບຂໍ້ມູນແທ້ຫລືບໍ່?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ລົບ',
            cancelButtonText: 'ຍົກເລີກ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url.Mainurl + url.deleteUser + id).then(() => {
                    setuserList(userList.filter((val) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'ລົບຂໍ້ມູນແລ້ວ!',
                        })
                        return val.id !== id
                    }))
                }).catch(() => {
                    alert('ເກີດຂໍ້ຜິດພາດ')
                })
            }
        })
    }

    useEffect(() => {
        showuseList();
    }, [])

    function search(event) {
        setLoadingSpin(1)
        setFilterText(event.target.value)
        axios.get(url.Mainurl + url.getUser + `?username=${filterText}`).then((res) => {
            setLoadingSpin(0)
            setuserList(res.data.lists)
        })
    }

    function Next() {
        setLoadingSpin(1)
        setCurrentPage(currentPage + 1)
        axios.get(url.Mainurl + url.getUser + `?page=${currentPage + 1}`).then((res) => {
            setLoadingSpin(0)
            setuserList(res.data.lists)
        })
    }

    function Back() {
        setLoadingSpin(1)
        setCurrentPage(currentPage - 1)
        axios.get(url.Mainurl + url.getUser + `?page=${currentPage - 1}`).then((res) => {
            setLoadingSpin(0)
            setuserList(res.data.lists)
        })
    }

    function reset() {
        setLoadingSpin(1)
        inputRef.current.value = "";
        axios.get(url.Mainurl + url.getUser).then((res) => {
            setLoadingSpin(0)
            setuserList(res.data.lists)
            setCountPage(res.data.totalPages)
            setCurrentPage(0)

        })
    }

    return (
        <div>
            {loading === true ? <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <Link to="/add-user" className="card-title btn btn-success float-right">ເພິ່ມຜູ້ໃຊ້</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                    <h3 className="card-title">ຜູ້ໃຊ້ລະບົບທັງຫມົດ ( <strong className='text-danger'>{userList.length}</strong> )</h3>
                                        <div className="card-tools">
                                            <div className="input-group input-group-sm" style={{ width: 500 }}>
                                                <input ref={inputRef} onChange={search} type="text" name="table_search" className="form-control float-right" placeholder="ຄົ້ນຫາດ້ວຍ Username..." />
                                                <div className="input-group-append">
                                                    <button onClick={reset} type="submit" className="btn btn-default">
                                                        Reset
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body table-responsive p-0">
                                    {loadingSpin === 0 ?
                                        <table className="table table-hover text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>ຊື່ ແລະ ນາມສະກຸນ</th>
                                                    <th>ເບີໂທ</th>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th className='text-center'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {userList.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.id}</td>
                                                        <td>{item.fullname}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.username}</td>
                                                        <td>{item.email}</td>
                                                        <td class="text-center py-0 align-middle">
                                                            <div class="btn-group btn-group-sm">
                                                                {/* <EditUserModal id={item.id} ShowModal={ShowModal} setShowModal={setShowModal}></EditUserModal> */}
                                                                <Link to={`/editUser/${item.id}`} variant='primary' className='btn btn-primary'>
                                                                    <i className='fas fa-edit'>ແກ້ໄຂ</i>
                                                                </Link>
                                                                <button class="btn btn-danger ms-1" onClick={() => deleteUser(item.id)} ><i class="fas fa-trash"></i></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                        : <div className='text-center my-5'><LoadingSpin primaryColor={"black"} size={50} /></div>}
                                        <div className='customPagination d-flex py-2'>
                                            <button onClick={Back} className={`mx-2 px-2 btn btn-primary`} disabled={currentPage === 0 ? true : false}>back</button>
                                            <span className='mt-2'>{currentPage + 1}</span>
                                            <button onClick={Next} className={`mx-2 px-2 btn btn-primary`} disabled={currentPage === totalPage ? true : false}>next</button>
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                        </div>

                    </div>
                </div>
            </div> : <Spinner />}
        </div>
    )
}

export default Users