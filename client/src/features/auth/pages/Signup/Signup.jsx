import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import '../../Auth.css';

import Input from '../../../../components/ui/input/Input';
import Button from '../../../../components/ui/button/Button';

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handling typing inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError(null)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            // Check response status code
            if (!response.ok) {
                throw new Error(data.message || 'Signup failed')
            }

            console.log('Signup Success:', data);

            // Save to CONTEXT!
            login(data.user);

            navigate("/dashboard");

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Create Account 🚀</h2>
                    <p>Join the team and start managing inventory.</p>
                </div>

                {/* Global Error Message */}
                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Full Name"
                        type='text'
                        name='name'
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Email Address"
                        type='email'
                        name='email'
                        placeholder="admin@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Password"
                        type='password'
                        name='password'
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {/* Not taking role as input, Letting Backend default to 'staff' for Security */}
                    <div style={{ marginTop: '20px' }}>
                        <Button type="submit" isLoading={isLoading}>Sign Up</Button>
                    </div>
                </form>
                <div className="auth-footer">
                    <p>Already have an account? <Link to={"/login"}>Log in</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup;