import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux'
import store from './redux/store.js'


export const BASE_URL = "http://localhost:5000/api"
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Toaster
        toastOptions={{
          duration: 4000,
        }} 
        />
      <App />
    </BrowserRouter>
  </Provider>
)
