//  eslint react/prop-types: 0 ;
import React, { Fragment, useState } from 'react';
// import axios from "axios";
//React/Redux package
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger'); //App.css
    } else {
      console.log('Registered');
      // 	const newUser = {
      // 		name,
      // 		email,
      // 		password
      // 	};

      // 	try {
      // 		const config = {
      // 			headers: {
      // 				"Content-Type": "application/json"
      // 			}
      // 		};

      // 		const body = JSON.stringify(newUser);

      // 		const res = await axios.post("/api/users", body, config);
      // 		console.log(res.data);
      // 	} catch (err) {
      // 		console.log(err.response.data);
      // 	}
      // 	console.log(formData);
      // 	register({ name, email, password });
    }
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account Today
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
          <small className='form-text'>
            For a profile image - use a Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder=' Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Member? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};
// const mapStateToProps = state => ({
// 	isAuthenticated: state.auth.isAuthenticated
// });

//Export Connect package
//Connect takes in 2 parameters- one is Get state from alerts and second an obj with any actions we want to use(this case Alert)

export default connect(null, { setAlert, register })(Register);
