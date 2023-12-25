import React from 'react'
import './Dashboard.scss'
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoPeopleOutline } from 'react-icons/io5';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { IoHelpOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoLockClosedOutline } from 'react-icons/io5';
import { IoLogOutOutline } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMenuOutline } from 'react-icons/io5';
import { IoEyeOutline } from 'react-icons/io5';
import { IoCartOutline } from 'react-icons/io5';
import { IonIcon } from '@ionic/react';
import { chatbubblesOutline } from 'ionicons/icons';
import { cashOutline } from 'ionicons/icons';
import Sidebar from './Sidebar';
import Header from '../../components/header/header';
const Dashboard = () => {
  return (
    <div>
        <Header/>
      <Sidebar/>

        <div class="main">
            <div class="cardBox">
                <div class="card">
                    <div>
                        <div class="numbers">1,504</div>
                        <div class="cardName">Daily Views</div>
                    </div>

                    <div class="iconBx">
                    <span><IoEyeOutline /></span>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">80</div>
                        <div class="cardName">Sales</div>
                    </div>

                    <div class="iconBx">
                    <span><IoCartOutline /></span>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">284</div>
                        <div class="cardName">Comments</div>
                    </div>

                    <div class="iconBx">
                    <IonIcon icon={chatbubblesOutline} />
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">$7,842</div>
                        <div class="cardName">Earning</div>
                    </div>

                    <div class="iconBx">
                    <IonIcon icon={cashOutline} />
                    </div>
                </div>
            </div>

           

              </div>
        </div>
    

  )
}

export default Dashboard;
