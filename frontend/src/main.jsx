import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import PageGraphs from './PageGraphs.jsx'
import PageList from './PageList.jsx'
import PageTransaction from './PageTransaction.jsx'
import PageError from './PageError.jsx'
import './index.css'
import { redirect, createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [{
    path: "",
    element: <PageList/>,
  }, {
    path: "list",
    element: <PageList/>,
  }, {
    path: "transactions/:id",
    element: <PageTransaction/>,
    errorElement: <PageError/>,
    loader: async ({ params }) => {
      return await fetch(`http://10.8.0.1:8000/transactions/${params.id}/`)
    },
  }],
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)

