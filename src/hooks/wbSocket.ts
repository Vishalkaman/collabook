import { useEffect, useRef, useState, useCallback } from 'react';

type UseWebSocketOptions = {
    onMessage?: (data: any) => void;
    onError?: (error: Event) => void;
    onClose?: () => void;
    autoReconnect?: boolean;
    reconnectInterval?: number; // in ms
};

type UseWebSocketReturn = {
    send: (data: any) => void;
    connected: boolean;
};

export function useWebSocket(
    url: string,
    {
        onMessage,
        onError,
        onClose,
        autoReconnect = false,
        reconnectInterval = 3000,
    }: UseWebSocketOptions
): UseWebSocketReturn {
    const [connected, setConnected] = useState(false);
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimer = useRef<NodeJS.Timeout | null>(null);

    const connect = useCallback(() => {
        const ws = new WebSocket(url);
        socketRef.current = ws;

        ws.onopen = () => {
            setConnected(true);
            console.log('[WebSocket] Connected');
        };

        ws.onmessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                onMessage?.(data);
            } catch {
                onMessage?.(event.data);
            }
        };

        ws.onerror = (event: Event) => {
            console.error('[WebSocket] Error:', event);
            onError?.(event);
        };

        ws.onclose = () => {
            console.warn('[WebSocket] Disconnected');
            setConnected(false);
            onClose?.();

            if (autoReconnect) {
                reconnectTimer.current = setTimeout(connect, reconnectInterval);
            }
        };
    }, [url, onMessage, onError, onClose, autoReconnect, reconnectInterval]);

    useEffect(() => {
        connect();

        return () => {
            if (reconnectTimer.current) {
                clearTimeout(reconnectTimer.current);
            }
            socketRef.current?.close();
        };
    }, [connect]);

    const send = useCallback((data: any) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(data));
        } else {
            console.warn('[WebSocket] Cannot send — not connected.');
        }
    }, []);

    return { send, connected };
}
