import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

type FormValues = {
  email: string;
  password: string;
};

const initialValues: FormValues = {
  email: "",
  password: "",
};


const Login = () => {
  const navigate = useNavigate();

  //formik.handleSubmit: prevents default and invokes the onSubmit function in formik object

  // formik.handleChange: updates the state of our values in formik object based on the value attribute of the html element

  // formik.handleBlur changes boolean value from false to true when the field is interacted with

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string().required("invalid password"),
    }),
    onSubmit: (values: FormValues): void => {
      console.log(values);
      axios
        .post("http://localhost:4321/login", {
          password: values.password,
          email: values.email,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            navigate("navbar");

          }

        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>

      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="../assets/img/icon-black.png"
            alt="Contractual"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="register"><p className="font-medium text-indigo-600 hover:text-indigo-500">
              register for an account
            </p></Link>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    // autoComplete="email"
                    // required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    // placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (<p>{formik.errors.email}</p>) : (<p>&nbsp;</p>)}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    // autoComplete="current-password"
                    // required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    // placeholder="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (<p>{formik.errors.password}</p>) : (<p>&nbsp;</p>)}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


export default Login;
