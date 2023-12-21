"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

import styles from "./post.module.css";

type Props = {
    children: ReactNode;
    post: {
        User: {
            id: string;
            nickname: string;
            image: string;
        };
        content: string;
        createdAt: Date;
        postId: number;
        Images: string[];
    };
};

export default function PostArticle({ children, post }: Props) {
    const router = useRouter();
    const onClick = () => router.push(`/${post.User.id}/status/${post.postId}`);
    return (
        <article className={styles.post} onClickCapture={onClick}>
            {children}
        </article>
    );
}
