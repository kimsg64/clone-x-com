import { auth } from '@/auth';

import MessageForm from './_component/MessageForm';
import UserInfo from './_component/UserInfo';
import WebSocketComponent from './_component/WebSocketComponent';
import MessageList from './_component/MessageList';
import styles from './chatRoom.module.css';

type Props = { params: { room: string } };
export default async function ChatRoom({ params }: Props) {
    const session = await auth();
    const ids = params.room.split('-').filter((v) => v !== session?.user?.email);
    if (ids[0]) {
        return null;
    }

    return (
        <main className={styles.main}>
            <WebSocketComponent />
            <UserInfo id={ids[0]} />
            <MessageList id={ids[0]} />
            <MessageForm id={ids[0]} />
        </main>
    );
}
