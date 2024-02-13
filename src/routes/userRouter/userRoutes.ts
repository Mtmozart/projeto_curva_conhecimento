import express from "express"
import UserController from "../../controllers/userController";
import UserRepository from "../../repositories/UserRepository";
import { AppDataSource } from "../../config/dataSource";


const router = express.Router();


const userRepository = new UserRepository(
  AppDataSource.getRepository("UserEntity")
);


const userController = new UserController(userRepository);

router.post("/create", (req, res) => userController.createUser(req, res))
router.post("/login", (req, res) => userController.login(req, res))

export default router
