export async function notifyDiscord({ waitlist }: { waitlist: string }) {
	await fetch(process.env.DISCORD_WEBHOOK_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			content: `New waitlist created: ${waitlist}`,
		}),
	});
}
