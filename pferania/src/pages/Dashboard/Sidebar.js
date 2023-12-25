import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.scss'
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoPeopleOutline } from 'react-icons/io5';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { IoHelpOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoLockClosedOutline } from 'react-icons/io5';
import { IoLogOutOutline } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import { FaFileInvoice } from 'react-icons/fa';


const Sidebar = () => {
  
  return (
    <div>
      <div class="navigation">
          
              <ul>
              <li>
                   
                </li>
                <li>
                    <Link to = "/Da">
                        <span className="iconn"><FaHome /></span>
                        <span className="titlee">Dashboard</span>
                        </Link>
                </li>
                <li>
                <Link to = "/Home">
                        <span class="iconn">
                        <FaShoppingCart /> 
                        </span>
                        <span class="titlee">Order</span>
                </Link>
                </li>
                <li>
                <Link to = "/Customer">
                        <span class="iconn">
                        <IoPeopleOutline />
                        </span>
                        <span class="titlee">Customer</span>
                </Link>
                </li>
            
                <li>

                <Link to = "/Invoice">
                        <span class="iconn">
                        <FaFileInvoice /> </span>
                    
                        <span class="titlee">Invoice</span>
                    </Link>
                </li>

                
            </ul>
        </div>
    </div>
  )
}

export default Sidebar
