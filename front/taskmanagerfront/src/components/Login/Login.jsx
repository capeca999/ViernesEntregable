import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//Esta es la primera pagina que se le presentará al usuario, en la cual se le pedirá que se registre o inicie sesión
const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
//Validamos los campos del formulario
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
//Esta función es llamada en el momento que el usuario intenta realizar un login o un registro.
    const loginHandler = async (x) => {
        x.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            //Dependiendo de lo que estamos realizando, se llama a register o a login.
            const url = isRegistering ? 'http://127.0.0.1:8000/api/register/' : 'http://127.0.0.1:8000/api/login/';
            try {
                const response = await axios.post(url, { username, email, password }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log(response.data);
                //Si todo ha funcionado, independientemente si se ha logeado o registrado, se volver le presentara la vista taskmanager
                if (response.status === 200) {
                    onLogin(response.data);
                    navigate('/taskmanager', { state: { data: response.data } });
                }
            } catch (error) {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                } else if (error.request) {
                    console.error('Error request:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
            }
        }
    };
//El formulario que se le presentará al usuario
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