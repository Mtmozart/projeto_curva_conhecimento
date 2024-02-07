import express from "express"
import UserController from "../../controllers/userController";
import UserRepository from "../../repositories/UserRepository";
import { VerificationPassword } from "../../security/validations/VerificationPassword";
import { AppDataSource } from "../../config/dataSource";

const router = express.Router();
const verificar = new VerificationPassword();
const userRepository = new UserRepository(
  AppDataSource.getRepository("UserEntity")
);

const userController = new UserController(userRepository, verificar);

router.post("/create", (req, res) => userController.createUser(req, res))

export default router
