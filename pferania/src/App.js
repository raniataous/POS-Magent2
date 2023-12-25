import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// pages
import {Login,Home,Dashboard} from "./pages/index";
// components

import {Provider} from 'react-redux';
import store from "./store/store";
import Customer from './pages/Customer/Customer';
import Invoice from './pages/Invoice/Invoice';

import Navbar from './components/Navbar/Navbar';
import CartPage from './pages/CartPage/CartPage';
function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <BrowserRouter>
           <Routes>
           <Route path = "/" element = {<Login/>} />
           <Route path = "/Da" element = {<Dashboard/>} />
           <Route path = "/Customer" element = {<Customer/>} />
           <Route path = "/Invoice" element = {<Invoice/>} />
           <Route path="/" exact component={<Navbar/>} />
            <Route path = "/Home" element = {<Home/>} />
            <Route path = "/cart" element = {<CartPage/>} />


          </Routes>
        </BrowserRouter>
  
      
      </Provider>
    </div>
  );
}

export default App;