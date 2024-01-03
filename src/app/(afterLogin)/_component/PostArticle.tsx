"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

import styles from "./post.module.css";
import { Post } from "@/model/Post";

type Props = {
    children: ReactNode;
    // post: {
    //     User: {
    //         id: string;
    //         nickname: string;
    //         image: string;
    //     };
    //     content: string;
    //     createdAt: Date;
    //     postId: number;
    //     Images: string[];
    // };
    post: Post;
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
