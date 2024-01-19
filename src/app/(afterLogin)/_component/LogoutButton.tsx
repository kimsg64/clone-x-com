"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Session } from "@auth/core/types";

import styles from "./logoutButton.module.css";
type Props = {
    me: Session | null;
};
export default function LogoutButton({ me }: Props) {
    const router = useRouter();
    // const { data: me } = useSession();

    const onLogout = () => {
        signOut({ redirect: false }).then(() => {
            router.replace("/");
        });
        console.log("hi");
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
