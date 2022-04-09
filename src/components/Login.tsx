import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup"

type FormValues = {
  email: string,
  password: string
}

const initialValues: FormValues = {
  email: "",
  password: ""
}


// console.log(formik.values);

const Login = () => {

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string().required("invalid password")
    }),
    onSubmit: (values: FormValues): void => {
      console.log(values);
    }
  });

  console.log("errors: ", formik.errors);
  return (
    <div>
      <section className="heading">
        <h1>Login</h1>
      </section>
      <section className="form-container">
        <form onSubmit={formik.handleSubmit} className="form-login">
          <input 
            className="form-text-field"
            type="email" 
            id='email' 
            name='email' 
            placeholder="Email" 
            value={formik.values.email} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
            {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : <p>&nbsp;</p> }
          <input 
            className="form-text-field"
            type="password" 
            id='password' 
            name='password' 
            placeholder="password" 
            value={formik.values.password} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : <p>&nbsp;</p> }
          <button type="submit">Login</button>
        </form>
      </section>
    </div>
  )

};


export default Login;