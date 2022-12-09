import React, { useState } from "react";
import '../assets/css/countdownTimer.css'
import useCounter from "./Logic/useCounter";

function CountdownTimer() {
const {status, days, hours, minutes, seconds} = useCounter()

    return (
        <div>
            {status === "pending" || status === undefined ? <div className="bg-primary text-white fs-2 text-center py-2 fw-bold">ກິດຈະກຳສຸ່ມແຈກຂອງລາງວັນຈະເລີ່ມໃນອີກ</div> : <div className="bg-success p-3 text-center text-white fw-bold"><h1 className="Ready">Ready Go!</h1></div>}
            {status === "pending" ? <div className="d-block mx-auto">
                <div className="d-flex bg-warning text-white fs-1 justify-content-center align-items-center">
                    <div className="mx-3">
                        <div className="fw-bold">
                            {days}
                            <div className="fw-bold">ວັນ</div>
                        </div>
                    </div>
                    <div className="mx-3">
                        <div className="fw-bold">
                            {hours}
                            <div className="fw-bold">ຊົ່ວໂມງ</div>
                        </div>
                    </div>
                    <div className="mx-3">
                        <div className="fw-bold">
                            {minutes}
                            <div className="fw-bold">ນາທີ</div>
                        </div>
                    </div>
                    <div className="mx-3">
                        <div className="fw-bold">
                            {seconds}
                            <div className="fw-bold">ວິນາທີ</div>
                        </div>
                    </div>
                </div>
            </div> : ""}
            {status === undefined ? <div className="d-block mx-auto">
                <div className="d-flex bg-warning text-white fs-1 justify-content-center align-items-center">
                    <div className="mx-3">
                        <div className="fw-bold">
                            {'##'}
                            <div className="fw-bold">ວັນ</div>
                        </div>
                    </div>
                    <div className="mx-3">
                        <div className="fw-bold">
                        {'##'}
                            <div className="fw-bold">ຊົ່ວໂມງ</div>
                        </div>
                    </div>
                    <div className="mx-3">
                        <div className="fw-bold">
                        {'##'}
                            <div className="fw-bold">ນາທີ</div>
                        </div>
                    </div>
                    <div className="mx-3">
                        <div className="fw-bold">
                        {'##'}
                            <div className="fw-bold">ວິນາທີ</div>
                        </div>
                    </div>
                </div>
            </div> : ""}
        </div>
    )
}

export default CountdownTimer