import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


import {
  RouterProvider,
} from "react-router-dom";
import router from './routes/Routes.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';


// react aos animation
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

// react toastify

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>

  </React.StrictMode>,
)
