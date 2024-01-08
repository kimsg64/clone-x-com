import { Suspense } from "react";
import styles from "./home.module.css";
import TabProvider from "./_component/TabProvider";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import TabDecider from "./_component/TabDecider";
import Loading from "./loading";

export default async function HomePage() {
    return (
        <main className={styles.main}>
            <TabProvider>
                <Tab />
                <PostForm />
                <Suspense fallback={<Loading />}>
                    <TabDecider />
                </Suspense>
            </TabProvider>
        </main>
    );
}
