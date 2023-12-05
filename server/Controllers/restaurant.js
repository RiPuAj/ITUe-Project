import { AppModel } from "../models/local-file-sys/local-file-sys.js";
import { validatePartialRestaurant, validateRestaurant } from '../Schemas/restaurant-schemas.js'


export class RestaurantController{

    static async getAll(){
        const restaurants = await AppModel.getAllRestaurants()

        return restaurants
    }

    static async createRestaurant(req, res) {
        const result = validateRestaurant(req.body)

        if(!result.success) {
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
        const restaurant = await AppModel.createRestaurant(result)
        
        res.status(201).json(restaurant)
    }

    /*static async getRestaurant(req, res) {
        
        // Hacer la validacion de la id
        const { id } = req.params
        const restaurant = await AppModel.getRestaurant({id})

        if(restaurant==undefined) res.status(400).json({error: 'Restaurant Not Found'})

        return res.status(201).json(restaurant)
    }*/

    static async getRestaurant({ id }){
        
        const restaurant = await AppModel.getRestaurant({ id })

        return restaurant
    }

    static async getConnectedRestaurants(){
        const connectedRestaurants = await AppModel.getConnectedRestaurants()

        return connectedRestaurants
    }

    /*static async setOpen(req, res){
        const { id } = req.params

        const response = await AppModel.setOpen({ id })

        const message = response ? 'Restaurant is open' : 'Restaurant is closed'

        return res.status(201).json({state: message})
    }*/

    static async getMenu({ id, newMenu }){
        const menu = await AppModel.getMenu({ id, newMenu })

        if (menu == undefined) return false

        return true
    }

    static async updateMenu(req, res){
        const { id } = req.params

        const result = validatePartialRestaurant(req.body)

        if(!result.success) {
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }

        const response = await AppModel.updateMenu({ id, result })

        if(!response) return res.status(400).json({error: 'Restaurant not found'})
    
        return res.status(201).json('Restaurant menu updated')
    }

    static async addConnectedRestaurant({idRest, idSocket}){
        const res = await AppModel.addConnectedRestaurant({idRest, idSocket})

        return res
    }

    static async removeConnectedRestaurant({ idRest }){
        const resRemove = await AppModel.removeConnectedRestaurant({ idRest })
        return resRemove
    }

    static async setOpenState({ idRest }){
  
        return AppModel.setOpen({ idRest })
    }

    static async getSocketId({ idRest }){
        const res = await AppModel.getSocketId({ idRest })
        return res
    }
}