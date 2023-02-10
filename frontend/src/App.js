import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import Auth from './components/Auth';
import Login from './components/Login';
import './App.css';


function App() {
  const [isLogedIn, setToLogin] = useState(false);
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post('http://localhost:5000/authen/tokenIsValid', null, { headers: { "x-auth-token": token } });
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:5000/authen/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }
    checkLoggedIn();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route path="/auth" element={<Auth
          isLogedIn={isLogedIn}
          setToLogin={setToLogin} />} />
        <Route path="/login" element={<Login
          isLogedIn={isLogedIn}
          setToLogin={setToLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;




// import './App.css';
// import { Route, Router, Routes, BrowserRouter} from 'react-router-dom';
// import FileUpload from './components/FileUpload';
// import ShowFiles from './components/ShowFiles';
// import Auth from './components/Auth';
// import React from 'react';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//          <Route path="/auth" element={<Auth />} />
//          <Route path="/" element={<FileUpload />} />
//          <Route path="/f" element={<ShowFiles />}/>
//          </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
