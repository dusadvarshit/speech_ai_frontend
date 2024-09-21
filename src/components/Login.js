import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(email, password);
      if (response.success) {
        setIsAuthenticated(true);
        navigate('/');
      } else {
        setError(response.message || 'Login unsuccessful. Please check your credentials.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">Login</h2>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </FormGroup>
      <Button color="primary" block>Login</Button>
      <div className="text-center mt-3">
        <Link to="/register">Don't have an account? Register</Link>
      </div>
    </Form>
  );
};

export default Login;