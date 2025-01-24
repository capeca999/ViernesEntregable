import './login.css';
import { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!username) {
            errors.username = 'The Username is needed';
        } else if (username.length > 25) {
            errors.username = 'The Username is too long';
        }
        if (!email) {
            errors.email = 'The Email is needed';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'The email addres you are inputing is wrong';
        }
        if (!password) {
            errors.password = 'The password is required';
        } else if (password.length > 25) {
            errors.password = 'Password must be at least 6 characters and not more than 25';
        }
        return errors;
    };

    const loginHandler = async (x) => {
        x.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            const url = isRegistering ? '/api/register/' : '/api/login/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            console.log(data);
        }
    };

    return (
        <div className="body">
            <div className="container">
                <h2 className="header">{isRegistering ? 'Register' : 'Login'}</h2>
                <form onSubmit={loginHandler}>
                    <label className="label">Username:</label>
                    <input 
                        onChange={(event) => { setUsername(event.target.value) }} 
                        placeholder='username'
                        className='custom-input'                 
                        type='text'
                    />
                    {errors.username && <p className="error">{errors.username}</p>}

                    <label className="label">Email:</label>
                    <input 
                        onChange={(event) => { setEmail(event.target.value) }} 
                        placeholder='email'
                        className='custom-input'
                        type='email'  
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label className="label">Password:</label>
                    <input 
                        onChange={(event) => { setPassword(event.target.value) }} 
                        placeholder='password'
                        type='password'
                        className="custom-input" 
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <div className="checkbox-container">
                        <input 
                            type="checkbox" 
                            id="registerCheckbox" 
                            checked={isRegistering} 
                            onChange={() => setIsRegistering(!isRegistering)} 
                        />
                        <label htmlFor="registerCheckbox" className="checkbox-label">Register</label>
                    </div>

                    <button type="submit" className="button">{isRegistering ? 'Register' : 'Login'}</button>
                </form>
            </div>
        </div>
    );
}

export default Login;