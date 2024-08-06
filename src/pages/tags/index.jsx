import React, { useEffect, useState } from 'react';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import dayjs from 'dayjs';
import { FaPlus, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Controller, useForm } from 'react-hook-form';
import instance from '../../api/';

const Tags = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState(''); 
  const { control, handleSubmit, reset } = useForm();

  const getTags = async () => {
    try {
      const response = await instance.get('dashboard/tags/index');
      setData(response.tags);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleModal = () => {
    setModal(prev => !prev);
  };

  const addTags = async (values) => {
    await instance.post(`dashboard/tags/store`, values);
    toggleModal();
    getTags();
    reset({
      name: "",
    });
  };

  const deleteTags = async (id) => {
    await instance.delete(`dashboard/tags/delete/${id}`);
    getTags();
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader>
          Add Tags
        </ModalHeader>
        <ModalBody>
          <form action="" onSubmit={handleSubmit(addTags)} id='form'>
            <div>
              <label htmlFor="name">Name</label>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <Input
                    id='name'
                    value={value}
                    onChange={onChange}
                  />
                )}
                name='name'
                control={control}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => { toggleModal() }}>Close</button>
          <button className="btn btn-primary" form='form'>Save</button>
        </ModalFooter>
      </Modal>
      <h2>Tags ({data.length})</h2>
      <ToastContainer />

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <Table striped>
        <button className='btn btn-success mb-4 mt-4' onClick={toggleModal}><FaPlus style={{color:'white',}} className="d-flex"/></button>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{dayjs(item.created_at).format('DD.MM.YYYY HH:mm')}</td>
              <td>
                <button className='btn btn-danger' onClick={() => {
                  deleteTags(item.id)
                }}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tags;