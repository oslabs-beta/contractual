import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch} from 'react-redux'
import { getUserData } from '../state/features/contractSlice';

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const initialValues: FormValues = {
  name: '',
  email: '',
  password: '',
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // formik.handleSubmit: prevents default and invokes the onSubmit function in formik object

  // formik.handleChange: updates the state of our values in formik object based on the value attribute of the html element

  // formik.handleBlur changes boolean value from false to true when the field is interacted with

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email format').required('Required'),
      password: Yup.string().required('invalid password'),
    }),
    onSubmit: (values: FormValues): void => {
      axios
        .post('http://localhost:4321/register', {
          name: values.name,
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          navigate('../navbar');
          dispatch(getUserData(response.data));
        })
        .catch((error) => {
          console.log(error);
          navigate('../');
        });
    },
  });

  return (
    <>
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white h-screen'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img
            className='mx-auto h-12 w-auto'
            src='../assets/img/icon-black.png'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Register
          </h2>
          <div className='mt-2 text-center text-sm text-gray-600'>
            or{' '}
            <Link to='/'>
              <p className='font-medium text-blue-600 hover:text-blue-500'>
                Login to your account
              </p>
            </Link>
          </div>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Username
                </label>
                <div className='mt-1'>
                  <input
                    id='name'
                    name='name'
                    type='name'
                    // autoComplete="name"
                    // required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    // placeholder="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.name && formik.errors.name ? (<p style={{color: 'red'}}>{formik.errors.name}</p>) : (<p>&nbsp;</p>)}
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email address
                </label>
                <div className='mt-1'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    // autoComplete="email"
                    // required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    // placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (<p style={{color: 'red'}}>{formik.errors.email}</p>) : (<p>&nbsp;</p>)}
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Password
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    // autoComplete="current-password"
                    // required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    // placeholder="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (<p style={{color: 'red'}}>{formik.errors.password}</p>) : (<p>&nbsp;</p>)}
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
