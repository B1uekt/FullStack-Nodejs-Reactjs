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
import RegisterPage from './pages/register.jsx';
import UserPage from './components/Admin/user.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import NotFound from './pages/notfound.jsx';
import AdminPage from './pages/admin.jsx';
import Product from './components/Admin/product.jsx';
import './styles/index.scss'
import BlindBox from './pages/blindboxtoys.jsx';


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
      {
        path: "blind-box",
        element: (
          <BlindBox />
        ),
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: "admin",
    element: (
      <AdminPage />
    ),
    children: [
      {
        path: "user",
        element: (
          <UserPage />
        ),
      },
      {
        path: "product",
        element: (
          <Product />
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
      </StrictMode>
    </PersistGate>
  </Provider>
)
