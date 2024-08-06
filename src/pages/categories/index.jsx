import {useEffect, useState} from "react";
import axios from "../../api";
import {Button, Col, Container, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {FaPlus, FaTrash} from "react-icons/fa";
import dayjs from "dayjs";
import {Controller, useForm} from "react-hook-form";
import {types} from "../../data.js";
import 'bootstrap/dist/css/bootstrap.css';

const Categories = () => {
    const [data, setData] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [modal, setModal] = useState(false)
    const {control, handleSubmit, reset} = useForm({
        defaultValues: {
            type: 1
        }
    })

    const getData = async (showLoader = true) => {
        setIsFetching(showLoader)
        const data = await axios.get('dashboard/categories/index')
        setData(data?.categories)
        setIsFetching(false)
    }

    const deleteCategory = async (id) => {
        await axios.delete(`dashboard/categories/delete/${id}`)
        getData(false)
    }

    const toggleModal = () => {
        setModal(prev => !prev)
    }

    const addCategory = async (values) => {
        await axios.post('dashboard/categories/store', values)
        reset({
            name: '',
            type: null,
            image: ''
        })
        toggleModal()
        getData(false)
    }


    useEffect(() => {
        getData()
    }, [])

    return (
        !isFetching && (
            <Container fluid className="mt-5">
                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>
                        Add Category
                    </ModalHeader>
                    <ModalBody>
                        <form id="add-category" onSubmit={handleSubmit(addCategory)}>
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Controller render={({field: {value, onChange}}) => (
                                    <Input id="name" value={value} onChange={onChange}/>
                                )} name="name" control={control}/>
                            </div>
                            <div>
                                <Label htmlFor="image">Image</Label>
                                <Controller render={({field: {value, onChange}}) => (
                                    <Input id="image" value={value} onChange={onChange}/>
                                )} name="image" control={control}/>
                            </div>
                            <div>
                                <Label htmlFor="type">Type</Label>
                                <Controller render={({field: {value, onChange}}) => (
                                    <select className="form-control" name="type" id="type" value={value} onChange={onChange}>
                                        {types.map(item => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                )} name="type" control={control}/>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="button" outline onClick={toggleModal}>Close</Button>
                        <Button color="primary" type="submit" form="add-category">Save</Button>
                    </ModalFooter>
                </Modal>
                <h3>Categories ({data.length})</h3>
                <Row className="gap-4">
                    <Col sm={12} md={3}>
                        <Button color="success" onClick={toggleModal}><FaPlus className="d-flex"/></Button>
                    </Col>
                    <Col sm={12}>
                        <Table hover responsive bordered>
                            <thead>
                            <tr>
                                <th>NO</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Image</th>
                                <th>Created at</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.type === 1 ? 'Main' : 'ChatGpt'}</td>
                                    <td>
                                        {item.image && <img src={item.image} alt="" width="50px" height="50px"/>}
                                    </td>
                                    <td>{dayjs(item.created_at).format('DD.MM.YYYY HH:mm')}</td>
                                    <td>
                                        <Button color="danger" onClick={() => deleteCategory(item.id)}><FaTrash className="d-flex"/></Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    );
    
}

export default Categories