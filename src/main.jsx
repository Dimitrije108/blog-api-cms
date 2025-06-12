import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './tailwind.css';
import routes from './routes/routes';
import { ErrorBoundary } from 'react-error-boundary';
import AuthProvider from './context/AuthProvider';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary 
      fallback={
        <h1 className='flex justify-center items-center'>
          Something went wrong
        </h1>
      }
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
