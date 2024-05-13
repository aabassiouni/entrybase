import { useCallback, useEffect, useState } from "react";

export const useWebSocket = (url: string, opts: { onMessage: (e: MessageEvent) => void; enabled: boolean }) => {
	const [ws, setWs] = useState<WebSocket | null>(null);
	const [key, setKey] = useState(0);

	const reconnect = useCallback(() => {
		setKey((prev) => prev + 1);
	}, []);

	useEffect(() => {
		if (opts.enabled) {
			const ws = new WebSocket(url);
			ws.onopen = () => {
				console.log("[Connected to realtime]");
			};
			ws.onclose = () => {
				console.log("[Disconnected from realtime]");
			};
			ws.onmessage = opts.onMessage;

			setWs(ws);
		}

		return () => {
			if (!ws) return;
			ws.close();
			setWs(null);
		};
	}, [key, opts.enabled]);

	return { ws, reconnect };
};
