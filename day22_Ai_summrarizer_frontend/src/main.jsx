import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './components/auth/Register.jsx'
import Login from './components/auth/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import Summrizer from './components/Summrizer.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:'/signup',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path:'/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path:'/summarizer',
    element: (
      <ProtectedRoute>
        <Summrizer />
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: <App />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
