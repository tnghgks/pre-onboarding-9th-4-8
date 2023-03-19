import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import Router from './Router';

const App = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </ErrorBoundary>
  );
};

export default App;
