import styles from './profile.module.css';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import UserPost from './_component/UserPost';
import UserInfo from './_component/UserInfo';
import { getUserPosts } from './_lib/getUserPosts';
import { getUserServer } from './_lib/getUserServer';
import { auth } from '@/auth';
import { Metadata } from 'next';
import { User } from '@/model/User';

type Props = { params: { username: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const user: User = await getUserServer({ queryKey: ['users', params.username] });
    return {
        title: `${user.nickname} (${user.id}) / Z`,
        description: `${user.nickname} (${user.id}) 프로필`,
        openGraph: {
            title: `${user.nickname} (${user.id}) / Z`,
            description: `${user.nickname} (${user.id}) 프로필`,
            images: [
                {
                    url: `https://z.nodebird.com${user.image}`,
                    width: 400,
                    height: 400,
                },
            ],
        },
    };
}

export default async function Page({ params }: Props) {
    const { username } = params;
    const session = await auth();
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({ queryKey: ['users', username], queryFn: getUserServer });
    await queryClient.prefetchQuery({ queryKey: ['posts', 'users', username], queryFn: getUserPosts });
    const dehydratedState = dehydrate(queryClient);

    return (
        <main className={styles.main}>
            <HydrationBoundary state={dehydratedState}>
                <UserInfo username={username} session={session} />
                <div>
                    <UserPost username={username} />
                </div>
            </HydrationBoundary>
        </main>
    );
}
