import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import url from '../components/API-links/apiurl'
import Spinner from '../components/uitilities/Spinner'
import '../assets/css/customPagination.css'
import LoadingSpin from 'react-loading-spin'
import { NumbericFormat, NumberFormatBase } from 'react-number-format';

const Candidates = () => {
    const token = sessionStorage.getItem('myToken')
    const [loading, setLoading] = useState(false)
    if(!token) {
      window.location = "/login"
    }
    const [showCandidates, setshowCandidates] = useState([])
    const [amountOfBil, setAmountOfBil] = useState()
    const [countPage, setCountPage] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [loadingSpin, setLoadingSpin] = useState(0)
    const [filterNumber, setFilterNumber] = useState("")
    const [filterVillage, setFilterVillage] = useState("")
    let totalPage = countPage-1
    let data = showCandidates
    useEffect(() => {
        Candidateslist()
    },[])
    
    const Candidateslist = async() => {
        await axios.get(url.Mainurl + url.getBil).then((res) => {
            setCountPage(res.data.totalPages-1)
            setCurrentPage(res.data.totalPages-1)
            setAmountOfBil(res.data.totalItems)
            setLoading(true)
            let page = res.data.totalPages
            axios.get(url.Mainurl + url.getBil+`?page=${page-1}`).then((res) => {
                setshowCandidates(res.data.lists)
                setLoading(true)
            })
        })
        
    }

    function search(event) {
        setLoadingSpin(1)
        setFilterNumber(event.target.value)
        axios.get(url.Mainurl + url.getBil+`?bil_number=${filterNumber}`).then((res) => {
            setLoadingSpin(0)
            setshowCandidates(res.data.lists)
        })
    }

    function Next() {
        setCurrentPage(currentPage+1)
        axios.get(url.Mainurl + url.getBil+`?page=${currentPage+1}`).then((res) => {
            setshowCandidates(res.data.lists)
        })
    }

    function Back() {
        setCurrentPage(currentPage-1)
        axios.get(url.Mainurl + url.getBil+`?page=${currentPage-1}`).then((res) => {
            setshowCandidates(res.data.lists)
        })
    }

    function reset() {
        setLoadingSpin(1)
        setFilterNumber("")
        setFilterVillage("")
        axios.get(url.Mainurl + url.getBil).then((res) => {
            setCountPage(res.data.totalPages-1)
            setCurrentPage(res.data.totalPages-1)
            let page = res.data.totalPages
            axios.get(url.Mainurl + url.getBil+`?page=${page-1}`).then((res) => {
                setLoadingSpin(0)
                setshowCandidates(res.data.lists)
            })
        })
    }

    function Next() {
        setLoadingSpin(1)
        setCurrentPage(currentPage + 1)
        axios.get(url.Mainurl + url.getBil + `?page=${currentPage + 1}`).then((res) => {
            setLoadingSpin(0)
            setshowCandidates(res.data.lists)
        })
    }

    function Back() {
        setLoadingSpin(1)
        setCurrentPage(currentPage - 1)
        axios.get(url.Mainurl + url.getBil + `?page=${currentPage - 1}`).then((res) => {
            setLoadingSpin(0)
            setshowCandidates(res.data.lists)
        })
    }

    function FirstPage() {
        setLoadingSpin(1)
        setCurrentPage(0)
        axios.get(url.Mainurl + url.getBil + `?page=${0}`).then((res) => {
            setLoadingSpin(0)
            setshowCandidates(res.data.lists)
        })
    }

    function LastPage() {
        setLoadingSpin(1)
        setCurrentPage(countPage)
        axios.get(url.Mainurl + url.getBil + `?page=${countPage}`).then((res) => {
            setLoadingSpin(0)
            setshowCandidates(res.data.lists)
        })
    }

    function searchVillge(event) {
        setFilterVillage(event.target.value)
    }

    return (
        <div>
        {loading === true ?  <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <Link to="/add-candidate" className="card-title btn btn-success float-right">ເພິ່ມຜູ້ມີສິດສຸ່ມ</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                            <div className="card-header">
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <h3 className="card-title">ລາຍຊື່ແລະບິນຂອງຜູ້ມີສິດສຸ່ມ ( <strong className='text-danger'>{amountOfBil}</strong> )</h3>
                                            </div>
                                            <div className="col-md-4 form-group input-group-sm">
                                                <NumberFormatBase type='search' value={filterNumber} onChange={search} min={0} name="table_search" className="form-control text" placeholder="ຄົ້ນຫາດ້ວຍເລກບິນ..." />
                                            </div>
                                            <div className="col-md-4 form-group input-group-sm">
                                                <div className='input-group input-group-sm'>
                                                    <input onChange={searchVillge} min={0} value={filterVillage} type="search" name="table_search" className="form-control text village" placeholder="ຄົ້ນຫາດ້ວຍຊື່ບ້ານ..." />
                                                    <button type="submit" onClick={reset} className="btn btn-default btn-outline-dark input-group-text ml-2">Reset</button>
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
                                                <th>ເລກບິນ</th>
                                                <th>ມູນຄ່າໃບບິນ</th>
                                                <th>ເບີຕິດຕໍ່</th>
                                                <th>ບ້ານ</th>
                                                <th>ເມືອງ</th>
                                                <th>ແຂວງ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {showCandidates.filter((e) => e.candidate.village.toLowerCase().includes(filterVillage)).map((item,index) => (
                                                 <tr key={index}>
                                                 <td valign='center'>{item.id}</td>
                                                 <td>{item.candidate.fullName}</td>
                                                 <td>{item.bil_number}</td>
                                                 <td>{parseInt(item?.bil_price).toLocaleString()} ກີບ</td>
                                                 <td>{item.candidate.phone}</td>
                                                 <td>{item.candidate.village}</td>
                                                 <td>{item.candidate.district.name}</td>
                                                 <td>{item.candidate.province.name}</td>
                                             </tr>
                                            ))}
                                           
                                        </tbody> 
                                        
                                    </table> 
                                    : <div className='text-center my-5'><LoadingSpin primaryColor={"black"} size={50} /></div>}
                                     {showCandidates.length === 0 ? <h1 className='text-center my-3'>ບໍ່ມີຂໍ້ມູນ</h1> : ""}
                                    <div className='customPagination d-flex py-2'>
                                            <button onClick={Back} className={`mx-2 px-2 btn btn-primary`} disabled={currentPage === 0 ? true : false}>Back</button>
                                            <span onClick={FirstPage} className='mt-2 btn btn-sm btn-outline-light text-dark text-decoration-underline'> <i class="bi bi-chevron-double-left"></i> 1</span>
                                            <span className='mt-2 btn btn-sm'>ຫນ້າທີ {currentPage + 1}</span>
                                            <span onClick={LastPage} className='mt-2 btn btn-sm btn-outline-light text-dark text-decoration-underline'> {countPage + 1} <i class="bi bi-chevron-double-right"></i></span>
                                            <button onClick={Next} className={`mx-2 px-2 btn btn-sm btn-primary`} disabled={currentPage === countPage ? true : false}>Next</button>
                                        </div>
                                    
                                </div>
                               
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>
                    </div>

                </div>
            </div>                          
        </div> : <Spinner/>}
        </div>
    )
}

export default Candidates