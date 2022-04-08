import { Router } from "express";
import AuthMiddleware from "./app/middlewares/AuthMiddleware";

import createUserController from '../src/app/useCases/CreateUser';
import deleteUserController from '../src/app/useCases/DeleteUser';
import authUserController from '../src/app/useCases/AuthUser';

const router = Router();

router.post('/users', (req, res) =>{
    return createUserController().handle(req, res);
});
router.delete('/users', (req, res) =>{
    return deleteUserController().handle(req, res);
});

router.post('/auth', (req, res) =>{
    return authUserController().handle(req, res);
});

router.get('/users', AuthMiddleware, authUserController().index);
//router.get('/users', AuthMiddleware, UserController.index);

export default router;