import { Hono } from "hono";
import { createUser, getUsers, loginUser } from ".";
import { validator } from "hono/validator";
import { CreateUser } from "../../schema/user.schema";

// use the error handling middleware to make the code cleaner and return a status code

const userRoutes = new Hono()
  .post(
    "/create",
    validator("json", (value, c) => {
      const { email, password } = value as CreateUser;

      if (!email) return c.json({ error: "Email is required" }, 400);
      if (email.length > 254)
        return c.json({ error: "Email is too long" }, 400);
      if (email.length < 3) return c.json({ error: "Email is too short" }, 400);
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return c.json({ error: "Invalid email format" }, 400);
      }

      if (!password) return c.json({ error: "Password is required" }, 400);
      if (password.length < 8) {
        return c.json(
          { error: "Password must be at least 8 characters long" },
          400
        );
      }
      if (password.length > 128)
        return c.json({ error: "Password is too long" }, 400);
      if (!/[A-Z]/.test(password)) {
        return c.json(
          { error: "Password must contain at least one uppercase letter" },
          400
        );
      }
      if (!/[a-z]/.test(password)) {
        return c.json(
          { error: "Password must contain at least one lowercase letter" },
          400
        );
      }
      if (!/[0-9]/.test(password)) {
        return c.json(
          { error: "Password must contain at least one number" },
          400
        );
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return c.json(
          { error: "Password must contain at least one special character" },
          400
        );
      }
      if (password.toLowerCase().includes(email.toLowerCase().split("@")[0])) {
        return c.json({ error: "Password cannot contain your email" }, 400);
      }

      // add name and gender of the user

      return { email, password };
    }),
    createUser
  )
  .post("/login", loginUser)
  .get("/users", getUsers);

export default userRoutes;
