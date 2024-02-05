import express from "express";
import userRoute from "./userRouter/userRoutes";

const router = (app:express.Router) => {
  app.use("/user", userRoute)
};

export default router;
