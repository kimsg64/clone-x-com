'use client';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

let socket: Socket | null;

export default function useSocket(): [Socket | null, () => void] {
    const { data: session } = useSession();
    const disconnect = useCallback(() => {
        socket?.disconnect();
        socket = null;
    }, []);
    useEffect(() => {
        if (!socket) {
            socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/message`, {
                transports: ['websocket'],
            });
            socket.on('connect_error', (error) => {
                console.error(error);
                console.log(`connect_error due to ${error.message}`);
            });
        }
    }, []);
    useEffect(() => {
        if (socket?.connected && session?.user?.email) {
            socket?.emit('login', { id: session?.user?.email });
        }
    }, [session]);

    return [socket, disconnect];
}
