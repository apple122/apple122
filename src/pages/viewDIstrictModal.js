import React from 'react'

function viewDIstrictModal(props) {
    const provinceId = props.id
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Quantity, setQuantity] = useState('')
    const [district, setDistrict] = useState([])
    const [province, setProvince] = useState([])
    const [formvalues, setformValues] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const token = sessionStorage.getItem('myToken')
    if (!token) {
        window.location = "/login"
    }

    useEffect(() => {
        axios.get(url.Mainurl + url.getDistrict).then((res) => {
            setDistrict(res.data)
        })

        axios.get(url.Mainurl + url.getProvince).then((res) => {
            setProvince(res.data)
        })

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValues({ ...formvalues, [name]: value })

    }

    const UpdatePrize = (e) => {
        e.preventDefault()
        // const formData = new FormData()
        // formData.append('title',Title)
        // formData.append('description', Description)
        // formData.append('quantity', Quantity)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(url.Mainurl + url.updatePrize + provinceId, formvalues).then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Update Success!!',
                        confirmButtonText: 'OK!'
                    })
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        timer: 2000
                    })
                })
            }
        })


    }
    return (
        <div>
            <Button variant='primary' onClick={handleShow}>
                <i className='fas fa-eye'>ເບິ່ງຂໍ້ມູນເມືອງ</i>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ເບິ່ງຂໍ້ມູນ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={UpdatePrize} method='PUT' encType='multipart/form-data'>
                        <Form.Group controlId='prizeid'>
                            <Form.Label>ເມືອງໃນແຂວງ {province.filter((e) => e.id === provinceId).map((e) => e.name)} ທັງຫມົດ</Form.Label>
                            <ul>
                                {district.filter((e) => e.provinceId === provinceId).map((e) =>
                                    <li value={e.id}>{e.name}</li>
                                )}
                            </ul>
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>
                                Close
                            </Button>
                            {/* <Button variant="primary" type='submit'>
                        ແກ້ໄຂ
                    </Button> */}
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default viewDIstrictModal