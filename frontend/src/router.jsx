import App from './App.jsx'
import RestaurantView from './pages/RestaurantView.jsx'
import { ClientView } from './pages/ClientView.jsx'
import CourierView from './pages/CourierView.jsx'
import { MenuView } from './pages/MenuView.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { EditMenuView } from './pages/EditMenuView.jsx'
import { AdministratorView } from './pages/Admin/AdministratorView.jsx'
import { ClientAdministratorView } from './pages/Admin/ClientAdministratorView.jsx'
import { RestaurantsAdministratorView } from './pages/Admin/RestaurantsAdministrator.jsx'
import { CourierAdministratorView } from './pages/Admin/CourierAdministrator.jsx'


export const router = createBrowserRouter([
    {
      path:"/admin",
      element: <AdministratorView />
    },
    {
      path:"/admin/Users",
      element: <ClientAdministratorView />
    },{
      path:"/admin/Restaurants",
      element: <RestaurantsAdministratorView />
    },
    {
      path:"/admin/Couriers",
      element: <CourierAdministratorView />
    },
    {
      //App index
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
      element: <EditMenuView/>
    },
  ])