import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Edit, Error, PrivateRoute } from "./pages";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/edit/:id"element={<Edit />}>
          
//           </Route>
//           <Route path="*" element={<Error />}>
//           </Route>
//           {/* <PrivateRoute path="/dashboard" exact element={<Dashboard />}>
//           </PrivateRoute> */}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';

function App() {
    const [credentials, setCredentials] = useState([]); // State for storing email-password pairs
    const [formData, setFormData] = useState({ email: '', password: '' }); // State for email and password as an object
    const [isEditing, setIsEditing] = useState(false); // Flag to check if editing
    const [currentIndex, setCurrentIndex] = useState(null); // Index of the item being edited

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email.trim() === '' || formData.password.trim() === '') return; // Prevent empty submissions

        if (isEditing) {
            // Update existing credential
            const updatedCredentials = credentials.map((cred, index) =>
                index === currentIndex ? formData : cred
            );
            setCredentials(updatedCredentials);
            setIsEditing(false);
        } else {
            // Add new credential
            setCredentials([...credentials, formData]);
        }

        // Clear input fields
        setFormData({ email: '', password: '' });
    };

    const editCredential = (index) => {
        setIsEditing(true);
        setCurrentIndex(index);
        setFormData(credentials[index]); // Set form data to the selected credential
    };

    const deleteCredential = (index) => {
        const filteredCredentials = credentials.filter((_, i) => i !== index);
        setCredentials(filteredCredentials);
    };

    return (
        <div className="App">
            <h1>Simple CRUD App - Email & Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} // Update email in formData
                    placeholder="Enter email"
                    required
                />
                <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} // Update password in formData
                    placeholder="Enter password"
                    required
                />
                <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
            </form>
            <ul>
                {credentials.map((cred, index) => (
                    <li key={index}>
                        {cred.email} - {cred.password}
                        <button onClick={() => editCredential(index)}>Edit</button>
                        <button onClick={() => deleteCredential(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;