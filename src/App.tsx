import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Router from './Router';

const App = () => {
  return (
    <>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
