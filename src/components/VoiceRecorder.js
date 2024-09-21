import React, { useState } from "react";
import { Button, Row, Col, Input, Card, CardBody, CardTitle, FormGroup } from 'reactstrap';
import { useReactMediaRecorder } from "react-media-recorder";
import { uploadFile } from '../services/api';

const VoiceRecorder = () => {
  const [audioBlob, setAudioBlob] = useState(null);
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    mediaRecorderOptions: { mimeType: 'audio/wav' },
    audio: true,
    onStop: (blobUrl, blob) => {
      setAudioBlob(blob);
    },
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setErrorMessage("");
  };

  const handleUpload = async () => {
    if (!title) {
      setErrorMessage("Please provide a title for the audio file.");
      return;
    }
    
    if (audioBlob) {
      try {
        const response = await uploadFile(audioBlob, title);
        alert(response);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file');
      }
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h2" className="text-center mb-4">Record Voice or Upload</CardTitle>
        
        {/* Recording controls */}
        <Row className="mb-4">
          <Col className="text-center">
            <Button onClick={startRecording} color="primary" className="mx-2">
              Start Recording
            </Button>
            <Button onClick={stopRecording} color="secondary" className="mx-2">
              Stop Recording
            </Button>
          </Col>
        </Row>

        {/* Audio player */}
        {mediaBlobUrl && (
          <Row className="mb-4">
            <Col className="text-center">
              <audio controls src={mediaBlobUrl} className="w-100" />
            </Col>
          </Row>
        )}

        {/* File upload */}
        <Row className="mb-1">
          <Col className="text-center">
            <Input
              type="file"
              accept="audio/wav"
              onChange={(e) => setAudioBlob(e.target.files[0])}
              className="form-control-file"
            />
          </Col>
        </Row>

        {/* Title input */}
        <Row className="mb-1">
          <Col className="text-center">
            <FormGroup>
              <Input
                type="text"
                id="title"
                placeholder="Enter title of the audio"
                value={title}
                onChange={handleTitleChange}
              />
            </FormGroup>
            {errorMessage && (
              <p className="text-danger">{errorMessage}</p>
            )}
          </Col>
        </Row>

        {/* Upload button */}
        <Row>
          <Col className="text-center">
            <Button onClick={handleUpload} color="success">
              Upload File
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default VoiceRecorder;