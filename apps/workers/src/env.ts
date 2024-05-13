import { z } from "zod";

export const zEnv = z.object({
  DATABASE_URL: z.string(),
  ENVIRONMENT: z.enum(["development", "preview", "production"]).default("development"),
  REALTIME_API_URL: z.string(),
});

export type Env = z.infer<typeof zEnv>;
