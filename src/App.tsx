import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import Homepage from './pages/homepage'

function App() {

  const queryClient = new QueryClient();
  
  return (
     <QueryClientProvider client={queryClient}>
        <Homepage />
      </QueryClientProvider>
  )
}

export default App
