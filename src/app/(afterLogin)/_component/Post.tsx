import Link from "next/link";

import PostImages from "./PostImages";
import ActionButtons from "./ActionButtons";
import PostArticle from "./PostArticle";
import styles from "./post.module.css";

import { Post } from "@/model/Post";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = { noImage?: boolean; post: Post };

export default function Post({ noImage, post }: Props) {
    const target = post;

    console.log("is there a target?", target);

    return (
        target && (
            <PostArticle post={target}>
                <div className={styles.postWrapper}>
                    <div className={styles.postUserSection}>
                        <Link href={`/${target.User.id}`} className={styles.postUserImage}>
                            <img src={target.User.image} alt={target.User.nickname} />
                            <div className={styles.postShade} />
                        </Link>
                    </div>
                    <div className={styles.postBody}>
                        <div className={styles.postMeta}>
                            <Link href={`/${target.User.id}`}>
                                <span className={styles.postUserName}>{target.User.nickname}</span>
                                &nbsp;
                                <span className={styles.postUserId}>@{target.User.id}</span>
                                &nbsp; · &nbsp;
                            </Link>
                            <span className={styles.postDate}>{dayjs(target.createdAt).fromNow(true)}</span>
                        </div>
                        <div>{target.content}</div>
                        {!noImage && (
                            <div>
                                <PostImages post={target} />
                            </div>
                        )}
                        <ActionButtons />
                    </div>
                </div>
            </PostArticle>
        )
    );
}
