import App from './App.jsx'
import RestaurantView from './Components/RestaurantView.jsx'
import ClientView from './Components/ClientView.jsx'
import CourierView from './Components/CourierView.jsx'
import { MenuView } from './Components/MenuRestaurant.jsx'
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
      path: "/user/:id",
      element: <ClientView/>
    },
    {
      path: "/user/:id/restaurant/:id_restaurant",
      element: <MenuView/>
    },
    {
      path: "/restaurant/:id",
      element: <RestaurantView/>
    },
  ])