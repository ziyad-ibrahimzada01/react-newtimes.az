import {
    Button, Col, Container, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input
  } from "reactstrap";
  import { useEffect, useState } from "react";
  import { FaPlus, FaTrash } from "react-icons/fa";
  import axios from '../../api/index.js';
  import dayjs from "dayjs";
  import { useForm, Controller } from 'react-hook-form';
  
  const Roles = () => {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [modal, setModal] = useState(false);
    const { control, handleSubmit, reset } = useForm();
  
    const getData = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get('/permission/roles');
        setData(response.roles);
        setIsFetching(false)
      } catch (error) {
        console.error("Failed to fetch data", error);
        setIsFetching(false)
      }
      
    };
  
    useEffect(() => {
      getData();
    }, []);
  
    const toggleModal = () => setModal(!modal);
  
    const addCategory = async (formData) => {
      try {
        await axios.post('/permission/roles', formData);
        getData(); 
        reset(); 
        toggleModal(); 
      } catch (error) {
        console.error("Failed to add category", error);
      }
    };
  
    const deleteCategory = async (id) => {
      try {
        await axios.delete(`/permission/roles/${id}`);
        getData(); 
      } catch (error) {
        console.error("Failed to delete category", error);
      }
    };
  
    return (
      <>
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <Container fluid className="mt-5">
            <Modal isOpen={modal} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal}>Add Role</ModalHeader>
              <ModalBody>
                <form id="add-category" onSubmit={handleSubmit(addCategory)}>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input id="name" {...field} />
                      )}
                    />
                  </div>
                  <ModalFooter>
                    <Button color="primary" type="button" outline onClick={toggleModal}>Close</Button>
                    <Button color="primary" type="submit">Save</Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </Modal>
            <h3>Roles ({data.length})</h3>
            <Row className="gap-4">
              <Col sm={12} md={3}>
                <Button color="success" onClick={toggleModal}><FaPlus className="d-flex" /></Button>
              </Col>
              <Col sm={12}>
                <Table hover responsive bordered>
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>Name</th>
                      <th>Created at</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{dayjs(item.created_at).format('DD.MM.YYYY HH:mm')}</td>
                        <td>
                          <Button color="danger" onClick={() => deleteCategory(item.id)}><FaTrash className="d-flex" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  };
  
  export default Roles;



// const Roles = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [modal, setModal] = useState(false);
//   const [search, setSearch] = useState(''); 
//   const { control, handleSubmit, reset } = useForm();

//   const getRoles = async () => {
//     try {
//       const response = await axiosInstance.get('permission/roles');
//       setData(response.data.roles);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getRoles();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   const addRoles = async (values) => {
//     await axiosInstance.post(`permission/storeUpdate`, values);
//     toggleModal();
//     getRoles();
//     reset({
//       name: ""
//     });
//   };

//   const deleteRoles = async (id) => {
//     await axiosInstance.delete(`permission/role/delete/${id}`);
//     getRoles();
//   };

//   const toggleModal = () => {
//     setModal(prev => !prev);
//   };

//   const filteredData = data.filter(item =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container mt-5">
//       <Modal isOpen={modal} toggle={toggleModal}>
//         <ModalHeader>
//           Add Roles
//         </ModalHeader>
//         <ModalBody>
//           <form action="" onSubmit={handleSubmit(addRoles)} id='form'>
//             <div>
//               <label htmlFor="name">Name</label>
//               <Controller
//                 render={({ field: { value, onChange } }) => (
//                   <Input
//                     id='name'
//                     value={value}
//                     onChange={onChange}
//                   />
//                 )}
//                 name='name'
//                 control={control}
//               />
//             </div>
//           </form>
//         </ModalBody>
//         <ModalFooter>
//           <button className='btn btn-danger' onClick={() => { toggleModal() }}>Close</button>
//           <button className="btn btn-primary" form='form'>Save</button>
//         </ModalFooter>
//       </Modal>
//       <h2>Roles</h2>
//       <ToastContainer />

//       <div className="mb-4">
//         <Input
//           type="text"
//           placeholder="Search by name"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />
//       </div>

//       <Table striped>
//         <button className='btn btn-success mb-4 mt-4' onClick={toggleModal}>Add</button>
//         <thead>
//           <tr>
//             <th>Number</th>
//             <th>Name</th>
//             <th>Created At</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((item, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{item.name}</td>
//               <td>{dayjs(item.created_at).format('DD.MM.YYYY HH:mm')}</td>
//               <td>
//                 <button className='btn btn-danger' onClick={() => {
//                   deleteRoles(item.id)
//                 }}>
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default Roles;