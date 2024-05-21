import { Hono } from "hono";
import { createConnection } from "./db";
import { type Env, zEnv } from "./env";
import { signupRoute } from "./routes/signup";

const app = new Hono();

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

app.post("/:waitlist/signup", signupRoute);

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const parsedEnv = zEnv.safeParse(env);
    if (!parsedEnv.success) {
      return Response.json(
        {
          code: "BAD_ENVIRONMENT",
          message: "Some environment variables are missing or are invalid",
          errors: parsedEnv.error,
        },
        { status: 500 }
      );
    }
    createConnection({
      env: parsedEnv.data.ENVIRONMENT,
      databaseURL: parsedEnv.data.DATABASE_URL,
    });
    return app.fetch(request, env, ctx);
  },
};
