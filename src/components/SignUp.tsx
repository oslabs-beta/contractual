import {useState, useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup"

type FormValues = {
  name: string,
  email: string,
  password: string
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: ""
}

const SignUp = () => {

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string().required("invalid password")
    }),
    onSubmit: (values: FormValues): void => {
      // can use ajax in here, axios perhaps?
      console.log(values);
    }
  });
  //formik.handleSubmit: prevents default and invokes the onSubmit function in formik object

  // formik.handleChange: updates the state of our values in formik object based on the value attribute of the html element

  // formik.handleBlur changes boolean value from false to true when the field is interacted with
  console.log("errors: ", formik.errors);

  return (
    <div>
      <section className="heading">
        <h1>Register</h1>
      </section>
      <section className="form-container">
        <form onSubmit={formik.handleSubmit} className="form-login">
          <input 
            className="form-text-field"
            type="name" 
            id='name' 
            name='name' 
            placeholder="name" 
            value={formik.values.name} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
            {formik.touched.name && formik.errors.name ? <p>{formik.errors.name}</p> : <p>&nbsp;</p> }
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
          <button type="submit">sign up</button>
        </form>
      </section>
    </div>
  )

};


export default SignUp;