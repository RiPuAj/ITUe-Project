import App from './App.jsx'
import RestaurantView from './Components/RestaurantView.jsx'
import ClientView from './Components/ClientView.jsx'
import CourierView from './Components/CourierView.jsx'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>
    },
    {
      path: "/courier/:id",
      element: <CourierView/>
    },
    {
      path: "/client/:id",
      element: <ClientView/>
    },
    {
      path: "/restaurant/:id",
      element: <RestaurantView/>
    },
  ])