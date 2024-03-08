import express from "express"
import UserController from "../../controllers/UserController";
import UserRepository from "../../repositories/UserRepository";
import { AppDataSource } from "../../config/dataSource";
import AuthMiddleware from "../../middlewares/AuthMiddleware"


const router = express.Router();


const userRepository = new UserRepository(
  AppDataSource.getRepository("UserEntity")
);

const userController = new UserController(userRepository);

const authM = new AuthMiddleware();

router.post("/create", (req, res) => userController.createUser(req, res))
router.post("/login", (req, res) => userController.login(req, res))
router.get("/details/:id", authM.authMiddleware, (req, res) => {
  userController.details(req, res)
});
router.put("/update/:id", authM.authMiddleware, (req, res) => {
  userController.update(req, res)
});

export default router
