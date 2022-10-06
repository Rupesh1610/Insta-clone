import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
    const Navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/signup', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        const data = await res.json();
        if (data.error) {
            toast.error(data.error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                progress: undefined,
            });
        } else {
            toast.success(data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                progress: undefined,
            });
            setTimeout(() => {
                Navigate('/signin')
            }, 2000)
        }
    }

    return (
        <div className='mycard' style={{ maxWidth: "25rem" }}>
            <div className='container'>
                <h2 className='text-center mt-4 mb-3' style={{ fontFamily: "Lobster" }}>Instagram</h2>
                <form onSubmit={handleSubmit} name="myform">
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder='Name'
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder='Email'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder='Password'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>

                    <div className='text-center'>
                        <p><i>By signing up you agree to our <b>Terms</b>, <b>Privacy policy</b> and <b>Cookies policy</b>.</i></p>
                    </div>
                    <div className='text-center mt-3 mb-4 d-grid gap-2'>
                        <button type='submit' className='btn btn-info'>SIGN UP</button>
                    </div>
                    <hr />
                </form>
                <div className='text-center'>
                    <p>Have an account? <Link to="/signin" style={{ textDecoration: "none" }}>Sign in</Link></p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SignUp;














































