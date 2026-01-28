import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'

import Input from "../../../../components/ui/input/Input"
import Button from "../../../../components/ui/button/Button"

import '../../Auth.css'

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handling typing in inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing again
        if (error) setError(null)
    };

    // Handle Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Make the request
            const response = await fetch('http://localhost:8000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login Failed');
            }

            console.log('Login Success:', data);

            // Save to CONTEXT!
            login(data.user);

            // Redirect to Dashboard
            navigate('/dashboard');

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <div className='auth-header'>
                    <h2>Welcome Back! 👋🏻</h2>
                    <p>Enter your credentials to access the inventory.</p>
                </div>

                {/* Global Error Message */}
                {error && <div className='auth-error'>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="admin@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label={"Password"}
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <div style={{ marginTop: '20px' }}>
                        <Button type="submit" isLoading={isLoading}>
                            Sign In
                        </Button>
                    </div>
                </form>
                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login