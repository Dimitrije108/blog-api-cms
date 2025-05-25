import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './tailwind.css';
import routes from './routes/routes.jsx';
import { ErrorBoundary } from 'react-error-boundary';

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
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
);
