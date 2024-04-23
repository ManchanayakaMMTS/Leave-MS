// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        employeeNumber: '',
        password: '',
    });

    const [userFound, setUserFound] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:8070/user/user');
            const users = response.data;
            const user = users.find(
                (user) =>
                    user.employeeNumber === parseInt(formData.employeeNumber) &&
                    user.password === formData.password
            );

            if (user) {
                setUserFound(true);
                alert('User found');
                navigate(`/UserHome`);
            } else {
                setUserFound(false);
                alert('User not found');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="login-form">
            <h2 style={{ fontWeight: 'bold' }}>Login</h2>
            {userFound && (
                <div className="alert alert-success">
                    User found! You are now logged in.
                </div>
            )}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="employeeNumber">Employee Number</label>
                    <input
                        type="number"
                        id="employeeNumber"
                        name="employeeNumber"
                        value={formData.employeeNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
