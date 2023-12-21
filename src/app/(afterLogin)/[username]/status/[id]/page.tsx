import BackButton from "@/app/(afterLogin)/_component/BackButton";
import styles from "./singlePost.module.css";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "./_component/CommentForm";

export default function Page() {
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <BackButton />
                <h3 className={styles.headerTitle}>게시하기</h3>
            </div>
            <Post />
            <CommentForm />
            <div>
                {/* 임시: Comment들 */}
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    );
}
