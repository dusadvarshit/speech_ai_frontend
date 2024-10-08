import React, { useState, useEffect } from "react";
import { Button } from 'reactstrap';
import { getFiles } from '../services/api';

const FileList = () => {
  const [fileList, setFileList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFiles = async (page) => {
    try {
      const response = await getFiles(page);
      setFileList(response.data);
      console.log(response);
      // setCurrentPage(response.current_page);
      setTotalPages(response.pages);
    } catch (error) {
      console.error('Error fetching files:', error);
      setFileList([]);
    }
  };

  useEffect(() => {
    fetchFiles(currentPage);
  }, []);

  // Handle next/prev page clicks
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchFiles(currentPage+1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchFiles(currentPage-1);
    }
  };

  return (
    <>
      <div>
        <button onClick={goToPreviousPage} disabled={currentPage === 1} class="btn btn-primary">
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages} class="btn btn-primary">
          Next
        </button>
      </div>

      <h2 className="text-center mb-4">All Your Recordings</h2>
      {fileList.length > 0 ? (
        <ul className="list-group">
          {fileList.map((file, index) => (
            <li key={index} className="list-group-item">
              <p>{file.filename}</p>
              <audio controls>
                <source src={file.url} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
              <h3>4P Feedback</h3>
              <p> <b>Pause:</b> {file.pause_feedback}</p>
              <p> <b>Pitch:</b> {file.pitch_feedback}</p>
              <p> <b>Energy:</b> {file.energy_feedback}</p>
              <p> <b>Pace:</b> {file.pace_feedback}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No files found.</p>
      )}
      <div className="text-center mt-3">
        <Button color="primary" onClick={fetchFiles}>Refresh File List</Button>
      </div>
    </>
  );
};


export default FileList;