import { useEffect, useRef, useState, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_BASE_URL } from '../api/client';

export interface UseWebSocketOptions {
  storeId: number;
  onOrderReceived?: (data: any) => void;
  onStaffCallReceived?: (data: any) => void;
  onSeatStatusReceived?: (data: any) => void;
}

export function useWebSocket({
  storeId,
  onOrderReceived,
  onStaffCallReceived,
  onSeatStatusReceived,
}: UseWebSocketOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);

  const connect = useCallback(() => {
    if (clientRef.current?.active) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws`),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        setIsConnected(true);
        console.log(`[STOMP WebSocket Connected] Store ID: ${storeId}`);

        // 1. 주문 브로드캐스팅 구독 (/topic/stores/{storeId}/orders)
        client.subscribe(`/topic/stores/${storeId}/orders`, (message) => {
          if (message.body && onOrderReceived) {
            try {
              const data = JSON.parse(message.body);
              onOrderReceived(data);
            } catch (e) {
              console.error('Failed to parse order message', e);
            }
          }
        });

        // 2. 직원 호출 브로드캐스팅 구독 (/topic/stores/{storeId}/staff-calls)
        client.subscribe(`/topic/stores/${storeId}/staff-calls`, (message) => {
          if (message.body && onStaffCallReceived) {
            try {
              const data = JSON.parse(message.body);
              onStaffCallReceived(data);
            } catch (e) {
              console.error('Failed to parse staff-call message', e);
            }
          }
        });

        // 3. 좌석 상태 브로드캐스팅 구독 (/topic/stores/{storeId}/seats)
        client.subscribe(`/topic/stores/${storeId}/seats`, (message) => {
          if (message.body && onSeatStatusReceived) {
            try {
              const data = JSON.parse(message.body);
              onSeatStatusReceived(data);
            } catch (e) {
              console.error('Failed to parse seat status message', e);
            }
          }
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
        console.log('[STOMP WebSocket Disconnected]');
      },
      onStompError: (frame) => {
        console.error('[STOMP Error]', frame.headers['message'], frame.body);
      },
    });

    client.activate();
    clientRef.current = client;
  }, [storeId, onOrderReceived, onStaffCallReceived, onSeatStatusReceived]);

  useEffect(() => {
    if (storeId) {
      connect();
    }

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
    };
  }, [storeId, connect]);

  return { isConnected };
}
