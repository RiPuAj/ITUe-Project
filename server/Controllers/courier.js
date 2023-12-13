import { AppModel } from "../models/local-file-sys/local-file-sys.js"

export class CourierController{
    static async addConnectedCourier({ idCourier, idSocket }){
        const response = await AppModel.addConnectedCourier({idCourier, idSocket})

        return response
    }

    static async removeConnectedCourier({idSocket}){
        const response = await AppModel.removeConnectedCourier({ idSocket })

        return response
    }

    static async getCourier({ idCourier }){
        const courier = await AppModel.getCourier({ idCourier })

        return courier
    }

    static async getActiveCouriers(){
        const couriers = await AppModel.getActiveCouriers()
        
        return couriers
    }

    static async setNonActiveCourier({ id }){
        const res = AppModel.setNonActiveCourier({ id })
        return res
    }

    static async getSocketId({ id_courier }){
        const socketId = await AppModel.getSocketIdCourier({ id_courier })

        return socketId
    }

    static async getAllCouriers(){
        const couriers = await AppModel.getAllCouriers()

        return couriers
    }
}