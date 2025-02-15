import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as yup from "yup"
export default function Checkout() {
  let navigate = useNavigate()
  let { cartID } = useParams()
  const [isLoading, setisLoading] = useState(false)
  const [apiError, setapiError] = useState("")
  function handlePayment(values) {
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:5173`, values, { headers: { token: localStorage.getItem("userToken") } })
      .then((res) => {
        if (res.data.status == "success") {
          setisLoading(false)
          navigate(`//${res.data.session.url}`)          
        }
      })
      .catch((res) => {
        setisLoading(false)
        console.log(res);
        // setapiError(res.response.formik.message)
      })
  }
  let myValidation = yup.object().shape({
    details: yup.string().required("Details is required").min(3, "Details min length is 3"),
    phone: yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Phone is not valid"),
    city: yup.string().required("City is required")
  })
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    validationSchema: myValidation,
    onSubmit: handlePayment
  });
  return <>
    <section className='h-screen'>
      <h1 className='md:mt-10 text-3xl text-emerald-400 font-bold'>Checkout</h1>
      <form className="max-w-md mx-auto mt-5 mb-6 pb-6" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} id="details" className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="floating_details" className="peer-focus:font-medium absolute left-0 text-lg font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white">Address Details</label>
          {formik.errors.details && formik.touched.details ? (
            <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.details}</span>
            </div>) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="num" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="pass" className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="floating_details" className="peer-focus:font-medium absolute left-0 text-white font-semibold text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.phone}</span>
            </div>) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} id="pass" className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="floating_details" className="peer-focus:font-medium absolute left-0 text-white font-semibold text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
          {formik.errors.city && formik.touched.city ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.city}</span>
            </div>) : null}
        </div>
        <button type="submit" className="me-4 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isLoading ? <i className="fa-solid fa-spinner animate-spin"></i> : <><i class="fa-brands fa-paypal text-white"></i> Pay Now</>}</button>
        <p className='mt-3'><Link className='text-white font-semibold' to={`/orders/${cartID}`}>Check My Orders</Link></p>
        {apiError ? <div className="p-4 my-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
          <span className="font-medium">{apiError}</span>
        </div> : null}
      </form>
    </section>

  </>
}
