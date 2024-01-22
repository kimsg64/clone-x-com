import { User } from '@/model/User';
import { QueryFunction } from '@tanstack/react-query';
import { cookies } from 'next/headers';

// export const getUserServer: QueryFunction<User, [_1: string, string]> = async ({ queryKey }) => {
export const getUserServer = async ({ queryKey }: { queryKey: [string, string] }) => {
    const [_1, username] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`, {
        next: {
            tags: ['user', username],
        },
        cache: 'no-store',
        credentials: 'include',
        headers: { Cookie: cookies().toString() },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
};
