'use client';
import styles from './logoutButton.module.css';

export default function LogoutButton() {
    // 더미
    const me = {
        id: 'hi',
        image: '/5Udwvqim.jpg',
        nickname: 'you',
    };

    const onLogout = () => {
        console.log('hi');
    };

    return (
        <button className={styles.logOutButton} onClick={onLogout}>
            <div className={styles.logOutUserImage}>
                <img src={me.image} alt={me.id} />
            </div>
            <div className={styles.logOutUserName}>
                <div>{me.nickname}</div>
                <div>@{me.id}</div>
            </div>
        </button>
    );
}
