import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

const login = async () => {
    try {
    const { data } = await API.post('/users/login', { email, password });
    localStorage.setItem('token', data.token);
    navigate('/dashboard');
    } catch (error) {
    alert('Error al iniciar sesión');
    }
};

return (
    <div>
        <spam>Hola como estas?</spam>
    <h2 className='titulo_login'>CRM WOlf</h2>
    <span >recordarme</span>
    <input placeholder="nombre" onChange={e => setnombre(e.target.value)} />
    <input placeholder="apellido" onChange={e => setapellido(e.target.value)} />
    <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
    <button onClick={login}>Iniciar sesión</button>
    </div>
);
};

export default Login;