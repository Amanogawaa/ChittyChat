import { app } from "./api/app";

Bun.serve({
  port: 3000,
  fetch: (req) => app.fetch(req),
});
