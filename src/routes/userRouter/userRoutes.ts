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
const verifications= [new VerificationEmail(userRepository), new VerificationIfPasswordIsStrong(),
   new VerificationPassword, new VerificationRegex, new VerificationIfFieldsIsBlack()];

const userController = new UserController(userRepository, verifications);

router.post("/create", (req, res) => userController.createUser(req, res))

export default router
