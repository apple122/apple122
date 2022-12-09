import React from 'react'
import { Link } from 'react-router-dom'
import { useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import url from './API-links/apiurl'

const CreatePeriod = () => {
   
    const [periodvalues, setperiodValues] = useState(
        {   name: "",startDate: "",endDate: ""}
    )
    // const [isSubmit, setisSubmit] = useState(false)

    const handleChange = (e) => {
        const {name,value} = e.target
        setperiodValues({...periodvalues, [name]: value})
        // console.log(periodvalues)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // setisSubmit(true)
        axios.post(url.Mainurl + url.createPeriod, periodvalues).then( res => {
            Swal.fire({
                icon: 'success',
                title: 'Creat Period Successfully!',
                timer: 2500
            })
        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'someting went wrong',
                cancelButtonText:'close'
            })
        })

    }


  return (
    <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Create new Period</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">period name</label>
                                                    <input type="text" className="form-control" placeholder="Enter period name" id="name" name='name' value={periodvalues.name} onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">start</label>
                                                    <input type="date" className="form-control" placeholder="Enter Title" name='startDate' id='startDate' value={periodvalues.startDate} onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">end</label>
                                                    <input type="date" className="form-control" placeholder="Enter Title" name='endDate' id='endDate' value={periodvalues.endDate} onChange={handleChange}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <Link to="/period" className="btn btn-danger float-right">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
  )
}

export default CreatePeriod