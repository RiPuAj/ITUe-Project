import { AppModel } from "../models/local-file-sys/local-file-sys.js";

export class OrdersController{

    static async create({id_user, id_restaurant, order}){
        const res = await AppModel.createOrder({id_user, id_restaurant, order}) 
        return res
    }

    static async delete({ id_order }){
        const res = await AppModel.deleteOrder({ id_order })
        
        return res
    }

    static async setCourier({ id_order }){
        const res = await AppModel.setCourier({ id_order })

        return res
    }

    static async getOrders({ id_restaurant }){
        const orders = await AppModel.getOrders({ id_restaurant })

        return orders
    }
}
