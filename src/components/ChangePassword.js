import React from 'react'

const ChangePassword = () => {
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-6">
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Change new password</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>username</label>
                                            <input type="text" className="form-control" placeholder="enter username" />
                                        </div>
                                        <div className="form-group">
                                            <label>old Password</label>
                                            <input type="password" className="form-control" placeholder="Password" />
                                        </div>
                                        <div className="form-group">
                                            <label>new Password</label>
                                            <input type="password" className="form-control" placeholder="Password" />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm Password</label>
                                            <input type="password" className="form-control" placeholder="Password" />
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
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

export default ChangePassword