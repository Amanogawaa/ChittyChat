import { Hono } from "hono";
import { userController } from ".";

const userRoutes = new Hono().get("/user", userController);

export default userRoutes;
