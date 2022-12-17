import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const Login = () => {
    const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ email: loginCreds.email, password: loginCreds.password })
        });
        const json = await response.json();
        setIsLoading(false);
        if (json.success) {
            localStorage.setItem('token', json.token);
            navigate('/')
        }
        else {
            alert("Invalid User");
        }
    }
    const onChange = (e) => {
        setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });

    }
    return (
        <>
            {!isLoading && <div className='container d-flex justify-center my-36'>
                <form onSubmit={handleLogin}>
                    <div className="mb-3 w-80">
                        <label htmlFor="email" className="form-label text-lg ">Email address</label>
                        <input type="email" className="form-control " id="email" aria-describedby="emailHelp" placeholder='Username' name="email" value={loginCreds.email} onChange={onChange} />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="password" className="form-label text-lg" >Password</label>
                        <input type="password" className="form-control" id="password" placeholder='Password' name="password" value={loginCreds.password} onChange={onChange} />
                    </div>
                    <div className='mb-3 d-flex justify-end'>
                        <a href="/login" className='cursor-pointer text-sm'>Forgot Password?</a>
                    </div>
                    <button type="submit" className="btn btn-outline-primary" disabled={isLoading}>Login</button>
                </form>
            </div>}
            {isLoading && <Spinner />}
        </>
    )
}

export default Login;