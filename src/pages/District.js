import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import url from '../components/API-links/apiurl'
import Swal from "sweetalert2";
import EditDistrictModal from './EditDistrictModal';
import Spinner from "../components/uitilities/Spinner";
import ReactPaginate from "react-paginate";

function District() {
  const [ShowModal, setShowModal] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [filterText, setFilterText] = useState("")
  const token = sessionStorage.getItem('myToken')
  if (!token) {
    window.location = "/login"
  }
  const [District, setDistrict] = useState([])
  const [Province, setProvince] = useState([])

  const showDistrict = () => {
    axios.get(url.Mainurl + url.getDistrict).then((res) => {
      setDistrict(res.data)
      setLoading1(true)
    })
  }

  const showProvince = () => {
    axios.get(url.Mainurl + url.getProvince).then((res) => {
      setProvince(res.data)
      setLoading2(true)
    })
  }


  useEffect(() => {
    showProvince()
    showDistrict()
  }, [])

  const deleteDistrict = (id) => {
    Swal.fire({
      title: 'ທ່ານຈະລົບຂໍ້ມູນແທ້ຫລືບໍ່?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ລົບຂໍ້ມູນ!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(url.Mainurl + url.deleteDistrict + id).then(() => {
          setDistrict(District.filter((val) => {
            Swal.fire({
              icon: 'success',
              title: 'ລົບຂໍ້ມູນແລ້ວ!',
            })
            return val.id !== id
          }))
        }).catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'ເກີດຂໍ້ຜິດພາດ!',
          })
        })
      }
    })
  }

  const [pageNumber, setPageNumber] = useState(0)

  const itemsPerPage = 12
  const pageVisited = pageNumber * itemsPerPage
  const displayUsers = District.slice(pageVisited, pageVisited + itemsPerPage).map((item, index) => {
    return (
      <tr key={index}>
        <td>{index+1}</td>
        <td>{item.name}</td>
        <td>{Province.filter((e) => e.id === item.provinceId).map((e) => e.name)}</td>
        <td>
          <div className="btn-group btn-group-sm">
            <EditDistrictModal province_id={item.provinceId} id={item.id} ShowModal={ShowModal} setShowModal={setShowModal}></EditDistrictModal>
            <button onClick={() => deleteDistrict(item.id)} class="btn btn-danger ms-1"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    )
  })

  let filterUser = District.filter((e) => e.name.toLowerCase().includes(filterText)).slice(0, 12).map((item, index) =>
    <tr key={index}>
      <td>{index+1}</td>
      <td>{item.name}</td>
      <td>{Province.filter((e) => e.id === item.provinceId).map((e) => e.name)}</td>
      <td>
        <div className="btn-group btn-group-sm">
          <EditDistrictModal id={item.id} ShowModal={ShowModal} setShowModal={setShowModal}></EditDistrictModal>
          <button onClick={() => deleteDistrict(item.id)} class="btn btn-danger ms-1"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  )

  const pageCount = Math.ceil(District.length / itemsPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  return (
    <div>
      {loading1 === true && loading2 === true ? <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <Link to="/add-district" className="card-title btn btn-success float-right mx-2">ເພິ່ມເມືອງ</Link>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className='col-md-4'>
                      <h3 className="card-title">ຂໍ້ມູນເມືອງ ( <strong className='text-danger'>{District.length}</strong> )</h3>
                    </div>
                    <div className="card-tools">
                      <div className="input-group input-group-sm" style={{ width: 500 }}>
                        <input onChange={(e) => setFilterText(e.target.value)} type="text" name="table_search" className="form-control float-right" placeholder="ຄົ້ນຫາດ້ວຍຊື່ເມືອງ..." />
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
                          <th>ເມືອງ</th>
                          <th>ແຂວງ</th>
                          <th>ຈັດການ</th>
                        </tr>
                      </thead>

                      <tbody>

                        
                        {filterText === "" ? displayUsers : filterUser}

                      </tbody>
                    </table>
                    {District.length === 0 ? <h1 className='text-center my-3'>ບໍ່ມີຂໍ້ມູນ</h1> : ""}
                    {District.length >= 12 ? <ReactPaginate
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

export default District