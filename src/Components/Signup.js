import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const Signup = () => {
    const [signUpCreds, setSignUpCreds] = useState({ uname: "", email: "", password: "", cpassword: "" });
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name: signUpCreds.uname, email: signUpCreds.email, password: signUpCreds.password })
        });
        const json = await response.json();
        setIsLoading(false);
        if (json.success) {
            localStorage.setItem('token', json.token);
            navigate('/')
        }
        else {
            alert("An Error Occured");
        }
    }
    const onChange = (e) => {
        setSignUpCreds({ ...signUpCreds, [e.target.name]: e.target.value })
    }
    return (
        <>
            {!isLoading && <div className='container d-flex justify-center my-36'>
                <form onSubmit={handleSignup}>
                    <div className="mb-3 w-80">
                        <label htmlFor="uname" className="form-label text-lg ">Username</label>
                        <input type="text" className="form-control " id="uname" placeholder='Username' name="uname" value={signUpCreds.uname} onChange={onChange} />
                    </div>
                    <div className="mb-3 w-80">
                        <label htmlFor="email" className="form-label text-lg ">Email address</label>
                        <input type="email" className="form-control " id="email" aria-describedby="emailHelp" placeholder='Email' name="email" value={signUpCreds.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-lg" >Password</label>
                        <input type="password" className="form-control" id="password" placeholder='Password' name="password" value={signUpCreds.password} onChange={onChange} minLength={8} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label text-lg" >Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" placeholder='Confirm Password' name="cpassword" value={signUpCreds.cpassword} onChange={onChange} minLength={8} />
                    </div>
                    <button type="submit" className="btn btn-outline-primary mt-3" >Signup</button>
                </form>
            </div>}
            {isLoading && <Spinner />}
        </>
    )
}

export default Signup;