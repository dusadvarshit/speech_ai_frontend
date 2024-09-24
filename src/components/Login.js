import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(username, password);
      console.log('LoginJS',response);
      if (response.success) {
        setIsAuthenticated(true);
        navigate('/');
      } else {
        setError(response.message || 'Login unsuccessful. Please check your credentials.');
      }
    } catch (err) {
      console.log('LoginJS',err.status);
      setError(err.message || 'An error occurred during login');
      console.log(err);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">Login</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <FormGroup>
        <Label for="username">Username</Label>
        <Input type="username" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
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