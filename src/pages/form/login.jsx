import { useState, useEffect } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import '../../styles/form.css'


function Login() {
  const initialValues = { Name: "",Lastname:"" , email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
       // TODO Submit
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.Name) {
      errors.Name = "Name is required!";
    }
    if (!values.Lastname) {
        errors.Lastname = "lastName is required!";
      }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <>
    <NavBar></NavBar>
    <div className="container">
  
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
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
              value={formValues.Name}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.Name}</p>
          
          <div className="field">
            <label>Email</label>
            <input
          className="text-light form-control input"
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
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
              value={formValues.password}
              onChange={handleChange} 
            />
          </div>
         
          <p>{formErrors.password}</p>
          <div className="d-grid w-100 mb-3">
            <button className="btn btn-outline-success btn-block">Submit</button>
          </div>
         
        </div>
        </div>
      </form>
    </div>
    </>
  );
}

export default Login