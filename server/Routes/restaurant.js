import { Router } from 'express'
import { RestaurantController } from '../Controllers/restaurant.js'

// restaurantsRouter for /restaurants
export const restaurantsRouter = Router()

restaurantsRouter.get('/', RestaurantController.getAll)

restaurantsRouter.post('/', RestaurantController.createRestaurant)

//restaurantsRouter.get('/open', RestaurantController.getOpenRestaurants)

// restaurantsRouter.patch('/open/:id',RestaurantController.setOpen)

restaurantsRouter.get('/:id', RestaurantController.getRestaurant)

restaurantsRouter.get('/:id/menu', RestaurantController.getMenu)

restaurantsRouter.patch('/:id/menu', RestaurantController.updateMenu)

restaurantsRouter.get('/:id-restaurant/orders', )

restaurantsRouter.post('/:id/new-order', (req, res) => {
    const { id } = req.params


})

restaurantsRouter.delete('/:id-restaurant/orders/:id-order', (req, res) => {

})
