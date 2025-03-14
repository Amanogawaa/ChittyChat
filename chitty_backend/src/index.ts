import app from "./api";

Bun.serve({
  port: 3000,
  fetch: (req) => app.fetch(req),
});
