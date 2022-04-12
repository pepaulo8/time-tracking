import { ListRegistersController } from './app/useCases/ListRegisters/ListRegistersController';
import { CreateUserController } from './app/useCases/CreateUser/CreateUserController';
import { Router } from "express";
import AuthMiddleware from "./app/middlewares/AuthMiddleware";

import { CreateRegisterController } from './app/useCases/CreateRegister/CreateRegisterController';
import { DeleteUserController } from './app/useCases/DeleteUser/DeleteUserController';
import { AuthUserController } from './app/useCases/AuthUser/AuthUserController';

const router = Router();

const createUserController = new CreateUserController();
const createRegisterController = new CreateRegisterController();
const deleteUserController = new DeleteUserController();
const authUserController = new AuthUserController();
const listRegistersController = new ListRegistersController();

router.post('/users', createUserController.handle);

router.delete('/users', deleteUserController.handle);

router.get('/auth', authUserController.handle);

router.get('/users', AuthMiddleware, authUserController.index);

router.post('/registers', AuthMiddleware, createRegisterController.handle)

router.get('/registers', AuthMiddleware, listRegistersController.handle)

export default router;