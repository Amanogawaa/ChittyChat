import { Hono } from "hono";
import { messageController } from ".";

// make it a chain of routes
const messageRoutes = new Hono().get("/message", messageController);

export default messageRoutes;
