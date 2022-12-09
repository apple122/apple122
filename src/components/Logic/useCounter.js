import axios from "axios";
import url from '../../components/API-links/apiurl'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useCounter() {
    const [days, setDays] = useState("0")
    const [hours, setHours] = useState("0")
    const [minutes, setMinutes] = useState("0")
    const [seconds, setSeconds] = useState("0")
    const [status, setStatus] = useState()
    const datetime = sessionStorage.getItem('dt')
    const [deadline, setDeadline] = useState("")
    const [loadingTime, setLoadingTime] = useState(1)

    useEffect(() => {
        const getPage = () => {
            axios.get(url.Mainurl + url.getLatestDrawDate)
                .then((response) => {
                    sessionStorage.setItem('dt', response.data.data.date + ',' + response.data.data.time)
                    setStatus(response.data.data.status)
                    setDeadline(datetime)
                    setLoadingTime(0)
                }).catch((err) => {
                    setLoadingTime(0)
                })
        }
        getPage()
    }, [])
    
        function GetTimeUntil(datetime) {
            if(status === "pending") {
            const time = Date.parse(datetime) - Date.parse(Date());
            if (time < 0) {
            setStatus('active')
            } else {
                const seconds = Math.floor((time / 1000) % 60);
                const minutes = Math.floor((time / 1000 / 60) % 60);
                const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
                const days = Math.floor(time / (1000 * 60 * 60 * 24));
    
                setSeconds(seconds)
                setMinutes(minutes)
                setHours(hours)
                setDays(days)
            }
        } else if (status === "active") {
            setStatus("active")
        }
        }
    
        function componentDidMount() {
            setInterval(() => GetTimeUntil(datetime), 1000);
        }
        componentDidMount()
    

    return (
        {
            status,
            days,
            hours,
            minutes,
            seconds,
            loadingTime,
        }
    )
}

export default useCounter