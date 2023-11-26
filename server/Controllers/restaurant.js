import { AppModel } from "../models/local-file-sys/local-file-sys.js";
import { validatePartialRestaurant, validateRestaurant } from '../Schemas/restaurant-schemas.js'


export class RestaurantController{

    static async getAll(req, res){
        const restaurants = await AppModel.getAllRestaurants()

        return res.json(restaurants)
    }

    static async createRestaurant(req, res) {
        const result = validateRestaurant(req.body)

        if(!result.success) {
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
        const restaurant = await AppModel.createRestaurant(result)
        
        res.status(201).json(restaurant)
    }

    static async getRestaurant(req, res) {
        // Hacer la validacion de la id
        const { id } = req.params
        const restaurant = await AppModel.getRestaurant({id})

        if(restaurant==undefined) res.status(400).json({error: 'Restaurant Not Found'})

        return res.status(201).json(restaurant)
    }

    static async getOpenRestaurants(req, res){
        const openRestaurants = await AppModel.getOpenRestaurants()

        return res.json(openRestaurants)
    }

    static async setOpen(req, res){
        const { id } = req.params

        const response = await AppModel.setOpen({ id })

        const message = response ? 'Restaurant is open' : 'Restaurant is closed'

        return res.status(201).json({state: message})
    }

    static async getMenu(req, res){
        const { id } = req.params
        const menu = await AppModel.getMenu({id})

        if (menu == undefined) res.status(400).json({error: 'Restaurant Not Found'})

        return res.json(menu)
    }

    static async updateMenu(req, res){
        const { id } = req.params

        const result = validatePartialRestaurant(req.body)

        if(!result.success) {
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }

        const response = await AppModel.updateMenuMenu({ id, result })

        if(!response) return res.status(400).json({error: 'Restaurant not found'})
    
        return res.status(201).json('Restaurant menu updated')
    }
}