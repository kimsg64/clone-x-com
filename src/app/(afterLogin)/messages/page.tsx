import { Metadata } from 'next';
import Room from './_component/Room';
import styles from './messages.module.css';

export const metadata: Metadata = {
    title: '쪽지 / Z',
    description: '쪽지를 보내 보세요.',
};

export default function Page() {
    return (
        <main className={styles.main}>
            <div className={styles.header}>
                <h3>쪽지</h3>
            </div>
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
        </main>
    );
}
