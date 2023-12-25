import React from 'react'
import  { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import { getCartTotal } from '../../store/cartSlice';
import './header.scss'
import { Link } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import '../../pages/Dashboard/Dashboard.scss'
import axios from "axios";

import Images from './12.jpg' ;
import Images1 from './1.png' 

import Modal from 'react-modal';
Modal.setAppElement('#root');

const Header = () => {

  const [token, setToken] = useState('');
  const [customers, setCustomers] = useState([]);
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
        'https://magento.test/rest/V1/customers/search?searchCriteria[filter_groups][0][filters][0][field]=entity_id&searchCriteria[filter_groups][0][filters][0][value]=13&searchCriteria[filter_groups][0][filters][0][condition_type]=eq        ',
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

    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const handleModalOpen = () => {
      setModalIsOpen(true);
    };
  
    const handleModalClose = () => {
      setModalIsOpen(false);
    };
  const dispatch = useDispatch();
  const {totalItems} = useSelector((state => state.cart));

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


 
 
  
  return (
    <div>
       <nav className = "navbar">
      <div className='navbar-content'>
        <div className = "container">
          <div className = "navbar-top flex flex-between">

              <div className = "navbar-btns">
                <Link to = "" className="add-to-cart-btn flex">
                  <div className='btn-txt cart'><i className = "fas fa-shopping-cart f"/>
                    <span className='cart-count-value'>{totalItems}</span>
                    
                  </div>
                </Link>
               
              </div>
              <div>
                <button onClick={handleModalOpen} className='user'><img src={Images} alt="" />
    </button>
                   <button onClick={handleModalOpen}className="user1" ><img src={Images1} alt=""/></button></div>
              
             </div>
          </div>
    </div>
    </nav>
    </div>
  )
}

export default Header
/* <div class="search">
<label>
<span><IoSearchOutline className='icon ' /></span>
    <input type="text" placeholder="Search here"/>
   
</label>
</div>
 <Modal  
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Exemple de fenêtre modale" 
      >
         
        <button onClick={handleModalClose} className='time'>   <i className = "fas fa-times"> 
            </i></button>
      </Modal>
*/


 


