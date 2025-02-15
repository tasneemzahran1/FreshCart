import React, { useContext } from 'react'
import style from "./Login.module.css"
import { Formik, useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Register from './../Register/Register';
import { UserContext } from '../../Context/UserContext'
export default function Login() {
  let { userLogin, setuserLogin } = useContext(UserContext)
  let navigate = useNavigate()
  const [apiError, setapiError] = useState("")
  const [isLoading, setisLoading] = useState(false)

  function handleLogin(values) {
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setisLoading(false)
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token)
          navigate("/")
          setuserLogin(res.data.token)
        }


      })
      .catch((res) => {
        setisLoading(false)
        setapiError(res.response.data.message)
      })
  }


  let myValidation = yup.object().shape({
    email: yup.string().email("This email is not valid").required("Email is required").matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/),
    password: yup.string().min(6, "Password should be at least 5 letters").max(12, "Password should be at most 12 letters").required("Password is required"),
  })

  let data = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: myValidation,
    onSubmit: handleLogin
  });


  return <>
    <section className='h-screen'>
      <h1 className='mt-10 text-3xl text-emerald-400 font-bold'>Login Now!</h1>
      <form className="max-w-md mx-auto mt-5 mb-6 pb-6" onSubmit={data.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" value={data.values.email} onChange={data.handleChange} onBlur={data.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          {data.errors.email && data.touched.email ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{data.errors.email}</span>
            </div>) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" value={data.values.password} onChange={data.handleChange} onBlur={data.handleBlur} id="pass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          {data.errors.password && data.touched.password ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{data.errors.password}</span>
            </div>) : null}
        </div>
        <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isLoading ? <i className="fa-solid fa-spinner animate-spin"></i> : "Login"}</button>
        {apiError ? <div className="p-4 my-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
          <span className="font-medium">{apiError}</span>
        </div> : null}
        <p className='mt-3'><Link to={"/forgot-password"} className='text-emerald-400 font-semibold'>Forgot your password?</Link></p>
        <p className='mt-3 text-white'>Don't have an account?<Link className='ms-1 text-emerald-400 font-semibold' to={"/register"}>Register Now</Link></p>

      </form>
    </section>

  </>

}
