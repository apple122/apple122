import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import { v4 as uuid } from 'uuid'
import Icon from './uitilities/Icon';
import Title from './uitilities/Title'
import url from './API-links/apiurl'

function LoginForm() {
  AOS.init();
  let navigate = useNavigate();
  const uniqu_id = uuid();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [checkInputUsername, setCheckInputUsername] = useState(false)
  const [checkInputPassword, setCheckInputPassword] = useState(false)
  const [checkCorrectAccount, setCheckCorrectAccount] = useState()
  const [loading, setLoading] = useState(false)

  function showPassword() {
    let show = document.querySelector(".showPassword")
    if (show.type === "password") {
      show.type = "text"
    } else {
      show.type = "password"
    }
  }

  function getUsername(username) {
    setUsername(username.target.value)
    setCheckInputUsername(false)
  }

  function getPassword(password) {
    setPassword(password.target.value)
    setCheckInputPassword(false)
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      if (username == "") {
        setCheckInputUsername(true);

      } else if (password == "") {
        setCheckInputPassword(true);
      } else {
        setCheckCorrectAccount("")
        setTimeout(() => {
          setLoading(false)
          setCheckCorrectAccount("ການເຊື່ອມຕໍ່ມີບັນຫາ")
        }, 30000);
        setLoading(true)
        axios.post(url.Mainurl + url.loginedUser, {
          username: username,
          password: password,
        }).then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            const token = res.data.accessToken
            const conFirmToken = token
            axios.get(url.Mainurl, { headers: {"Authorization" : `Bearer ${token}`} }).then((res) => {
              setLoading(false)
            }).catch((error) => {
              setLoading(false)
              console.log(error)
            })
            sessionStorage.setItem('myToken', token);
            sessionStorage.setItem('conFirmToken', conFirmToken);
              setCheckCorrectAccount("");
              if (token && conFirmToken) {
                window.location = "/"
                // return navigate("/luckydraw/admin");
              }
            }
        }
          ).catch((err) => {
            setLoading(false)
            console.log(err)
            setCheckCorrectAccount("ການເຊື່ອມຕໍ່ມີບັນຫາ")
            if (!err.response) {
            } else if (err.response.status == 404) {
              setCheckCorrectAccount("Username ບໍ່ຖືກຕ້ອງ")
            } else if (err.response.status == 401) {
              setCheckCorrectAccount("Password ບໍ່ຖືກຕ້ອງ")
            }
          })
      }
    }
  };

  function submit() {
    if (username == "") {
      setCheckInputUsername(true);

    } else if (password == "") {
      setCheckInputPassword(true);
    } else {
      setCheckCorrectAccount("")
      setTimeout(() => {
        setLoading(false)
        setCheckCorrectAccount("ການເຊື່ອມຕໍ່ມີບັນຫາ")
      }, 30000);
      setLoading(true)
      axios.post(url.Mainurl + url.loginedUser, {
        username: username,
        password: password,
      }).then((res) => {
        if (res.status == 200) {
          console.log(res.data)
          const token = res.data.accessToken
          const conFirmToken = token
          axios.get(url.Mainurl, { headers: {"Authorization" : `Bearer ${token}`} }).then((res) => {
            setLoading(false)
          }).catch((error) => {
            setLoading(false)
            console.log(error)
          })
          sessionStorage.setItem('myToken', token);
          sessionStorage.setItem('conFirmToken', conFirmToken);
          setCheckCorrectAccount("");
          if (token && conFirmToken) {
            window.location = "/"
            // return navigate("/luckydraw/admin");
          }
        }
      }
      ).catch((err) => {
        setLoading(false)
        setCheckCorrectAccount("ການເຊື່ອມຕໍ່ມີບັນຫາ")
        console.log(err)
        if (!err.response) {
        } else if (err.response.status == 404) {
          setCheckCorrectAccount("Username ບໍ່ຖືກຕ້ອງ")
        } else if (err.response.status == 401) {
          setCheckCorrectAccount("Password ບໍ່ຖືກຕ້ອງ")
        }
      })
    }
  }

  // if(navigate) {
  //   return <Navigate to="/event"/>
  // }

  return (
    <div>
      <Container data-aos="fade" data-aos-duration="1000">
        <div style={{ marginTop: 100 }} className='w-50 d-block mx-auto bg-white shadow p-5'>


          <Icon />

          <Title />

          <form action="">
            <div className='form-group my-4'>
              <p className='fs-5 text-black'>Username</p>
              <input onChange={getUsername} autoFocus type="text" className='w-100 form-control shadow-sm p-3' placeholder='ປ້ອນ Username' />
              <p className='mt-2 text-danger'>{checkInputUsername === true ? 'ກະລຸນາປ້ອນ Username' : ''}</p>
            </div>
            <div className='form-group'>
              <p className='fs-5 text-black'>Password</p>
              <input onKeyDown={handleKeyDown} onChange={getPassword} type="password" className='w-100 form-control shadow-sm p-3 showPassword' placeholder='ປ້ອນ Password' />
              <p className='mt-2 text-danger'>{checkInputPassword === true ? 'ກະລຸນາປ້ອນ Password' : ""}</p>
              <input id='checkbox' style={{height: 18, width: 18}} onKeyDown={handleKeyDown} type="checkbox" onClick={showPassword} /> <label for="checkbox" className='fs-5 user-select-none'>ສະແດງລະຫັດຜ່ານ</label>
            </div>
            <p className='text-center text-danger'>{checkCorrectAccount}</p>
          </form>
          <div className='text-center'>{loading === true ? "ກະລຸນາລໍຖ້າ..." : ""}</div>
          <button onClick={submit} type='button' style={{ backgroundColor: "#1E90FA" }} className='d-block mx-auto my-5 btn btn-primary w-75 py-3 rounded rounded-3 fs-4'>Login</button>

        </div>
      </Container> 


    </div>
  )
}

export default LoginForm