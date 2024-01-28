import { Message } from '@/model/Message';

type Props = { pageParam?: number; queryKey: [string, { senderId: string; receiverId: string }, string] };

export async function getMessages({ pageParam, queryKey }: Props) {
    const [_1, userInfo, _2] = queryKey;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userInfo.senderId}/rooms/${userInfo.receiverId}?cursor=${pageParam}`,
        {
            next: {
                tags: ['rooms'],
            },
            credentials: 'include',
            cache: 'no-store',
        }
    );
    if (!res.ok) {
        throw new Error('failed to fetch data');
    }
    return res.json() as Promise<Message[]>;
}
