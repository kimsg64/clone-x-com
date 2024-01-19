import Link from "next/link";
import styles from "./trend.module.css";
import { Hashtag } from "@/model/Hashtag";

type Props = { trend: Hashtag };

export default function Trend({ trend }: Props) {
    return (
        <Link href={`/search?q=${encodeURIComponent(trend.title)}`} className={styles.container}>
            <div className={styles.count}>실시간트렌드</div>
            <div className={styles.title}>{trend.title}</div>
            <div className={styles.count}>{trend.count.toLocaleString()} posts</div>
        </Link>
    );
}
