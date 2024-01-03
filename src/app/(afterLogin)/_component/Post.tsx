import Link from "next/link";

import PostImages from "./PostImages";
import ActionButtons from "./ActionButtons";
import PostArticle from "./PostArticle";
import styles from "./post.module.css";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { faker } from "@faker-js/faker";
import { Post } from "@/model/Post";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = { noImage?: boolean; post: Post };

export default function Post({ noImage, post }: Props) {
    // const target = {
    //     User: {
    //         id: "elonmusk",
    //         nickname: "Elon Musk",
    //         image: "/yRsRRjGO.jpg",
    //     },
    //     content: "클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ",
    //     createdAt: new Date(),
    //     Images: [] as any[],
    //     postId: 125,
    // };

    const target = post;
    if (Math.random() > 0.5 && !noImage) {
        target.Images.push({ imageId: 1, link: faker.image.urlLoremFlickr() });
        target.Images.push({ imageId: 2, link: faker.image.urlLoremFlickr() });
        target.Images.push({ imageId: 3, link: faker.image.urlLoremFlickr() });
        target.Images.push({ imageId: 4, link: faker.image.urlLoremFlickr() });
    }

    console.log("have target", target);

    return (
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
                    <div>
                        <PostImages post={target} />
                    </div>
                    <ActionButtons />
                </div>
            </div>
        </PostArticle>
    );
}
