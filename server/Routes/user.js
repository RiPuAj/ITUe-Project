import { Router } from 'express'
import { UserController } from '../Controllers/user.js'
export const userRouter = Router()

userRouter.get('/', UserController.getAllUsers)
userRouter.get('/:id', UserController.getUser)