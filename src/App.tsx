import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from 'AppRoutes';

function App() {
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <ErrorBoundary FallbackComponent={() => <h1>Something went wrong</h1>}>
        <HelmetProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
