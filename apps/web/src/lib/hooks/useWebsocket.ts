import { useEffect, useState } from "react";

export const useWebSocket = (url: string, opts: { onMessage: (e: MessageEvent) => void }) => {
	const [ws, setWs] = useState<WebSocket | null>(null);

	useEffect(() => {
		const ws = new WebSocket(url);
		ws.onopen = () => {
			console.log("connected");
		};
		ws.onclose = () => {
			console.log("disconnected");
		};
		ws.onmessage = opts.onMessage;

		setWs(ws);

		return () => {
			ws.close();
			setWs(null);
		};
	}, []);

	return ws;
};
