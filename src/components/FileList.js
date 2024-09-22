import React, { useState, useEffect } from "react";
import { Button } from 'reactstrap';
import { getFiles } from '../services/api';

const FileList = () => {
  const [fileList, setFileList] = useState([]);

  const fetchFiles = async () => {
    try {
      const files = await getFiles();
      setFileList(files.data);
      console.log('FILES',files);
    } catch (error) {
      console.error('Error fetching files:', error);
      setFileList([]);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <h2 className="text-center mb-4">File List</h2>
      {fileList.length > 0 ? (
        <ul className="list-group">
          {fileList.map((file, index) => (
            <li key={index} className="list-group-item">{file}</li>
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