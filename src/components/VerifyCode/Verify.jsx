import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup"
export default function Verify() {
    const [isLoading, setisLoading] = useState(false)
    let navigate = useNavigate()
    function handleVerify(values) {
        setisLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
            .then((res) => {
                if (res.data.status == "Success") {
                    setisLoading(false)
                    navigate(`/reset-password`)
                }
            })
            .catch((err) => {
                setisLoading(false)
                toast.error(err?.response?.data?.message);
            })
    }
    let myValidation = yup.object().shape({
        resetCode: yup.string().required("Code is required").matches(`^[0-9]{4,6}$`, "Invalid Code")
    })

    let formik = useFormik({
        initialValues: {
            resetCode: ""
        },
        validationSchema: myValidation,
        onSubmit: handleVerify
    });
    return <section className='h-screen'>
    <h1 className='mt-10 mb-10 text-3xl text-white font-bold'>Please enter your Verification Code</h1>
        <form className="max-w-md m-auto items-center mt-10 mb-6 pb-6" onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="resetCode" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} id="resetCode" className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute left-0 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-md text-white font-semibold">Verification Code</label>
                {formik.errors.resetCode && formik.touched.resetCode ? (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{formik.errors.resetCode}</span>
                    </div>) : null}
                <button type="submit" className="mt-10 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isLoading ? <i className="fa-solid fa-spinner animate-spin"></i> : "Verify"}</button>
            </div>
        </form>
    </section>
}