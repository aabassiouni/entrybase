"use client";
import { Switch } from "@/components/ui/switch";
import { useWebSocket } from "@/lib/hooks/useWebsocket";
import { useRealtimeCountActions } from "@/lib/store";
import { useAuth } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export function RealtimeSwitch() {
	const router = useRouter();
	const params = useParams<{ waitlist: string }>();
	const { incrementRealtimeCount, resetRealtimeCount } = useRealtimeCountActions();

	const [enabled, setEnabled] = useState(false);
	const [token, setToken] = useState<string | null>(null);
	const { getToken } = useAuth();

	const { ws, reconnect } = useWebSocket(`${process.env.NEXT_PUBLIC_REALTIME_URL}/${params.waitlist}/ws`, {
		onMessage: () => {
			incrementRealtimeCount();
		},
		enabled,
		authToken: token ?? undefined,
	});

	useEffect(() => {
		async function fetchToken() {
			const token = await getToken();
			setToken(token);
		}

		fetchToken();
	}, []);

	return (
		<div className="flex items-center gap-2">
			<p className="items-center font-medium text-lg tracking-tight">Enable Realtime</p>
			<Switch
				checked={enabled}
				onCheckedChange={(checked) => {
					if (checked) {
						router.refresh();
						resetRealtimeCount();
						reconnect();
					} else {
						if (ws) {
							router.refresh();
							resetRealtimeCount();
							ws.close();
						}
					}
					setEnabled(!enabled);
				}}
			/>
		</div>
	);
}
