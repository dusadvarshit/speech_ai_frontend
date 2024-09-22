import React, { useState } from "react";
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VoiceRecorder from './components/VoiceRecorder';
import FileList from './components/FileList';
import ExperimentalForm from './components/ExperimentalForm';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  const Home = () => (
    <>
      <h1 className="text-center mb-4">Voice Recorder</h1>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <VoiceRecorder />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <FileList />
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
              </Routes>
            </PrivateRoute>
          } />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
