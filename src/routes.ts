import { Router } from "express";
import AuthMiddleware from "./app/middlewares/AuthMiddleware";

import createUserController from '../src/app/useCases/CreateUser';
import deleteUserController from '../src/app/useCases/DeleteUser';
import authUserController from '../src/app/useCases/AuthUser';
import createRegisterController from '../src/app/useCases/CreateRegister';

const router = Router();

router.post('/users', (req, res) =>{
    return createUserController().handle(req, res);
});
router.delete('/users', (req, res) =>{
    return deleteUserController().handle(req, res);
});

router.get('/auth', (req, res) =>{
    return authUserController().handle(req, res);
});

router.get('/users', AuthMiddleware, authUserController().index);

router.post('/registers', AuthMiddleware, createRegisterController().handle)

export default router;