import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormComponent = ({onLogin}) => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [result, setResult] = useState('');
  const [loading,setLoading]=useState(false)

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      setError('Both fields are required');
      return;
    }

    setLoading(true);  // Start loading
    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', { userName, password });
      const { token, msg } = response.data;

      setError(''); // Clear any previous error
      onLogin(token); // Send token to parent (App component)

      // Clear form inputs
      setUsername('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Try again.');
    } finally {
      setLoading(false);  // End loading
    }
  };

  // Handle getting data from the dashboard using token
  const handleGetData = async () => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      setError('No token found');
      return;
    }

    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/dashboard', {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      setResult(
        <div>
          <h5>{data.msg}</h5>
          <p>{data.secret}</p>
        </div>
      );
    } catch (error) {
      setError(error.response?.data?.msg || 'Error occurred');
      setToken(null);
      localStorage.removeItem('token');
      setResult('');
    }
  };

  // Check if token is present on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="form contact-form">
          <h5 className="text-xl font-bold mb-4">Login/Register</h5>

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {message && <div className="text-green-500 text-sm mb-4">{message}</div>}

          <button type="submit" className="bg-blue-500 text-white rounded-md w-full py-2 hover:bg-blue-600">
            Submit
          </button>
        </form>

    
      </div>
    </main>
  );
};

export default FormComponent;
