import { useCallback, useEffect, useState } from "react";

export const useWebSocket = (
  url: string,
  opts: {
    onMessage: (e: MessageEvent) => void;
    onClose?: (e: CloseEvent) => void;
    enabled?: boolean;
    authToken?: string;
  },
) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [key, setKey] = useState(0);

  const link = new URL(url);

  if (opts.authToken) link.searchParams.append("token", opts.authToken);

  const reconnect = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (opts.enabled) {
      const ws = new WebSocket(link);
      ws.onopen = () => {
        console.log("[Connected to realtime]");
      };
      ws.onclose = (ev) => {
        console.log("[Disconnected from realtime]");
        opts.onClose?.(ev);
      };
      ws.onmessage = opts.onMessage;
      ws.onerror = (e) => {
        console.error("[Realtime error]", e);
      };

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
