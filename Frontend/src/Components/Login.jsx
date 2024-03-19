import React  from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


const Login = () => {

 const showPassword = () => {
  var x = document.getElementById("Showpassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
 }

  return (
    <>
       <div className='Login_Page_Full'>
            <title>Login Page</title>
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
                  <form className='Login_Page' id='loginForm' method='post' action='' >
                    <h1 className='Name_Log'>
                      Log in To <span className='Music_Name_Ex'> Music Explore</span>
                    </h1>
                  <div className='Email-User_Field'>
                    <div class="input-field">
                      <input type="email" required  name='Email' /> 
                      <label  className='Enter_Email' >Enter email</label>
                    </div>
                  </div>
                  <div className='Password_Field'>
                    <div class="input-field">
                      <input  id="Showpassword" type="Password" required  name='Password' /> 
                      <label  className='Enter_Email' >Password</label>
                    </div>
                  </div>
                  <div className='Password-Show'>

                    <div className='Show_password'>
                      <input type="checkbox" id="showPassword" onClick={showPassword} /><label htmlFor="showPassword" className="Show_pass">Show Password</label>
                    </div>

                    <div className='Forgot_Password'>
                      <Link to="/Forgot-password" className='forgot_Password_user'>Forgot Password</Link>
                    </div>

                  </div>

                  <div className='Submit_Button'>
                    <input type='submit' value={'Log In'}/>
                  </div>

                  </form>

                <div className='Hr_Line'>
                  <div className='Hr_Line_txt'>
                      <p className='Hr_Line_Er'>or</p>
                  </div>
                    <div className='Sign_up-Page'>
                    <p className='Link_send'> Don't have an account? <Link className='Link_Sign-Up' to='/Signup'>Sign up</Link></p>
                    </div>
                </div>

              </div>
            </div>

           </div>
      </div>  
    
    </>
  )
}

export default Login