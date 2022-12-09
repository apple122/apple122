import React, { useState, useEffect } from 'react'
import axios from 'axios'
import url from '../API-links/apiurl'

function ThirdPrizeChart() {
    const [data, setData] = useState([])

    useEffect(() => {
        const getCurrentWinner = async () => {
            await axios.get(url.Mainurl + url.getWinner)
              .then((response) => {
                let currentWeek = (response.data.data.length === 0 ? 1 : response.data.data[0].week_id)
                axios.get(url.Mainurl + url.getWinner + `?week_id=${currentWeek}`)
              .then((res) => {
                setData(res.data.data)
              }).catch((error) => {
                console.log(error.response)
              })
              }).catch((error) => {
                console.log(error.response)
              })
          }
          getCurrentWinner()
    }, [])

    let ThirdWinners = data.filter(e => e.prize_id === 3)

    return (
        <div>
            {ThirdWinners.map((e, index) => {
        return (
          <div key={index}>
            <div className='my-1 text-center text-white'>
              <div className='text-center fs-4'>{index + 1}</div>
              <p className='pt-3 fs-4 fw-bold'>{e.fullName}</p>
              <p className='fs-4 fw-bold'>{e.bil_number}</p>
              <p className='fs-4 fw-bold'>ງວດທີ {e.week_id}</p>
            </div>
            <hr className='text-white border border-1' />
          </div>
        )
      }
      )}
        </div>
    )
}

export default ThirdPrizeChart