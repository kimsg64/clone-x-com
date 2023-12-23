import Room from './_component/Room';
import styles from './messages.module.css';

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
