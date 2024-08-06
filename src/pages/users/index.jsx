import React, { useEffect, useState } from 'react';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import dayjs from 'dayjs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Controller, useForm } from 'react-hook-form';
import instance from '../../api';
import { FaPlus } from 'react-icons/fa';

const Users = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const { control, handleSubmit, reset } = useForm();

  const getUsers = async () => {
    try {
      const response = await instance.get('users/index');
      setData(response.users);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const toggleModal = () => {
    setModal(prev => !prev);
  };

  const addUsers = async (values) => {
    await instance.post('users/store', values);
    toggleModal();
    getUsers();
    reset({
      name: "",
      surname: "",
      email: "",
      role: "",
      
    });
  };



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader>
          Add Categories
        </ModalHeader>
        <ModalBody>
          <form action="" onSubmit={handleSubmit(addUsers)} id='form'>
            <div>
              <label htmlFor="name">Name</label>
              <Controller render={({ field: { value, onChange } }) => (
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
            <div>
              <label htmlFor="surname">Surname</label>
              <Controller render={({ field: { value, onChange } }) => (
                <Input
                  id='Surname'
                  value={value}
                  onChange={onChange}
                />
              )}
                name='surname'
                control={control}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Controller render={({ field: { value, onChange } }) => (
                <Input
                  id='email'
                  value={value}
                  onChange={onChange}
                />
              )}
                name='email'
                control={control}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Controller render={({ field: { value, onChange } }) => (
                <Input
                  id='password'
                  value={value}
                  onChange={onChange}
                />
              )}
                name='password'
                control={control}
              />
            </div>
            <div>
              <label htmlFor="role_id">Role</label>
              <Controller name='role_id' control={control}
                render={({ field: { value, onChange } }) => (
                  <select className='form-control' id='role_id' name='role_id' value={value} onChange={onChange}>
                    {roles.map(item => (
                      <option key={item.id} className='form-control' value={item.id}>{item.name}</option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div>
              <label htmlFor="status">Status</label>
              <Controller name='status' control={control}
                render={({ field: { value, onChange } }) => (
                  <select className='form-control' id='status' name='status' value={value} onChange={onChange}>
                    {status.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                )}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => { toggleModal() }}>Close</button>
          <button className="btn btn-primary" form='form'>Save</button>
        </ModalFooter>
      </Modal>
      <h2>Users({data.length})</h2>
      <div className="mb-4">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          placeholder="Search by name "
        />
      </div>
      <ToastContainer />
      <Table striped>
        <button className='btn btn-success mb-4 mt-4' onClick={toggleModal}><FaPlus className="d-flex "/></button>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>SurName</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Update At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item.email}</td>
              <td>{item.role_id === 1 ? "Full success" : item.role_id}</td>
              <td>{item.status}</td>
              <td>{dayjs(item.created_at).format('DD.MM.YYYY HH:mm')}</td>
              <td>{dayjs(item.update_at).format('DD.MM.YYYY HH:mm')}</td>
              <td></td>
              {/* <td>
                <button className='btn btn-danger' onClick={() => {
                  deleteUsers(item.id)
                }}>
                  <FaTrash />
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;