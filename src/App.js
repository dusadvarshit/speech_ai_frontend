import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VoiceRecorder from './components/VoiceRecorder';
import ExperimentalForm from './components/ExperimentalForm';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Explore from './pages/Explore';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') ? true : false;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const PrivateRoute = ({ children }) => {
    console.log("isAuthenticated", isAuthenticated, children);
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  const Home = () => (
    <>
      <h1 className="text-center mb-4">Voice Recorder</h1>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <VoiceRecorder />
          <br /> <br /> 
        </Col>

        <Link to="/explore">
            <h3 className="text-center mb-4">Explore all recordings</h3>
          </Link>
      </Row>
      
    </>
  );

  return (
    <Router>
      <Header />
      <Container className="my-5">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={
            <PrivateRoute>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
              </Routes>
            </PrivateRoute>
          } />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
