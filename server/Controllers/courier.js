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
        AppModel.setNonActiveCourier({ id })
    }
}