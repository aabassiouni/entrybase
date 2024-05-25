import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

export const useWebSocket = (
  url: string,
  opts: {
    onMessage: (e: MessageEvent) => void;
    onClose?: (e: CloseEvent) => void;
    enabled?: boolean;
    authToken?: boolean;
  },
) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [key, setKey] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const { getToken } = useAuth();

  const link = new URL(url);

  async function fetchToken() {
    setToken(await getToken());
  }

  if (opts.authToken) {
    fetchToken();
  }

  const reconnect = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (opts.enabled) {
      if (token) {
        link.searchParams.set("token", token);
      }

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
        console.log("refreshing token");
        fetchToken();
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
