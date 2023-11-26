import AppModel from '../models/local-file-sys.js'

export default class AppController{
    static async getAll(req, res) {
        const restaurants = await AppModel.getAll()

    }

    static async getRestaurant({id}){
       return await AppModel.getRestaurant({id})
    }

    static getMenu({ id }){
        return AppModel.getMenu({ id })
    }
}