import React from 'react';
import {Link} from 'react-router-dom';

function RegisterPage() {
  return (
    <div className='auth-Wrapper'>
        <div style={{textAlign:"center"}}>
            <h3>Register</h3>
        </div>
        <form>
        
        <label>Email</label>
        <input
            name="email"
            type="email"
        />
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <label>Name</label>
        <input
            name="name"
        />
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <label>Password</label>
        <input
            name="password"
            type="password"
        />
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <label>Password Confirm</label>
        <input
            name="password_confirm"
            type="password"
        />
        {/* {errors.exampleRequired && <p>This field is required</p>} */}
        <input type="submit" />
        </form>

        <BrowserRouter>
          <Link style={{color:"gray", textDecoration:"none"}} to="login">이미 아이디가 있다면...</Link>
        </BrowserRouter>
    </div>
  )
}

export default RegisterPage;