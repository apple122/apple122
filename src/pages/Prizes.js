import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import url from "../components/API-links/apiurl";
import { EditPrizeModal } from "./EditPrizeModal";
import Spinner from "../components/uitilities/Spinner";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const Prizes = () => {
  const token = sessionStorage.getItem("myToken");
  const [loading, setLoading] = useState(false);
  if (!token) {
    window.location = "/login";
  }
  const [ShowModal, setShowModal] = useState(false);
  const [showPrize, setshowPrize] = useState([]);
  const [filterText, setFilterText] = useState("");

  const listPrize = () => {

      axios
      .get(url.Mainurl + url.getPrize, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((res) => {
        setshowPrize(res.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });


    
  };

  const deletePrize = (id) => {
    Swal.fire({
      title: "ທ່ານຈະລົບຂໍ້ມູນແທ້ຫລືບໍ່?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ລົບ",
      cancelButtonText: "ຍົກເລີກ",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(url.Mainurl + url.deletePrize + id)
          .then(() => {
            setshowPrize(
              showPrize.filter((val) => {
                Swal.fire({
                  icon: "success",
                  title: "ລົບຂໍ້ມູນແລ້ວ!",
                });
                return val.id !== id;
              })
            );
          })
          .catch(() => {
            alert("ເກີດຂໍ້ຜິດພາດ");
          });
      }
    });
  };

  useEffect(() => {
    listPrize();
  }, []);

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const pageVisited = pageNumber * itemsPerPage;

  const displayUsers = showPrize
    .slice(pageVisited, pageVisited + itemsPerPage)
    .map((item, index) => {
      return (
        <tr key={index}>
          <td>{index+1}</td>
          <td>{item.title}</td>
          <td>{parseInt(item.description).toLocaleString()} ກີບ</td>
          <td>{item.quantity} ລາງວັນ</td>
          <td class="text-center py-0 align-middle">
            <div class="btn-group btn-group-sm">
              <EditPrizeModal
                id={item.id}
                ShowModal={ShowModal}
                setShowModal={setShowModal}
              ></EditPrizeModal>
              {item.id > 3 ?  <button
                class="btn btn-danger"
                onClick={() => deletePrize(item.id)}
              >
                <i class="fas fa-trash"></i>
              </button>: ""}&nbsp;
             
            </div>
          </td>
        </tr>
      );
    });

  let filterUser = showPrize
    .filter(
      (e) =>
        e.title.toLowerCase().includes(filterText) ||
        e.description.toLowerCase().includes(filterText)
    )
    .map((item, index) => (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{parseInt(item.description).toLocaleString()} ກີບ</td>
        <td>{item.quantity} ລາງວັນ</td>
        <td class="text-center py-0 align-middle">
          <div class="btn-group btn-group-sm">
            <EditPrizeModal
              id={item.id}
              ShowModal={ShowModal}
              setShowModal={setShowModal}
            ></EditPrizeModal>

              {item.id > 3 ?  <button
                class="btn btn-danger"
                onClick={() => deletePrize(item.id)}
              >
                <i class="fas fa-trash"></i>
              </button>: ""}&nbsp;
          </div>
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(showPrize.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      {loading === true ? (
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <Link
                        to="/add-prize"
                        className="card-title btn btn-success float-right"
                      >
                        ເພິ່ມລາງວັນ
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                    <h3 className="card-title">ລາງວັນທັງຫມົດ ( <strong className='text-danger'>{showPrize.length}</strong> )</h3>
                      <div className="card-tools">
                        <div
                          className="input-group input-group-sm"
                          style={{ width: 500 }}
                        >
                          <input
                            onChange={(e) => setFilterText(e.target.value)}
                            type="text"
                            name="table_search"
                            className="form-control float-right"
                            placeholder="ຄົ້ນຫາ..."
                          />
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
                            <th>ຊື່ລາງວັນ</th>
                            <th>ມູນຄ່າລາງວັນ</th>
                            <th>ຈຳນວນ</th>
                            <th className="text-center">ຈັດການ</th>
                          </tr>
                        </thead>
                        <tbody>
                         
                          {filterText === "" ? displayUsers : filterUser}
                        </tbody>
                        
                      </table>
                      {showPrize.length === 0 ? (
                            <h1 className="text-center mt-5">ບໍ່ມີຂໍ້ມູນ</h1>
                          ) : (
                            ""
                          )}
                      <div className="mt-4 mb-5 p-1">
                        {showPrize.length >= 10 ? (
                          <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBtn"}
                            previousLinkClassName={
                              "nextAndpreviousBtn user-select-none px-3 rounded rounded-5 text-white"
                            }
                            nextLinkClassName={
                              "nextAndpreviousBtn user-select-none px-3 rounded rounded-5 text-white"
                            }
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                            className="winnerPagination mt-4 mb-5 p-1 user-select-none"
                          ></ReactPaginate>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Prizes;
