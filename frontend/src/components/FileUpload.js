import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import "../assets/styles.css";

const FileUpload = () => {
  
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/files/")
      .then((res) => setFiles(res.data.File));
  }, []);

  function downloadFile(id){
    axios.get("http://localhost:5000/file/?id="+id)
      .then((res) => setFiles(res.data.File));
  }

  
  function deleteFile(id){
    axios.delete("http://localhost:5000/files/delete/?id="+id)
      .then((res) => setFiles(res.data.File));
  }

  function updateFile(id){
    axios.put("http://localhost:5000/files/?id="+id)
      .then((res) => setFiles(res.data.File));
  }

  const [file, setFile] = useState([]);
  const upload= async(e)=>{
    e.preventDefault()
    let formData = new FormData();
    user: localStorage.getItem("userId")
    formData.append('shubhi', file);
    try {
          const res = await axios.post(
            "http://localhost:5000/",
            formData, {
              headers: {'Content-Type': 'multipart/form-data' }
            }).then((res)=>console.log(res.data))
        } catch (ex) {
          console.log(ex);
        }
  }

  return (
    <>
    <div>
      <label>Upload a file</label><br></br>
      <input type="file" onChange={(e)=>{
        setFile(e.target.files[0])
        console.log(setFile)
        }}></input><br></br>
      <button onClick={(e)=>upload(e)}>Upload</button>
    </div>
    <div id="second">
    <table>
      <thead>
      <tr>
        <th>File</th>
        <th>Action</th>
        <th>Action</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      {
        files.map((file) => (
          <tr>
            <td>{file.originalname}</td>
            <td>
              <button onClick={() => downloadFile(file._id)}>Download</button>
              </td>
              <td>
              <button onClick={() => updateFile(file._id)}>Update</button>
              </td>
              <td>
              <button onClick={() => deleteFile(file._id)}>Delete</button>
              </td>
          </tr>
        ))
      }
      </tbody>
    </table>
  </div>
  </>
  )
}

export default FileUpload
