import Image from './bg.png';
import  './Login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react';
import axios from 'axios';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    }
    
    const passwordInputType = showPassword ? "text" : "password";
    
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Reset errors
      setEmailError('');
      setPasswordError('');
  
      // Check for empty fields
      if (!email) {
        setEmailError('Please enter your email.');
      }
  
      if (!password) {
        setPasswordError('Please enter your password.');
      }
  
      // If there are any errors, stop processing
      if (emailError || passwordError) {
        return;
      }
  
      try {
        const response = await axios.post(
          'https://magento.test/rest/V1/integration/customer/token',
          {
            username: email,
            password: password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const token = response.data;
        const userResponse = await axios.get(
          'https://magento.test/rest/V1/customers/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const user = userResponse.data;
        if (user.id === 13) {
          console.log("success");
          window.location.href = "/Da";
        } 
      } catch (error) {
        // If the error is due to invalid email/password, show error message
        if (error.response && error.response.status === 401) {
          setEmailError('Invalid email or password.');
          setPasswordError('Invalid email or password.');
        } else {
          
        }
      }
    };
  
    return (
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form  className="sign-in-form" onSubmit={handleSubmit}>
              <h2 className="title">Welcome  <span>Back!</span> </h2>
              <div className="input-field">
                <FontAwesomeIcon icon={faUser}  className="icon"/>
                <input  placeholder="Username" type="email"  value={email} onChange={handleEmailChange}/>
                {emailError && <div className="error">{emailError}</div>}
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faLock}  className="icon"/>
                <input   type={passwordInputType} placeholder="Password"  className='tit'  id="password" value={password} onChange={handlePasswordChange}  />
                <FontAwesomeIcon  icon={faEye} className="yeux" onClick={toggleShowPassword} />
                {passwordError && <div className="error1">{passwordError}</div>}
              </div>
              <p className="social-text1">Forgot your password?</p>
              <button  className="btn solid" type="submit">Login
  </button>
         
           
           
          </form>
        
        </div>
      </div>

      <div className="panels">
        <div className="panel left-panel">
        <img src={Image} className="image" alt="" />
        </div>
        
      </div>
    </div>

  );
};

export default Login;
 