import { useState, useEffect,useRef } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import '../../styles/form.css'
import { useNavigate ,Link} from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import axios from "../../api/axios";
function Register() {
  const LOGIN_URL = '/http://127.0.0.1:8000/';
const  API_URL='http://127.0.0.1:8000/api/register'
const { setAuth,persist,setPersist } = useAuth()

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  //const [formValues, setFormValues] = useState(user,email,password);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const userRef = useRef();
  const errRef = useRef();

  const  navigate=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register',
          JSON.stringify({ user,email,password }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));
      setAuth({ user,  password, });
       localStorage.setItem("access",);
     
      setUser('');
      setPassword('');
      setEmail('');
      navigate('/navigate');
  } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Login Failed');
      }
     // errRef.current.focus();
  }
    setFormErrors(validate(user,email,password));
    setIsSubmit(true);
  };
 


  const validate = () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!user) {
      errors.user= "Name is required!";
    } if (!email) {
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
    <div className="container">
  
      <form onSubmit={handleSubmit}>
        <h1>Register Form</h1>
        <div className="ui divider"></div>
        <div className="form-group">
        <div className="row">
         <div className="">
            <label>Name</label>
            <input
          
             className="text-light form-control input"
              type="text"
              name="Name"
              placeholder="Name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <p>{formErrors.user}</p>
          
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
        ¿you need login?<br />
            <span className="line">
             {/*put router link here*/}
                <Link to='/login'>Login</Link>
               </span>
          </p>
    </div>
    </>
  );
}

export default Register