import { Metadata } from 'next';
import Room from './_component/Room';
import styles from './messages.module.css';
import { getRooms } from './_lib/getRooms';
import { auth } from '@/auth';

export const metadata: Metadata = {
    title: '쪽지 / Z',
    description: '쪽지를 보내 보세요.',
};

export default async function Page() {
    const session = await auth();

    const rooms = session?.user?.email ? await getRooms(session.user.email) : [];

    return (
        <main className={styles.main}>
            <div className={styles.header}>
                <h3>쪽지</h3>
            </div>
            {rooms.map((room) => (
                <Room key={room.room} room={room} />
            ))}
        </main>
    );
}
