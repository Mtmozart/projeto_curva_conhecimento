import express from "express"
import CurveController from "../../controllers/CurveController";
import AuthMiddleware from "../../middlewares/AuthMiddleware";
import CurveRepository from "../../repositories/CurveRepository";
import { AppDataSource } from "../../config/dataSource";
import UserRepository from "../../repositories/UserRepository";
const router = express.Router();

const curveRepository = new CurveRepository(
  AppDataSource.getRepository("SpacedRepetitionEntity")
);
const userRepository = new UserRepository(
  AppDataSource.getRepository("UserEntity")
);

const curveController = new CurveController(curveRepository, userRepository);
const authM = new AuthMiddleware();

router.post("/user/:id/create", authM.authMiddleware, (req, res) => {
  curveController.create(req, res)
});
router.get("/user/:userId/curve/:curveId", authM.authMiddleware, (req, res) => {
  curveController.details(req, res)
});
router.get("/user/:userId/curves", authM.authMiddleware, (req, res) => {
  curveController.allCurveByUser(req, res)
});


export default router
