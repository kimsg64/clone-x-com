"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "../photoModal.module.css";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import { Post } from "@/model/Post";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";

type Props = {
    id: string;
};
export default function ImageZone({ id }: Props) {
    const { data: post, error } = useQuery<Post, Object, Post, [_1: string, string]>({
        queryKey: ["posts", id],
        queryFn: getSinglePost,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    if (!post?.Images[0]) {
        return null;
    }

    return (
        <div className={styles.imageZone}>
            <img src={post.Images[0].link} alt={post.content} />
            <div className={styles.image} style={{ backgroundImage: `url(${post.Images[0].link})` }} />
            <div className={styles.buttonZone}>
                <div className={styles.buttonInner}>
                    <ActionButtons white />
                </div>
            </div>
        </div>
    );
}
