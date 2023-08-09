import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import signuplogo from '../../assets/driver.png'
import { GlobalState } from '../../middlewares/global-states';
import Cookies from 'js-cookie'
import axios from 'axios'


const Signup = () => {
    const { dispatch } = useContext(GlobalState)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        await axios.post(`${process.env.REACT_APP_API_URL}/users/create`, {name:name, email:email, password:password, role:"Manufacturer"})
            .then(res => {
                Cookies.set("authToken", res.data.token);
                console.log(res.data);
                dispatch({ type: "FIRE_MODAL", payload: "" })
                navigate('/user')
            })
            .catch(err => alert(err.message))
        setIsLoading(false)
    }



    const closeModal = (e) => {
        e.preventDefault();
        dispatch({ type: 'FIRE_MODAL', payload: "" })
    }

    const openLoginModal = (e) => {
        e.preventDefault();
        dispatch({ type: 'FIRE_MODAL', payload: "LOGIN" })
    }


    return (
        <div className="max-w-5xl w-full flex bg-white absolute top-10 ">
            <div className="w-1/2">
                <form onSubmit={handleSubmit} className='p-8'>
                    <div className="space-y-3">
                        <h3 className='text-xl text-secondary'>Sign up as Manufacturer</h3>
                        <label htmlFor="name" className="flex flex-col">
                            <span className="">Name</span>
                            <input type="text" id='name' className="input-form" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label htmlFor="email" className="flex flex-col">
                            <span className="">Email</span>
                            <input type="email" id='email' className="input-form" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label htmlFor="password" className="flex flex-col">
                            <span className="">Password</span>
                            <input type="password" id='password' className="input-form" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <p>Already have an account?<span className="text-blue-500 underline cursor-pointer" onClick={(e) =>openLoginModal(e)}>Log In</span></p>
                    </div>
                    <div className='flex justify-between mt-8'>
                        <button type='cancel' className='px-8 py-2 border-[1px] border-slate-500 rounded-md text-sm text-slate-500 font-semibold'
                            onClick={(e) => closeModal(e)}
                        >
                            Back
                        </button>
                        <button type="submit" className={`btn font-semibold bg-secondary ${isLoading ? 'opacity-60' : ""}`} disabled={isLoading}>{!isLoading ? "Submit" : "Submiting..."}</button>
                    </div>

                </form>
            </div>
            <div className='w-1/2 bg-primary flex p-8'>
                <img src={signuplogo} alt="signup-logo" />
            </div>
        </div>
    )
}

export default Signup