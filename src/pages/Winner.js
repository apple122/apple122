import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import url from '../components/API-links/apiurl'
import Spinner from '../components/uitilities/Spinner'
import ReactPaginate from 'react-paginate'
import Moment from 'moment'
import LoadingSpin from 'react-loading-spin'

const Winner = (props) => {
    const token = sessionStorage.getItem('myToken')
    const [filterText, setFilterText] = useState("");
    const [loading, setLoading] = useState(false)

    // }, [filterText, resetPaginationToggle]);
    if (!token) {
        window.location = "/login"
    }
    const [winnerList, setwinnerList] = useState([])
    const [prize, setPrize] = useState([])
    const [loadingSpin, setLoadingSpin] = useState(0)


    useEffect(() => {
        showWinnerList()
        getPrizeAPI()
    }, [])

    const showWinnerList = () => {
        axios.get(url.Mainurl + url.getWinner).then((res) => {
            setwinnerList(res.data.data)
            setLoading(true)
        }).catch((err) => {
            alert('ເກີດຂໍ້ຜິດພາດ')
        })
    }

    const getPrizeAPI = () => {
        axios.get(url.Mainurl + url.getPrize, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
            setPrize(res.data)
        }).catch((err) => {
            alert('ເກີດຂໍ້ຜິດພາດ')
        })
    }

    let sort = winnerList.sort(function (a, b) {
        return b.id - a.id
    })

    const [pageNumber, setPageNumber] = useState(0)
    const itemsPerPage = 24
    const pageVisited = pageNumber * itemsPerPage
    const displayUsers = sort.slice(pageVisited, pageVisited + itemsPerPage).map((item, index) => {
        return (
            <tr key={index}>
                <td className='text-center'>{index+1}</td>
                <td>{item.fullName}</td>
                <td>{item.bil_number}</td>
                <td>{item.phone}</td>
                <td>{Moment(item.createdAt).format("DD/MM/yyyy H:ss")}</td>
                <td>{item.village}</td>
                <td>{item.district}</td>
                <td>{item.province}</td>
                <td className='text-center'>{item.week_id}</td>
                <td className='text-center'>{prize.filter((prize_id) => prize_id.id === item.prize_id).map((e) => e.title)}</td>
            </tr>
        )
    })

    let filterUser = sort.filter((e) => e.bil_number.toLowerCase().includes(filterText)).slice(0, 24).map((item, index) =>
        <tr key={index}>
            <td className='text-center'>{index+1}</td>
            <td>{item.fullName}</td>
            <td>{item.bil_number}</td>
            <td>{item.phone}</td>
            <td>{Moment(item.createdAt).format("DD/MM/yyyy H:ss")}</td>
            <td>{item.village}</td>
            <td>{item.district}</td>
            <td>{item.province}</td>
            <td className='text-center'>{item.week_id}</td>
            <td className='text-center'>{prize.filter((prize_id) => prize_id.id === item.prize_id).map((e) => e.title)}</td>
        </tr>
    )

    const filterTime = (e) => {
        setLoadingSpin(1)
        let week_id = e.target.value
        axios.get(url.Mainurl + url.getWinner + `?week_id=${week_id}`).then((res) => {
            setwinnerList(res.data.data)
            setLoadingSpin(0)
        }).catch((err) => {
            alert('ເກີດຂໍ້ຜິດພາດ')
        })
    }

    const pageCount = Math.ceil(sort.length / itemsPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
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
                                        <h3 className="card-title">ຈຳນວນຜູ້ໂຊກດີທັງຫມົດ ( <strong className='text-danger'>{winnerList.length}</strong> )</h3>
                                        <div className="card-tools d-flex">
                                            <div className="input-group input-group-sm" style={{ width: 300 }}>
                                                <input type="number" min='1' onChange={filterTime} name="table_search" className="form-control float-right" placeholder="ຄົ້ນຫາດ້ວຍງວດ..." />
                                            </div>&nbsp; &nbsp;
                                            <div className="input-group input-group-sm" style={{ width: 350 }}>
                                                <input onChange={(e) => setFilterText(e.target.value)} type="text" name="table_search" className="form-control float-right" placeholder="ຄົ້ນຫາດ້ວຍເລກບິນ..." />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-default">
                                                        <i className="fas fa-search" />
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
                                                    <th>ຊື່ ແລະ ນາມສະກຸຸນ</th>
                                                    <th>ເລກບິນ</th>
                                                    <th>ເບີໂທ</th>
                                                    <th>ວັນ/ເດືອນ/ປີ ຖືກລາງວັນ</th>
                                                    <th>ບ້ານ</th>
                                                    <th>ເມືອງ</th>
                                                    <th>ແຂວງ</th>
                                                    <th className='text-center'>ງວດ</th>
                                                    <th className='text-center'>ລາງວັນທີ</th>
                                                </tr>
                                            </thead>
                                                {filterText === "" ? displayUsers : filterUser}
                                        </table> : <div className='text-center my-5'><LoadingSpin primaryColor={"black"} size={50} /></div>}
                                        {sort.length === 0 ? <h1 className='text-center my-3'>ບໍ່ມີຂໍ້ມູນ</h1> : ""}
                                        <div className='mt-4 mb-5 p-1'>
                                            {winnerList.length >= 24 ? <ReactPaginate
                                                previousLabel={"<"}
                                                nextLabel={">"}
                                                pageCount={pageCount}
                                                onPageChange={changePage}
                                                containerClassName={"paginationBtn"}
                                                previousLinkClassName={"nextAndpreviousBtn user-select-none px-3 rounded rounded-5 text-white"}
                                                nextLinkClassName={"nextAndpreviousBtn user-select-none px-3 rounded rounded-5 text-white"}
                                                disabledClassName={"paginationDisabled"}
                                                activeClassName={"paginationActive"}
                                                className="winnerPagination mt-4 mb-5 p-1 user-select-none"
                                            >
                                            </ReactPaginate> : ""
                                            }
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

export default Winner