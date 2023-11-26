import { Router } from 'express'
import { AppModel } from '../models/local-file-sys.js'
import { validatePartialRestaurant, validateRestaurant } from '../Schemas/restaurant-schemas.js'
import { randomUUID } from 'node:crypto'
import { object } from 'zod'

// restaurantsRouter for /restaurants
export const restaurantsRouter = Router()

restaurantsRouter.get('/', async (req, res) => {
    const restaurants =  await AppModel.getAllRestaurants()
    res.json(restaurants)
})

restaurantsRouter.post('/', async (req, res) => {
    const result = validateRestaurant(req.body)

    if(!result.success) {
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    const restaurant = await AppModel.createRestaurant(result)
    
    res.status(201).json(restaurant)
})

restaurantsRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const restaurant = await AppModel.getRestaurant({id})
    res.json(restaurant)
})

restaurantsRouter.get('/:id/menu', async (req, res) => {
    const { id } = req.params
    const menu = await AppModel.getMenu({id})
    res.json(menu)
})

restaurantsRouter.patch('/:id/menu', async (req, res) => {
    const { id } = req.params

    const result = validatePartialRestaurant(req.body)

    if(!result.success) {
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const response = await AppModel.modifyMenu({ id, result })
   
    res.status(201).json(response)
})

restaurantsRouter.post('/:id/new-order', (req, res) => {
    const { id } = req.params


})
