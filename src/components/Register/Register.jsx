import React from 'react'
import style from "./Register.module.css"
import { Formik, useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import {UserContext} from '../../Context/UserContext'

export default function Register() {
  let { userLogin, setuserLogin } = useContext(UserContext)


  let navigate = useNavigate()
  const [apiError, setapiError] = useState("")
  const [isLoading, setisLoading] = useState(false)

  function handleRegister(values) {
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
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
    name: yup.string("Name should include only letters").required("Name is required").min(3, "Name should be at least 3 letters").max(20, "Name should be at most 12 letters"),
    email: yup.string().email("This email is not valid").required("Email is required").matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/),
    password: yup.string().min(6, "Password should be at least 5 letters").max(12, "Password should be at most 12 letters").required("Password is required"),
    rePassword: yup.string().oneOf([yup.ref("password")], "It doesn't match the password").required("Repassword is required"),
    phone: yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Phone is not valid")
  })

  let data = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: myValidation,
    onSubmit: handleRegister
  });


  return <>
    <h1 className='mt-10 text-3xl text-emerald-600 font-bold'>Register Now!</h1>
    <form className="max-w-md mx-auto mt-5 mb-6 pb-6" onSubmit={data.handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="name" value={data.values.name} onChange={data.handleChange} onBlur={data.handleBlur} id="name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute left-0 text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
        {data.errors.name && data.touched.name ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{data.errors.name}</span>
          </div> : null}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input type="email" name="email" value={data.values.email} onChange={data.handleChange} onBlur={data.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute left-0 text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        {data.errors.email && data.touched.email ? (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{data.errors.email}</span>
          </div>) : null}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input type="password" name="password" value={data.values.password} onChange={data.handleChange} onBlur={data.handleBlur} id="pass" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute left-0 text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        {data.errors.password && data.touched.password ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{data.errors.password}</span>
          </div> : null}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input type="password" name="rePassword" value={data.values.rePassword} onChange={data.handleChange} onBlur={data.handleBlur} id="repass" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute left-0 text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
        {data.errors.rePassword && data.touched.rePassword ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{data.errors.rePassword}</span>
          </div> : null}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input type="num" name="phone" value={data.values.phone} onChange={data.handleChange} onBlur={data.handleBlur} id="phone" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute left-0 text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile Number</label>
        {data.errors.phone && data.touched.phone ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{data.errors.phone}</span>
          </div> : null}
      </div>
      <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isLoading ? <i className="fa-solid fa-spinner animate-spin"></i> : "Register"}</button>
      {apiError ? <div className="p-4 my-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
        <span className="font-medium">{apiError}</span>
      </div> : null}
      <p className='mt-3 text-white'>Have an account?<Link className='ms-1 text-emerald-400 font-semibold' to={"/login"}>Login Now</Link></p>

    </form>
  </>

}
