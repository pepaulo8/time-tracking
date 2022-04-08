import { Router } from "express";
import AuthController from "./app/controllers/AuthController";
import UserController from "./app/controllers/UserController";
import AuthMiddleware from "./app/middlewares/AuthMiddleware";

import createUsersController from '../src/app/useCases/CreateUser';

const router = Router();

//router.post('/users', UserController.store);

router.post('/users', (req, res) =>{
    return createUsersController().handle(req, res);
});

router.post('/auth', AuthController.authenticate);
router.get('/users', AuthMiddleware, UserController.index);
router.delete('/usuario/:id', AuthMiddleware, UserController.delete);

export default router;