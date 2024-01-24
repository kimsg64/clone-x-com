'use client';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Session } from '@auth/core/types';

import styles from './logoutButton.module.css';
import { useQueryClient } from '@tanstack/react-query';
type Props = {
    me: Session | null;
};
export default function LogoutButton({ me }: Props) {
    const router = useRouter();
    const queryClient = useQueryClient();
    // const { data: me } = useSession();

    const onLogout = () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        signOut({ redirect: false }).then(() => {
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
                method: 'post',
                credentials: 'include',
            });
            router.refresh();
            router.replace('/');
        });
        console.log('hi');
    };

    if (!me?.user) {
        return null;
    }

    return (
        <button className={styles.logOutButton} onClick={onLogout}>
            <div className={styles.logOutUserImage}>
                <img src={me.user?.image!} alt={me.user?.email as string} />
            </div>
            <div className={styles.logOutUserName}>
                <div>{me.user?.name}</div>
                <div>@{me.user?.email}</div>
            </div>
        </button>
    );
}
