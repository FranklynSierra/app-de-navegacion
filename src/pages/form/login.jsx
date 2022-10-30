import { useState, useEffect,useRef, useContext } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import '../../styles/form.css'
import { useNavigate ,Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { set } from "react-hook-form";

function Login() {
  const LOGIN_URL = '/http://127.0.0.1:8000/';

  const {setAuth,loginUser} =useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [succes, setSucces] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const  navigate=useNavigate()
  let backupUser;
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const responseUser = await fetch(`${LOGIN_URL}/login`, {
          method: 'POST',
          // Se debe desplegar primero la aplicacion para poder dar credentials                
          credentials: 'include',
           withCredentials: true,
           mode: 'no-cors',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),

      });

      if(setFormErrors(validate(email,password))){

    
        if(responseUser != 401){
            alert('user logued')
            setAuth({password,email})
           
            setPassword('')
            setEmail('')
            navigate('/');
            setFormErrors(validate(email,password));
            
        }
      }
   
              
  } catch (error) {
      alert(error)
  }
  
    setIsSubmit(true);
  };
 


  const validate = () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!email) {
      errors.email = "Email is required!";
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!password) {
      errors.password = "Password is required";

    } else if (password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;

  };

  return (
    <>
    
    <NavBar></NavBar>
    {succes?(
      <Link to='/'>aqui</Link>
    ):(
    <div className="container">
  
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="form-group">
        <div className="row">
          
          <div className="field">
            <label>Email</label>
            <input
          className="text-light form-control input"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
            className="text-light form-control input"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
         
          <p>{formErrors.password}</p>
          <div className="d-grid w-100 mb-3">
            <button className="btn btn-outline-success btn-block">Submit</button>
          </div>
         
        </div>

        </div>
      </form>
      <p>
        ¿you need a count?<br />
            <span className="line">
             {/*put router link here*/}
                <Link to='/register'>Register</Link>
               </span>
          </p>
    </div>
    )}
    </>
  );
}

export default Login