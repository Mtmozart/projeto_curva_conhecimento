import express from "express"
import UserController from "../../controllers/userController";
import UserRepository from "../../repositories/UserRepository";
import { AppDataSource } from "../../config/dataSource";
import { VerificationEmail } from "../../security/validations/VerificationEmail";
import { VerificationIfPasswordIsStrong } from "../../security/validations/VerificationIfPasswordIsStrong";
import { VerificationPassword } from "../../security/validations/VerificationPassword";
import { VerificationRegex } from "../../security/validations/VerificationRegex";
import { VerificationIfFieldsIsBlack } from "../../security/validations/VerificationIfFieldsIsBlack";

const router = express.Router();


const userRepository = new UserRepository(
  AppDataSource.getRepository("UserEntity")
);


const userController = new UserController(userRepository);

router.post("/create", (req, res) => userController.createUser(req, res))

export default router
