import messageRoutes from "../controllers/message/routes";
import userRoutes from "../controllers/user/routes";

export const routes = [userRoutes, messageRoutes] as const;

export type AppRoute = (typeof routes)[number];
