import styles from "./profile.module.css";

import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import UserPost from "./_component/UserPost";
import UserInfo from "./_component/UserInfo";
import { getUserPosts } from "./_lib/getUserPosts";
import { getUser } from "./_lib/getUser";

type Props = { params: { username: string } };

export default async function Page({ params }: Props) {
    const { username } = params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({ queryKey: ["users", username], queryFn: getUser });
    await queryClient.prefetchQuery({ queryKey: ["posts", "users", username], queryFn: getUserPosts });
    const dehydratedState = dehydrate(queryClient);

    return (
        <main className={styles.main}>
            <HydrationBoundary state={dehydratedState}>
                <UserInfo username={username} />
                <div>
                    <UserPost username={username} />
                </div>
            </HydrationBoundary>
        </main>
    );
}
