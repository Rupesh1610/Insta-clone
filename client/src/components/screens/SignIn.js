import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';


const SignIn = () => {
    const { dispatch } = useContext(UserContext);
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/signin', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
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
            toast.success("Sign In successfull", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                progress: undefined,
            });
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setTimeout(() => {
                Navigate('/')
            }, 2000)

            dispatch({ type: 'USER', payload: data.user })
        }
    }
    return (
        <div>
            <div className='mycard' style={{ maxWidth: "25rem" }}>
                <div className='container'>
                    <h2 className='text-center mt-4 mb-3' style={{ fontFamily: "Lobster" }}>Instagram</h2>
                    <form onSubmit={handleSubmit} name="myform">
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
                        <div className='text-center mt-3 mb-4 d-grid gap-2'>
                            <button type='submit' className='btn btn-info'>SIGN IN</button>
                        </div>
                        <hr />
                        <div className='mb-3 text-center'>
                            <Link to='/' style={{ textDecoration: "none" }}>Forgot Password?</Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className='text-center' style={{ border: "1px solid rgb(201, 198, 198)", borderRadius: "10px", width: "25rem", margin: "2rem auto" }}>
                <p className='pt-2'>Don't have an account ? <Link to="/signup" style={{ textDecoration: "none" }}>Sign up</Link></p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SignIn;
