import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import './styles/index.scss'
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "user",
        element: (
          <UserPage />
        ),
      },
      {
        path: "register",
        element: (
          <RegisterPage />
        ),
      },
      {
        path: "login",
        element: (
          <LoginPage />
        ),
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    </PersistGate>
  </Provider>
)
