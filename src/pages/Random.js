import React, { useState, useEffect } from 'react'
import { createContext } from "react";
import Spin from '../components/Spin';
import axios from 'axios';
import url from '../components/API-links/apiurl'
import { useLocation } from 'react-router-dom';
import Spinner from '../components/uitilities/Spinner';
import CountdownTimer from '../components/CountdownTimer';
import WinnerChart from '../components/WinnerChart';
import '../assets/css/amountOfCandidateCard.css'
import useCounter from '../components/Logic/useCounter';

export const SelectContext = createContext()
export const TimesContext = createContext()
export const WarningContext = createContext()
export const WarningTimesContext = createContext()

function Random() {
  // window.scrollTo(0, 50)

  const token = sessionStorage.getItem('myToken')
  const CheckToken = sessionStorage.getItem('conFirmToken')
  const [prize, setPrize] = useState();
  const [prizes, getPrizes] = useState([])
  const [event, getEvent] = useState([])
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [showWarningPrize, setShowWarningPrize] = useState(false)
  const [showWarningTimes, setShowWarningTimes] = useState(false)
  let getPrizeID = sessionStorage.getItem('PrizeID')
  const [PrizeID, setPrizeID] = useState(getPrizeID)
  const [winner, setWinner] = useState([])
  const [hint, showHint] = useState(true)
  const location = useLocation();
  const splitLocation = location.pathname
  const [showCard, setShowCard] = useState(false)
  const {loadingTime} = useCounter()
  const [week, setWeek] = useState([])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 700) {
        setShowCard(true);
      } else {
        setShowCard(false);
      }
    });
  }, [])

  function getPrize(id) {
    setPrize(id.target.value);
    setShowWarningPrize(false)
    sessionStorage.setItem('PrizeID', id.target.value)
    sessionStorage.setItem('Save', true)
  }


  useEffect(() => {
    const getPrizeAPI = async () => {
      await axios.get(url.Mainurl + url.getPrize, { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          getPrizes(response.data)
          setLoading1(true)
        })
    }
    getPrizeAPI()

    const getRandomAPI = async () => {
      await axios.get(url.Mainurl + url.getRandom)
        .then((response) => {
          setLoading2(true)
        })
    }
    getRandomAPI()

    const getCurrentWinner = async () => {
      await axios.get(url.Mainurl + url.getWinner)
        .then((response) => {
          setWeek(response.data.data.length === 0 ? 1 : response.data.data[0].week_id)
          let currentWeek = (response.data.data[0].length === 0 ? 1 : response.data.data[0].week_id)
          axios.get(url.Mainurl + url.getWinner + `?week_id=${currentWeek}`)
          .then((res) => {
            setWinner(res.data.data)
          }).catch((error) => {
            console.log(error.response)
          })
        }).catch((error) => {
          console.log(error.response)
        })
    }
    getCurrentWinner()
  }, [])

  return (
    <SelectContext.Provider value={getPrizeID}>
        <WarningContext.Provider value={{ showWarningPrize, setShowWarningPrize }}>
          <WarningTimesContext.Provider value={{ showWarningTimes, setShowWarningTimes }}>
            <div>
              {loading1 === true && loading2 === true && loadingTime === 0 ? <div className="content-wrapper">

                <div className="content-header">
                  <div className="container-fluid">
                    {showCard === false ?
                      <div className='ps-fixed'>
                        <div className='group-position-SHow bg-success'>
                          <div className='card-header p-4 text-center'><strong className='fs-4'>ຈຳນວນຜູ້ໂຊກດີ</strong></div>
                          <div className='group-card-show text-center'>
                            {/* <label className='border-O'></label> */}
                            <label>( {winner.length} )</label>
                          </div>
                        </div>
                        <div className='group-position-SHow bg-warning'>
                          <div className='card-header p-4 text-center'><strong className='fs-4'>ຈຳນວນລາງວັນ</strong></div>
                          <div className='group-card-show text-center'>
                            {/* <label className='border-O'></label> */}
                            <label>( {24-winner.length} )</label>
                          </div>
                        </div>
                      </div> : ""
                    }
                    <div className="row">
                      <div className="col-12">
                      </div>
                      <CountdownTimer />
                      <div className="col-12 ">
                        <div className="card">
                          <div className="card-header">
                            <div className="text-center user-select-none">
                              <p className='h2 p-2'>ຫນ້າສຸ່ມຫາຜູ້ໂຊກດີ</p>
                            </div>
                          </div>
                          {/* /.card-header */}

                          {/* /.card-body */}
                          <div className="bg-white" id="fullScreen">
                            {/* <button onClick={openFullscreen}>Fullscreen</button> */}
                            <div class="row resize mt-3 card-body">
                              <div className="col-md-6 pd-bottom">
                                <label className="text-center fw-bold lab scale">ເລືອກລາງວັນ:</label>
                                <select onChange={getPrize} className="form-control shadow-sm rounded rounded-2 bg-white scale" name="" id="">
                                  <option selected="" value={PrizeID == null ? "" : PrizeID}>{PrizeID == null ? "--ກະລຸນາເລືອກລາງວັນ--" : `ລາງວັນ ${prizes.filter(e => e.id == PrizeID).map(e => e.title)}`} </option>
                                  {prizes.map((e, index) =>
                                    <option className="fs-5 text-black" key={index} value={e.id}>{`ລາງວັນ ${(e.title)}`}</option>
                                  )}
                                </select>
                              </div>
                              <div className="col-md-6 pd-bottom">
                                <label className="text-center fw-bold ms-4 lab scale">ງວດປະຈຸບັນ:</label>
                                <input className="form-control shadow-sm rounded rounded-2 scale" type="number" value={week} min={1} disabled={true}/>
                              </div>
                            </div>

                            <Spin />
                            <WinnerChart />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> : <Spinner />}

            </div>
          </WarningTimesContext.Provider>
        </WarningContext.Provider>
    </SelectContext.Provider>
  )
}

export default Random