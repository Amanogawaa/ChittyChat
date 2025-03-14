//controller

import { Context } from "hono";

export function userController(c: Context) {
  return c.json({ message: "Hello, user!" });
}
