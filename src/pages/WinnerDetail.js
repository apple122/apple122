import React, { useState, useEffect } from 'react'
import axios from 'axios'
import url from '../components/API-links/apiurl'
import Spinner from '../components/uitilities/Spinner'

function WinnerDetail() {
  const token = sessionStorage.getItem("myToken");
  const [data, setData] = useState([])
  const [prize, setPrize] = useState([])
  const [loading1, setLoading1] = useState()
  const [loading2, setLoading2] = useState()

  let times = data.sort(function (a, b) {
    return b.week_id - a.week_id
  })
  let LimitTimes = times.slice(0, 1)
  let LimitTimesID = LimitTimes[0]?.week_id

  let event = data.sort(function (a, b) {
    return b.id - a.id
  })

  let FirstWinner = event.filter(e => e.prize_id === 1 && e.week_id === LimitTimesID)

  let SecondWinners = event.filter(e => e.prize_id === 2 && e.week_id === LimitTimesID)

  let ThirdWinners = event.filter(e => e.prize_id === 3 && e.week_id === LimitTimesID)

  useEffect(() => {
    const getWinnerAPI = async () => {
      await axios.get(url.Mainurl + url.getWinner)
        .then((response) => {
          setData(response.data.data)
          setLoading1(true)
        }).catch((error) => {
          console.log(error.response)
        })
    }
    getWinnerAPI()

    const getPrizeAPI = async () => {
      await axios.get(url.Mainurl + url.getPrize, { headers: {"Authorization" : `Bearer ${token}`} })
        .then((response) => {
          setPrize(response.data)
          setLoading2(true)
        }).catch((error) => {
          console.log(error.response)
        })
    }
    getPrizeAPI()
  }, [])
  return (
    <div>
      <div>
      {loading1 && loading2 ? <div className="content-wrapper">
      
      <div className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
              </div>
              <div className="col-12 ">
                <div className="card">
                  <div className="card-header">
                    <div className="text-center user-select-none">
                    <h1 className='text-center bg-primary text-white p-3 w-50 d-block mx-auto fw-bold rounded rounded-3'>ຜົນການສຸ່ມ ງວດທີ {`${LimitTimesID}`}</h1>
                    </div>
                  </div>
                  {/* /.card-header */}
                  
                  {/* /.card-body */}
                  <div className="bg-white" id="fullScreen">
         {/* <button onClick={openFullscreen}>Fullscreen</button> */}
              <div class="row resize mt-3 card-body">
              <div>
      
      <div class="container d-block mx-auto my-5">
  <div class="row">
    <div class="col">
    <div className='fs-4 text-center bg-primary px-3 py-4 text-white fw-bold'>ລາງວັນ {prize.filter((item) => item.id === 1).map((e) => parseInt(e.description).toLocaleString())} ກີບ</div>
    {FirstWinner.map((e, index) => <div key={index} className='border border-1 py-3 fs-4 text-center'> {`ລຳດັບທີ ${index+1}`} <br /> {e.fullName} <br /> {`ເລກໃບບິນ`} <br /> {e.bil_number}</div> )}
    </div>
    <div class="col">
    <div className='fs-4 text-center bg-danger px-3 py-4 text-white fw-bold'>ລາງວັນ {prize.filter((item) => item.id === 2).map((e) => parseInt(e.description).toLocaleString())} ກີບ</div>
    {SecondWinners.map((e, index) => <div key={index} className='border border-1 py-3 fs-4 text-center'>{`ລຳດັບທີ ${index+1}`} <br /> {e.fullName} <br /> {`ເລກໃບບິນ`} <br /> {e.bil_number}</div> )}
    </div>
    <div class="col">
    <div className='fs-4 text-center bg-warning px-3 py-4 text-white fw-bold'>ລາງວັນ {prize.filter((item) => item.id === 3).map((e) => parseInt(e.description).toLocaleString())} ກີບ</div>
    {ThirdWinners.map((e, index) => <div key={index} className='border border-1 py-3 fs-4 text-center'>{`ລຳດັບທີ ${index+1}`} <br /> {e.fullName} <br /> {`ເລກໃບບິນ`} <br /> {e.bil_number}</div> )}
    </div>
  </div>
</div>
      </div> 
              </div>
          </div>
                  
                </div>
                {/* /.card */}
              </div>
            </div>
          </div>
        </div> 
        </div> : <Spinner />}
        
      </div>
    </div>
  )
}

export default WinnerDetail