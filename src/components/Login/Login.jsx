import React, { useRef, useState } from 'react';
import { auth } from './../../firebase.init';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, NavLink } from 'react-router-dom';

const Login = () => {

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('');
    const emailRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        //reset status
        setSuccess(false);
        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log('User signed in:', result.user);
                if (!result.user.emailVerified) {
                    console.log('Email not verified. Please verify your email.');
                    setError('Email is not verified. Please verify your email.');
                    return;
                } else {
                    setSuccess(true);
                }
            }).catch(err => {
                console.log('ERROR: ', err.message);
                setError(err.message);
            })
    };
    const handleForgetPassword =()=>{
        // TODO: Implement password reset logic
        console.log('Forget Password clicked', emailRef.current.value);
        const email = emailRef.current.value;
        if(!email){
            setError('Please enter email');
            return;
        }else{
            sendPasswordResetEmail(auth, email)
            .then(()=>{
                alert('Password reset email sent to ' + emailRef.current.value);
            })
        }
    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" ref={emailRef} name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label onClick={handleForgetPassword} className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            {error && <div className='text-red-500 text-xl font-semibold'>{error}</div>}
                            {success && <div className='text-green-500 text-xl font-semibold'>Successfully Logged In!</div>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="text-center mb-4">
                        <p>Don't have an account? <Link to='/register' className="link link-hover text-blue-600">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;