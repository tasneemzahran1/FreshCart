import axios from 'axios'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup"

export default function ChangePassword() {
    let navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)
    let myValidation = yup.object().shape({
        currentPassword: yup.string().required("This field is required").min(3, "Details min length is 3"),
        password: yup.string().min(6, "Password should be at least 5 letters").max(12, "Password should be at most 12 letters").required("Password is required"),
        rePassword: yup.string().oneOf([yup.ref("password")], "It doesn't match the password").required("Repassword is required"),
    })
    let formik = useFormik({
        initialValues: {
            currentPassword: "",
            password: "",
            rePassword: ""
        },
        validationSchema: myValidation,
        onSubmit: changePW
    });
    let headers = { token: localStorage.getItem("userToken") }
    function changePW(values) {
        setisLoading(true)
        axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, values, { headers })
            .then((res) => {
                localStorage.setItem("userToken", res?.data?.token)
                if (res?.data?.message == "success") {
                    setisLoading(false)
                    toast.success("Password is changed successfully")
                    navigate(`/`)
                }
            }
            )
            .catch((err) => console.log(err)
            )
    }
    return <section className='h-screen'>

        <h1 className='md:mt-10 text-3xl text-emerald-400 font-bold'>Change Password</h1>
        <form className="max-w-md mx-auto mt-5 mb-6 pb-6" onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="currentPassword" value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="details" className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                <label htmlFor="floating_details" className="peer-focus:font-medium absolute left-0 text-lg font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white">Current Password</label>
                {formik.errors.currentPassword && formik.touched.currentPassword ? (
                    <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{formik.errors.currentPassword}</span>
                    </div>) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="pass" className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                <label htmlFor="floating_details" className="peer-focus:font-medium absolute left-0 text-white font-semibold text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                {formik.errors.password && formik.touched.password ? (
                    <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{formik.errors.password}</span>
                    </div>) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="pass" className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                <label htmlFor="floating_details" className="peer-focus:font-medium absolute left-0 text-white font-semibold text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Repassword</label>
                {formik.errors.rePassword && formik.touched.rePassword ? (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{formik.errors.rePassword}</span>
                    </div>) : null}
            </div>
            <button type="submit" className="me-4 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isLoading ? <i className="fa-solid fa-spinner animate-spin"></i> : "Change Now"}</button>

        </form>
    </section>
}
