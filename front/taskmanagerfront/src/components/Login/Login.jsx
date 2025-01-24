import './login.css';

import { useState } from 'react';

const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const loginHandler = (x) => {
        x.preventDefault();
        console.log(password);
    };

    return (
        <div className="body">
            <div className="container">
                <h2 className="header">Login</h2>
                <form onSubmit={loginHandler}>
                    <label className="label">Username:</label>
                    <input 
                        onChange={(event) => { setUsername(event.target.value) }} 
                        placeholder='username'
                        className='custom-input'                 
                        type='text'
                    />
                    
                    <label className="label">Email:</label>
                    <input 
                        onChange={(event) => { setEmail(event.target.value) }} 
                        placeholder='email'
                        className='custom-input'
                        type='email'  
                    />

                    <label className="label">Password:</label>
                    <input 
                        onChange={(event) => { setPassword(event.target.value) }} 
                        placeholder='password'
                        type='password'
                        className="custom-input" 
                    />

                    <button type="submit" className="button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;