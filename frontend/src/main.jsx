import React from 'react'
import ReactDOM from 'react-dom/client'
import { redirect, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";

import App from './App.jsx'
import ChartsPage from './pages/ChartsPage.jsx'
import TransactionListPage from './pages/TransactionListPage.jsx'
import TransactionDetailsPage from './pages/TransactionDetailsPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

import './styles/index.css'


const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [
  {
    index: true,
    element: <Navigate to="/charts" replace />
  },
  {
    path: "charts",
    element: <ChartsPage/>,
  }, {
    path: "list",
    element: <TransactionListPage/>,
  }, {
    path: "transactions/:id",
    element: <TransactionDetailsPage/>,
    errorElement: <ErrorPage/>,
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

