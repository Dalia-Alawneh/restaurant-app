
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </QueryClientProvider>
  )
}

export default App
