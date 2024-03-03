import express from "express"
import CurveController from "../../controllers/CurveController";
const router = express.Router();

const curveController = new CurveController();

router.get("/create", curveController.create);


export default router
