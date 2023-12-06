import App from './App.jsx'
import RestaurantView from './pages/RestaurantView.jsx'
import { ClientView } from './pages/ClientView.jsx'
import CourierView from './pages/CourierView.jsx'
import { MenuView } from './pages/MenuView.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { EditMenu } from './Components/EditMenu.jsx'
import { AdministratorView } from './pages/AdministratorView.jsx'

export const router = createBrowserRouter([
    {
      path:"/admin",
      element: <AdministratorView />
    },
    {
      // App index
      path: "/",
      element: <App/>
    },
    {
      // Log in as courier
      path: "/courier/:id",
      element: <CourierView/>
    },
    {
      // Log in as user
      path: "/user/:id",
      element: <ClientView/>
    },
    {
      // Enter to a restaurant menu from user view
      path: "/user/:id/restaurant/:id_restaurant",
      element: <MenuView/>
    },
    {
      // Log in as restaurant
      path: "/restaurant/:id",
      element: <RestaurantView/>
    },
    {
      path:"/restaurant/:id/edit_menu/",
      element: <EditMenu/>
    },
  ])