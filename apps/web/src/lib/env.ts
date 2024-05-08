import { z } from "zod";

export const env = () =>
	z
		.object({
			VERCEL_ENV: z.enum(["development", "preview", "production"]).optional().default("development"),
			VERCEL_URL: z.string().optional(),

			UPLOADTHING_SECRET: z.string(),
			UPLOADTHING_APP_ID: z.string(),

			DISCORD_WEBHOOK_URL: z.string().optional(),

			RESEND_API_KEY: z.string().optional(),
		})
		.parse(process.env);

export const dbEnv = () =>
	z
		.object({
			DRIZZLE_DATABASE_URL: z.string(),
		})
		.parse(process.env);

export const stripeEnv = () =>
	z
		.object({
			STRIPE_API_KEY: z.string(),
			STRIPE_WEBHOOK_SECRET: z.string(),
			STRIPE_PRO_PLAN_FLAT: z.string(),
			STRIPE_PRO_PLAN_USAGE: z.string(),
			STRIPE_PRODUCT_ID_SUPPORT: z.string(),
		})
		.parse(process.env);
