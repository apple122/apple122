import React, { useState, useReducer } from 'react'
import url from "../components/API-links/apiurl"
import axios from "axios";
import { useEffect, createContext } from 'react';
import { useContext } from 'react';
import { SelectContext, WarningContext, WarningTimesContext } from '../pages/Random';
import ModalPopUp from './ModalPopUp';
import '../assets/css/luckySpin.css'
import useCounter from './Logic/useCounter';
import Swal from 'sweetalert2';

export const ModalContext = createContext()
export const LuckyNumberContext = createContext()

function Spin() {
  const [candidate, setCandidate] = useState([])
  const token = sessionStorage.getItem('myToken')
  const { showWarningPrize, setShowWarningPrize } = useContext(WarningContext)
  const [modalShow, setModalShow] = useState(false);
  const [Prizes, getPrizes] = useState([])
  const [winnerID, setWinnerID] = useState()
  const [loadingButton, setLoadingButton] = useState(0)
  const prizeID = useContext(SelectContext)
  // let Times = useContext(TimesContext)
  let randNumber = Math.floor(Math.random() * candidate.length);
  var Winner = candidate[randNumber];
  const [winnerBil, setWinnerBil] = useState()
  const [winnerName, setWinnerName] = useState()
  const {status} = useCounter()
  const [week, getWeek] = useState([])
  const [winner, setWinner] = useState([])
  const [drawdateID, setDrawdateID] = useState([])

  useEffect(() => {
    const getCandidateAPI = async () => {
      await axios.get(url.Mainurl + url.getRandom)
        .then((response) => {
          setCandidate(response.data)
        }).catch((error) => {
          console.log(error.response)
        })
    }
    getCandidateAPI()
    
    const getSinglePrizeAPI = async () => {
      await axios.get(url.Mainurl + url.getSinglePrize + prizeID)
        .then((response) => {
          getPrizes(response.data)
        }).catch((error) => {
          console.log(error.response)
        })
    }
    getSinglePrizeAPI()

    const getCurrentWinner = async () => {
      await axios.get(url.Mainurl + url.getWinner)
        .then((response) => {
          getWeek(response.data.data.length === 0 ? 1 : response.data.data[0].week_id)
          let currentWeek = (response.data.data.length === 0 ? 1 : response.data.data[0].week_id)
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

    axios.get(url.Mainurl + url.getLatestDrawDate)
    .then((res) => {
      setDrawdateID(res.data.data.id)
    })
  }, [])

  function Random() {
    let slot = document.querySelector(".spin");
    let item = document.querySelectorAll(".itemNumber");
    const spin = document.querySelector(".circle");
    var speed = 0;
    var time = 16;
    let slot2;
    var amountOfLooping = 0;
    var transition = 'ease'
    if (prizeID === null || prizeID === "" || prizeID === undefined) {
      Swal.fire({
        icon: 'warning',
        title: 'ກະລຸນາເລືອກລາງວັນກ່ອນ',
      })
      window.scrollTo({ top: 100, left: 0, behavior: 'smooth' })
    }
    else if (candidate.length > 0) {
      setLoadingButton(1)
      axios.post(url.Mainurl + url.postWinner, {
        bil_number: Winner?.bil_number,
        bil_pic: Winner?.bil_pic,
        fullName: Winner?.candidate.fullName,
        village: Winner?.candidate.village,
        district: Winner?.candidate.district.name,
        province: Winner?.candidate.province.name,
        phone: Winner?.candidate.phone,
        prize_id: prizeID,
        week_id: (winner.length === 24 ? week+1 : week)
      }).then((response) => {
        setWinnerBil(Winner?.bil_number)
        setWinnerName(Winner?.candidate.fullName)
        setWinnerID(Winner?.id)
        setShowWarningPrize(false)
        setLoadingButton(0)
        if(winner.length === 23) {
          axios.put(url.Mainurl + url.putDrawDate + drawdateID).then((res) => {
          }).catch((err) => {
            setLoadingButton(0)
            console.log(err)
          })
        }
        if (candidate.length > 10 && candidate.length < 100) {
          speed = 20
          amountOfLooping = 4
          for (let i = 0; i < item.length; i++) {
            item[i].setAttribute("style", "justify-content: center; align-item: center; line-height: 68px");
          }
        } else if (candidate.length <= 10 && candidate.length > 5) {
          speed = 20
          amountOfLooping = 5
          for (let i = 0; i < item.length; i++) {
            item[i].setAttribute("style", "justify-content: center; align-item: center; line-height: 198px");
          }

        } else if (candidate.length <= 5 && candidate.length > 2) {
          speed = 20
          amountOfLooping = 6
          for (let i = 0; i < item.length; i++) {
            item[i].setAttribute("style", "justify-content: center; align-item: center; line-height: 298px");
          }

        } else if (candidate.length <= 3 && candidate.length > 2) {
          speed = 30
          amountOfLooping = 8
          for (let i = 0; i < item.length; i++) {
            item[i].setAttribute("style", "justify-content: center; align-item: center; line-height: 298px");
          }

        } else if (candidate.length === 2 && candidate.length > 1) {
          speed = 30
          amountOfLooping = 8
          for (let i = 0; i < item.length; i++) {
            item[i].setAttribute("style", "justify-content: center; align-item: center; line-height: 398px");
          }
        } else if (candidate.length === 1) {
          for (let i = 0; i < item.length; i++) {
            item[i].setAttribute("style", "justify-content: center; align-item: center; line-height: 298px");
          }
          setModalShow(true)
        } else if (candidate.length >= 100 && candidate.length < 500) {
          speed = 6
          amountOfLooping = 3
          for (let i = 0; i < item.length; i++) {
            item[i].setAttribute("style", "justify-content: center; align-item: center; line-height: 68px");
          }
        }
        let rectslot = slot.getBoundingClientRect();

        spin.style.visibility = "hidden";
        const height = slot.offsetHeight;
        for (let i = 0; i <= amountOfLooping; i++) {
          slot2 = slot.cloneNode(true);
          slot.appendChild(slot2);
          slot2.style.top = `${height}px`;
        }

        let target = document.getElementById(`${Winner.id}`);
        let rectTarget = target.getBoundingClientRect();

        let rand = Math.floor(Math.random() * (280 - 250 + 1)) + 250;
        setTimeout(() => {
          slot.classList.add("blur");
        }, 1000);
        slot.style.transition = `all ${time}s ${transition}`;
        slot.style.transform = `translateY(-${(rectslot.height * speed) + (rectTarget.y - rectslot.top - rand)
          }px)`;

        slot.addEventListener("transitionend", function () {
          let style = document.createElement("style");
          style.innerHTML = `.Number${Winner?.id} {
        animation: zoom-in-zoom-out 1s ease infinite;
      }
      
      @keyframes zoom-in-zoom-out {
        0% {
          transform: scale(1, 1);
        }
        50% {
          transform: scale(1.1, 1.1);
        }
        100% {
          transform: scale(1, 1);
        }
      }`;
          document.body.appendChild(style);
          slot.style.transition = "none";
          setTimeout(() => {
            setModalShow(true)
          }, 4000);
        });
      })
        .catch((error) => {
          setLoadingButton(0)
          console.log('Error', error.response.status);
          if (error.response?.data?.message === "this bil has got a prize") {
            Swal.fire({
              icon: 'warning',
              title: 'ບິນນີ້ຖືກລາງວັນແລ້ວ',
            })
          } else if (error.response?.data?.message === "This prizes got winners") {
            Swal.fire({
              icon: 'warning',
              title: `ລາງວັນທີ ${prizeID} ຫມົດແລ້ວ`,
            })
          } else if (error.response.status === 405) {
            Swal.fire({
              icon: 'warning',
              title: `ລາງວັນສຳຫລັບອາທິດນີ້ຫມົດແລ້ວ`,
            })
          }
        });
    } else if (candidate.length < 0) {
      Swal.fire({
        icon: 'warning',
        title: `ບໍ່ມີລາຍຊື່ຜູ້ສຸ່ມ ບໍ່ສາມາດສຸ່ມໃດ້`,
      })
    }

  }

  return (
    <ModalContext.Provider value={modalShow}>
      <LuckyNumberContext.Provider>
        <div>
          <div>
            <div style={{ height: 600 }} >
              <div className="border border-5 d-block mx-auto formRandom position-relative">
              {loadingButton === 1 ? <div class="loadingCircle spinner-border" role="status">
                        <span class="visually-hidden"></span>
                      </div> :
                status === "active" && candidate.length != 0 ? 
                <div
                  onClick={() => Random()}
                  className="circle shadow user-select-none border border-1 text-black">Spin</div> :
                  <div className="coolDown user-select-none text-white fs-3">Spin</div>  
                }
                  
                <div className="arrow-right"></div>
                <div className="arrow-left"></div>
                <div className="spin">
                  {candidate.map((e) => {
                    return (
                      <div
                        id={`${e.id}`}
                        key={e.id}
                        className={`Number${e.id} itemNumber border border-1 text-center text-white fs-3 fw-bold user-select-none`}>
                        {e.bil_number}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <audio src=""></audio>
            <ModalPopUp prize={prizeID} winnerBil={winnerBil} winnerName={winnerName} />
          </div>
        </div>
      </LuckyNumberContext.Provider>
    </ModalContext.Provider>
  )
}

export default Spin