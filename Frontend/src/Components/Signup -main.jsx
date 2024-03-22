import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const history = useHistory();
  const [passwordType, setPasswordType] = useState('password');
  const [values, setValues] = useState({
    name: '',
    userid: '',
    email: '',
    password: ''
  });

  const showPassword = () => {
    setPasswordType(prevType => prevType === 'password' ? 'text' : 'password');
  };

  const handleSign = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSignSubmit = (event) => {
    event.preventDefault();
    axios.post('/Signup', {
      name: values.name,
      userid: values.userid,
      email: values.email,
      password: values.password
    })
    .then(res => {
     // console.log();
      // Clear the form data upon successful signup
      setValues({
        name: '',
        userid: '',
        email: '',
        password: ''
      });
      // Redirect to login page
      history.push('/Login');
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='Login_Page_Full'>
      <title>Signup</title>
      <div className='Login_page'>
        <div className='Dark_Btn_Logo'>
          <div className='Logo_Music'>
            {/* <Link className="Music_Name-Ex" to="/Home">Music Explore</Link> */}
          </div>
          <div className='Dark_Btn_Switch'>
            <Link className="Music_Name-Ex" to="/Home">Music Explore</Link>
          </div>
        </div>
        <div className='Login_From'>
          <div className='Login_From_Create'>
            <form className='Login_Page' id='loginForm' onSubmit={handleSignSubmit}>
              <h1 className='Name_Sign_e3'>Sign up to start <span className='Music_Name'><br/>listening</span></h1>
              <div className='Name-User_Field'>
                <div className="input-field">
                  <input type="text" required name='name' onChange={handleSign} value={values.name}/>
                  <label className='Enter_Email'>Name</label>
                </div>
              </div>
              <div className='Name-User_Field'>
                <div className="input-field">
                  <input type="text" required name='userid' onChange={handleSign} value={values.userid}/>
                  <label className='Enter_Email'>User Id</label>
                </div>
              </div>
              <div className='Email-User_Field'>
                <div className="input-field">
                  <input type="email" required name='email' onChange={handleSign} value={values.email}/>
                  <label className='Enter_Email'>Enter email</label>
                </div>
              </div>
              <div className='Cn_Passwords'>
                <div className='Password_Field'>
                  <div className="input-field">
                    <input id="Showpassword" type={passwordType} required name='password' onChange={handleSign} value={values.password}/>
                    <label className='Enter_Email'>Password</label>
                  </div>
                </div>
                <div className='Error_msg'>
                  <p className='Msg_error'></p>
                </div>
              </div>
              <div className='Password-Show'>
                <div className='Show_password'>
                  <input type="checkbox" id="showPassword" onClick={showPassword}/>
                  <label htmlFor="showPassword" className="Show_pass">Show Password</label>
                </div>
              </div>
              <div className='Submit_Button_Sign'>
                <input type='submit' value={'Submit'}/>
              </div>
            </form>
            <div className='Hr_Line'>
              <div className='Hr_Line_txt'>
                <p className='Hr_Line_Er'>or</p>
              </div>
              <div className='Sign_up-Page'>
                <p className='Link_send'> Already have an account? <Link className='Link_Sign-Up' to='/Login'>Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
