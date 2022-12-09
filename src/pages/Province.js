import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import url from '../components/API-links/apiurl'
import EditProvinceModal from './EditProvinceModal';
import EditDistrictModal from './EditDistrictModal';
import Spinner from "../components/uitilities/Spinner";
import ReactPaginate from "react-paginate";
import Swal from 'sweetalert2'

const Province = () => {
  const [ShowModal, setShowModal] = useState(false)
  const [filterText, setFilterText] = useState("")
  const token = sessionStorage.getItem('myToken')
  if (!token) {
    window.location = "/login"
  }
  const [Province, setProvince] = useState([])
  const [loading, setLoading] = useState(false)


  const showProvince = () => {
    axios.get(url.Mainurl + url.getProvince).then((res) => {
      setProvince(res.data)
      setLoading(true)
    })
  }

  const deleteProvince = (id) => {
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
            axios.delete(url.Mainurl + url.deleteProvince + id).then(() => {
                setProvince(Province.filter((val) => {
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
    showProvince()
  }, [])

  const [pageNumber, setPageNumber] = useState(0)

  const itemsPerPage = 12
  const pageVisited = pageNumber * itemsPerPage
  const displayUsers = Province.slice(pageVisited, pageVisited + itemsPerPage).map((item, index) => {
    return (
      <tr key={index}>
        <td>{index+1}</td>
        <td>{item.name}</td>
        <td class="text-center py-0 align-middle">
          <div class="btn-group btn-group-sm">
            <EditProvinceModal id={item.id} ShowModal={ShowModal} setShowModal={setShowModal}></EditProvinceModal>
            <button onClick={() => deleteProvince(item.id)} class="btn btn-danger ms-1"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    )
  })

  let filterUser = Province.filter((e) => e.name.toLowerCase().includes(filterText)).slice(0, 12).map((item, index) =>
    <tr key={index}>
      <td>{index+1}</td>
      <td>{item.name}</td>
      <td class="text-center py-0 align-middle">
        <div class="btn-group btn-group-sm">
          <EditProvinceModal id={item.id} ShowModal={ShowModal} setShowModal={setShowModal}></EditProvinceModal>
          <button onClick={() => deleteProvince(item.id)} class="btn btn-danger"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  )

  const pageCount = Math.ceil(Province.length / itemsPerPage)

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
                    <Link to="/add-province" className="card-title btn btn-success float-right">ເພິ່ມແຂວງ</Link>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                  <h3 className="card-title">ແຂວງທັງຫມົດ ( <strong className='text-danger'>{Province.length}</strong> )</h3>
                    <div className="card-tools">
                      <div className="input-group input-group-sm" style={{ width: 500 }}>
                        <input onChange={(e) => setFilterText(e.target.value)} type="text" name="table_search" className="form-control float-right" placeholder="ຄົ້ນຫາດ້ວຍຊື່ແຂວງ..." />
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
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>ຊື່ແຂວງ</th>
                          <th className="text-center">ຈັດການ</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filterText === "" ? displayUsers : filterUser}
                      </tbody>
                    </table>
                    {Province.length === 0 ? <h1 className='text-center my-3'>ບໍ່ມີຂໍ້ມູນ</h1> : ""}
                    {Province.length >= 12 ? <ReactPaginate
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

export default Province