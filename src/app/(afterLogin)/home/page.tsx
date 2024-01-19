import { Suspense } from "react";
import styles from "./home.module.css";
import TabProvider from "./_component/TabProvider";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import TabDecider from "./_component/TabDecider";
import Loading from "./loading";
import { auth } from "@/auth";

export default async function HomePage() {
    const session = await auth();
    return (
        <main className={styles.main}>
            <TabProvider>
                <Tab />
                <PostForm me={session} />
                <Suspense fallback={<Loading />}>
                    <TabDecider />
                </Suspense>
            </TabProvider>
        </main>
    );
}
