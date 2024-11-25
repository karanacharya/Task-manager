import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Tasks from './components/Tasks.jsx'
import { TaskProvider } from "./context/TaskContext";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path:"/login",
        element:(
          <Login/>
        )
      },
      {
        path:"/signup",
        element:(
          <Signup/>
        )
      },
      {
        path:"/tasks",
        element:(
          <TaskProvider>
          <Tasks/>
          </TaskProvider>
        )
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
