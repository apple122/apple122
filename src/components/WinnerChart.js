import React, { useState, useEffect } from 'react'
import FirstPrizeChart from './WinnerElements/FirstPrizeChart'
import SecondPrizeChart from './WinnerElements/SecondPrizeChart'
import ThirdPrizeChart from './WinnerElements/ThirdPrizeChart';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import reward from '../assets/imgs/reward.png'
import url from '../components/API-links/apiurl'
import axios from 'axios';
import '../assets/css/winnerChart.css'

function WinnerChart() {
    const token = sessionStorage.getItem('myToken')
    const [data, setData] = useState([])

    useEffect(() => {
        const getSinglePrizeAPI = async () => {
            await axios.get(url.Mainurl + url.getPrize, { headers: {"Authorization" : `Bearer ${token}`} })
                .then((response) => {
                    setData(response.data)
                }).catch((error) => {
                    console.log(error.response)
                })
        }
        getSinglePrizeAPI()
    }, [])
    return (
        <div className='form-group'>
            <div className='h1 bg-info my-5 w-25 text-center d-block mx-auto fw-bold rounded rounded-3 py-2'>Chart</div>
            <Row className="px-5">
                <Col className="pt-5 mt-6 SecondPrize-pd">
                    <div className='text-center mb-3 h3 fw-bold'>ລາງວັນ {data.filter((item) => item.id === 2).map((e) => e.title)}</div>
                    <div className="bg-danger d-block mx-auto SecondPrize">

                        <SecondPrizeChart />

                    </div>
                </Col>
                <Col className="FirstPrize-pd">

                    {/* <TitleFirstPlace /> */}
                    <div className='text-center mb-3 h3 fw-bold'>ລາງວັນ {data.filter((item) => item.id === 1).map((e) => e.title)}</div>
                    <div className="bg-primary d-block mx-auto FirstPrize">

                        <FirstPrizeChart />
                        <img width={150} className="d-block mx-auto py-2" src={reward} alt="" />
                        {/* <ImageOfMedal />

                        <ButtonViewDetail /> */}
                        <div className='pt-5'>
                            <Link to="/winnerDetail" className='text-decoration-none'><button className='effect fs-2 fw-bold d-block mx-auto p-3 mx-5 rounded rounded-2 border border-0'>ເບິ່ງລາຍລະອຽດ</button></Link>
                        </div>
                    </div>
                </Col>
                <Col className="pt-5 mt-5 ThirdPrize-pd">

                    {/* <TItlThirdPlace /> */}
                    <div className='text-center mb-3 h3 fw-bold'>ລາງວັນ {data.filter((item) => item.id === 3).map((e) => e.title)}</div>
                    <div className="bg-warning d-block mx-auto overflow-auto ThirdPrize ">

                        <ThirdPrizeChart />

                    </div>
                </Col>
            </Row>



        </div>
    )
}

export default WinnerChart