import { AppModel } from "../models/local-file-sys/local-file-sys.js";
import { validatePartialRestaurant, validateRestaurant } from '../Schemas/restaurant-schemas.js'


export class RestaurantController{

    static async getAll(){
        const restaurants = await AppModel.getAllRestaurants()

        return restaurants
    }

    // Hay que cambiar esta funcion
    static async createRestaurant(req, res) {
        const result = validateRestaurant(req.body)

        if(!result.success) {
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
        const restaurant = await AppModel.createRestaurant(result)
        
        res.status(201).json(restaurant)
    }

    static async getRestaurant({ id }){

        const restaurant = await AppModel.getRestaurant({ id })

        return restaurant
    }

    static async getConnectedRestaurants(){
        const connectedRestaurants = await AppModel.getConnectedRestaurants()

        return connectedRestaurants
    }

    static async getMenu({ id, newMenu }){

        const menu = await AppModel.getMenu({ id, newMenu })

        if (menu == undefined) return false

        return true
    }

    static async updateMenu({ id, newMenu}){

        const response = await AppModel.updateMenu({ id, newMenu })
    
        return true
    }

    static async addConnectedRestaurant({idRest, idSocket}){        

        const res = await AppModel.addConnectedRestaurant({idRest, idSocket})

        return res
    }

    static async removeConnectedRestaurant({ idSocket }){
        const resRemove = await AppModel.removeConnectedRestaurant({ idSocket })
        return resRemove
    }

    static async getSocketId({ idRest }){
        const res = await AppModel.getSocketId({ idRest })
        return res
    }
}