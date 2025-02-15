import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from "yup"
export default function Password() {
    const [isLoading, setisLoading] = useState(false)
    let navigate = useNavigate()
    function handleReset(values) {
        setisLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
            .then((res) => {
                if (res.data.statusMsg == "success") {
                    setisLoading(false)
                    navigate(`/verify`)
                }
            })
            .catch((res) => {
                setisLoading(false)
                console.log(res);
            })
    }
    let myValidation = yup.object().shape({
        email: yup.string().email("This email is not valid").required("Email is required").matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/),
    })

    let formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: myValidation,
        onSubmit: handleReset
    });
    return <section className='h-screen'>
        <h1 className='mt-10 text-3xl text-emerald-400 font-bold'>Please enter your Email</h1>
        <form className="max-w-md mx-auto mt-5 mb-6 pb-6" onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute left-0 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-md text-white font-semibold">Email address</label>
                {formik.errors.email && formik.touched.email ? (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{formik.errors.email}</span>
                    </div>) : null}
                <button type="submit" className="mt-4 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isLoading ? <i className="fa-solid fa-spinner animate-spin"></i> : "Reset"}</button>
            </div>
        </form>
    </section>
}
