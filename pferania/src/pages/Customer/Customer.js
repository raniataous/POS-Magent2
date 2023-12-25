import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/header/header'
import Sidebar from '../Dashboard/Sidebar'
import { Link } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const Customer = () => {
  const [token, setToken] = useState('');
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const tokenResponse = await axios.post(
        'https://magento.test/rest/V1/integration/admin/token',
        {
          username: 'admin',
          password: 'admin@123',
        }
      );
      setToken(tokenResponse.data);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get(
        'https://magento.test/rest/V1/customers/search?searchCriteria[pageSize]=40',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setCustomers(response.data.items);
    };
    if (token) {
      fetchCustomers();
    }
  }, [token]);

 /* const handleDeleteCustomer = async (customerId) => {
    await axios.delete(
      `https://magento.test/rest/V1/customers/${customerId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    setCustomers(customers.filter((customer) => customer.id !== customerId));
  };

  const handleAddCustomer = async () => {
    try {
      const customerData = {
        customer: {
          firstname: firstName,
          lastname: lastName,
          email: email,
        },
      };

      const response = await axios.post(
        'https://magento.test/rest/default/V1/customers',
        customerData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setCustomers([...customers, response.data]);
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setFirstName(customer.firstname);
    setLastName(customer.lastname);
    setEmail(customer.email);
  };

  const handleUpdateCustomer = async () => {
    try {
      const customerData = {
        customer: {
          firstname: firstName,
          lastname: lastName,
          email: email,
        },
      };

      const response = await axios.put(
        `https://magento.test/rest/default/V1/customers/${editingCustomer.id}`,
        customerData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setCustomers(
        customers.map((customer) =>
          customer.id === editingCustomer.id ? response.data : customer
        )
      );
      setEditingCustomer(null);
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (error) {
      console.error(error);
    }
  };*/
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  const filteredCustomers = customers.filter((customer) => {
    const fullName = `${customer.firstname} ${customer.lastname}`;
    return fullName.toLowerCase().startsWith(searchQuery.toLowerCase());
  });
  
  return (
    <div>
      <Header/>
      <Sidebar/>
      <div className="search">
<label>
<span><IoSearchOutline className='icon ' /></span>
<input
  type="text"
  placeholder="Search here"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
   
</label>
</div>
      <div class="details">
                <div class="recentOrders">
                    <div class="cardHeader">
                        <h4>Customer Listing</h4>
                        <button className="btn" onClick={openModal}>
        Add New (+)
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
 
        <button onClick={closeModal}>Close Modal</button>
      </Modal>                    </div>
                    <table>
                        <thead>
    
          <tr>
            <th>ID</th>
            <th> Name</th>
            <th>Email</th>
            <th>Phone</th>

            <th>Zip</th>
            <th>Country</th>
            <th>City</th>
            <th>created</th>

            <th>Actions</th>
          </tr>
        </thead>
        
          
        <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.firstname}{customer.lastname}</td>
                  <td>{customer.email}</td>

                  <td>{customer.addresses[0]?.telephone}</td>
                  <td>{customer.addresses[0]?.postcode}</td>
                  <td>{customer.addresses[0]?.street}</td>
                  <td>{customer.addresses[0]?.city}</td>
                  <td>{customer.created_at}</td>

                  

                  <td>
               
                    <button  className="status inProgress">
                      Edit
                    </button>
                
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
        </div>
        </div>
        </div>
     
  
  )
}

export default Customer;
