'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import styles from '../messages.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

import { Room } from '@/model/Room';

type Props = { room: Room };

export default function Room({ room }: Props) {
    const router = useRouter();
    const { data: session } = useSession();
    const user = room.Receiver.id === session?.user?.email ? room.Sender : room.Receiver;

    const onClick = () => router.push(`/messages/${room.room}`);

    return (
        <div className={styles.room} onClickCapture={onClick}>
            <div className={styles.roomUserImage}>
                <img src={user.image} alt="" />
            </div>
            <div className={styles.roomChatInfo}>
                <div className={styles.roomUserInfo}>
                    <b>{user.nickname}</b>
                    &nbsp;
                    <span>@{user.id}</span>
                    &nbsp; · &nbsp;
                    <span className={styles.postDate}>{dayjs(room.createdAt).fromNow(true)}</span>
                </div>
                <div className={styles.roomLastChat}>{room.content}</div>
            </div>
        </div>
    );
}
