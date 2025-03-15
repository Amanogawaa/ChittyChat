import { createClient } from "@supabase/supabase-js";
import { Hono } from "hono";
import { routes } from "./routes/routes";

const app = new Hono().basePath("/api");

// loead env
const url = process.env.SUPABASE_URL || "";
const key = process.env.SUPABASE_ANON_KEY || "";

if (!url || !key) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables"
  );
}

const supabase = createClient(url, key);

routes.forEach((route) => {
  app.route("/", route);
});

export { app, supabase };
