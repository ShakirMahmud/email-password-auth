import React, { useState } from 'react';
import { auth } from './../../firebase.init';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        //reset error and status
        setError('');
        setSuccess(false);

        if(password.length < 6){
            setError('Password must be at least 6 characters long');
            return;
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
        if(!passwordRegex.test(password)){
            setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            return;
        }


        // create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                setSuccess(true);
            }).catch(err => {
                console.log('ERROR: ' + err.message);
                setError(err.message);
                setSuccess(false);
            })
    }

    return (
        <div className='my-8 max-w-lg mx-auto'>
            <h2 className="text-4xl">Register</h2>
            <form onSubmit={handleRegister} className='flex flex-col my-8 space-y-6'>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" name='email' className="grow" placeholder="Email" required />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" name='password' className="grow" placeholder='Password' required />
                </label>
                {error && <div className='text-red-500 text-xl font-semibold'>{error}</div>}
                {success && <div className='text-green-500 text-xl font-semibold'>Registration successful!</div>}
                <div className="form-control mt-6">
                    <button className="btn btn-primary text-2xl">Register</button>
                </div>
            </form>

        </div>
    );
};

export default Register;