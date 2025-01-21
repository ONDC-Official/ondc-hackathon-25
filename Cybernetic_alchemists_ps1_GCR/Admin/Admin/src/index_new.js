import React from 'react';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './i18n/translations'; // Import translations
import App from './App';
import './index.css';
import axios from 'axios'; // Import Axios

const testApiCall = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/test'); // Adjust the endpoint as necessary
        console.log('API Response:', response.data);
    } catch (error) {
        console.error('Error making API call:', error);
    }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

testApiCall(); // Call the API function
