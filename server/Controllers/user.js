import { AppModel } from "../models/local-file-sys/local-file-sys.js";

export class UserController{

    static async getAllUsers(req, res){
        const users = AppModel.getAllUsers()

        return res.status(201).json(users)
    }

    static async getUser(req, res){
        const { id } = req.params
        const user = await AppModel.getUser({ id })

        if(user == undefined) res.status(400).json({error: 'User Not Found'})

        res.status(201).json(user)
    }
}