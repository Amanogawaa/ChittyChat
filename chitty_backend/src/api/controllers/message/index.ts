import { Context, Hono } from "hono";

export function messageController(c: Context) {
  return c.json({ message: "Hello, user his is a message!" });
}
