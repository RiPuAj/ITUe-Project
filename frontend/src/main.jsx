import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ClientProvider } from './hooks/contexts.jsx'
import { router } from './router.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClientProvider>
    <RouterProvider router={router}/>
  </ClientProvider>,
)