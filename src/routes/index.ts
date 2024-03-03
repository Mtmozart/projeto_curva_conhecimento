import express from "express";
import userRoute from "./userRouter/userRoutes";
import curveRoutes from "./courveRoutes/curveRoutes"

const router = (app:express.Router) => {
  app.use("/user", userRoute);
  app.use("/curve", curveRoutes)
};

export default router;
