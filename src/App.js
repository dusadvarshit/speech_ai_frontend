import React from "react";
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VoiceRecorder from './components/VoiceRecorder';
import FileList from './components/FileList';
import ExperimentalForm from './components/ExperimentalForm';

const App = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Voice Recorder</h1>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <VoiceRecorder />
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        <FileList />
      </Row>

      <Row className="justify-content-center">
        <ExperimentalForm />
      </Row>
    </Container>
  );
};

export default App;