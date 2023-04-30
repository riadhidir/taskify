import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Dashboard from './pages/Dashboard';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const client = new QueryClient();
const router = createBrowserRouter([
 
  {
    path: "/projects",
    element: <Dashboard/>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={client}>
     <RouterProvider router={router} />
     </QueryClientProvider>

  </React.StrictMode>,
)
