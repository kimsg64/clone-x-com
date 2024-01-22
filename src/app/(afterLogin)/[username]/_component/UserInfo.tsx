'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styles from '../profile.module.css';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import { User } from '@/model/User';
import { getUser } from '../_lib/getUser';
import cx from 'classnames';
import { MouseEventHandler } from 'react';
import { Session } from 'next-auth';

type Props = { username: string; session: Session | null };
export default function UserInfo({ username, session }: Props) {
    const { data: user, error } = useQuery<User, Object, User, [_1: string, string]>({
        queryKey: ['users', username],
        queryFn: getUser,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });
    // const { data: session } = useSession();
    const queryClient = useQueryClient();

    const follow = useMutation({
        mutationFn: async (userId: string) => {
            return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
                method: 'post',
                credentials: 'include',
            });
        },
        onMutate(userId) {
            const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends']);
            if (value) {
                const index = value.findIndex((v) => v.id === userId);
                if (index > -1) {
                    const shallow = [...value];
                    shallow[index] = {
                        ...shallow[index],
                        Followers: [{ id: session?.user?.email as string }],
                        _count: {
                            ...shallow[index]._count,
                            Followers: shallow[index]._count?.Followers + 1,
                        },
                    };
                    queryClient.setQueryData(['users', 'followRecommends'], shallow);
                }
            }
            const value2: User | undefined = queryClient.getQueryData(['users', userId]);
            if (value2) {
                const shallow: User = {
                    ...value2,
                    Followers: [{ id: session?.user?.email as string }],
                    _count: {
                        ...value2._count,
                        Followers: value2._count?.Followers + 1,
                    },
                };
                queryClient.setQueryData(['users', userId], shallow);
            }
        },
        onError(error, userId) {
            const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends']);
            if (value) {
                const index = value.findIndex((v) => v.id === userId);
                if (index > -1) {
                    const shallow = [...value];
                    shallow[index] = {
                        ...shallow[index],
                        Followers: shallow[index].Followers.filter((v) => v.id !== session?.user?.email),
                        _count: {
                            ...shallow[index]._count,
                            Followers: shallow[index]._count?.Followers - 1,
                        },
                    };
                    queryClient.setQueryData(['users', 'followRecommends'], shallow);
                }
            }

            const value2: User | undefined = queryClient.getQueryData(['users', userId]);
            if (value2) {
                const shallow: User = {
                    ...value2,
                    Followers: value2.Followers.filter((v) => v.id !== session?.user?.email),
                    _count: {
                        ...value2._count,
                        Followers: value2._count?.Followers - 1,
                    },
                };
                queryClient.setQueryData(['users', userId], shallow);
            }
        },
    });
    const unFollow = useMutation({
        mutationFn: async (userId: string) => {
            return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
                method: 'delete',
                credentials: 'include',
            });
        },
        onMutate(userId) {
            const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends']);
            if (value) {
                const index = value.findIndex((v) => v.id === userId);
                if (index > -1) {
                    const shallow = [...value];
                    shallow[index] = {
                        ...shallow[index],
                        Followers: shallow[index].Followers.filter((v) => v.id !== session?.user?.email),
                        _count: {
                            ...shallow[index]._count,
                            Followers: shallow[index]._count?.Followers - 1,
                        },
                    };
                    queryClient.setQueryData(['users', 'followRecommends'], shallow);
                }
            }

            const value2: User | undefined = queryClient.getQueryData(['users', userId]);
            if (value2) {
                const shallow: User = {
                    ...value2,
                    Followers: value2.Followers.filter((v) => v.id !== session?.user?.email),
                    _count: {
                        ...value2._count,
                        Followers: value2._count?.Followers - 1,
                    },
                };
                queryClient.setQueryData(['users', userId], shallow);
            }
        },
        onError(error, userId) {
            const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends']);
            if (value) {
                const index = value.findIndex((v) => v.id === userId);
                if (index > -1) {
                    const shallow = [...value];
                    shallow[index] = {
                        ...shallow[index],
                        Followers: [{ id: session?.user?.email as string }],
                        _count: {
                            ...shallow[index]._count,
                            Followers: shallow[index]._count?.Followers + 1,
                        },
                    };
                    queryClient.setQueryData(['users', 'followRecommends'], shallow);
                }
            }
            const value2: User | undefined = queryClient.getQueryData(['users', userId]);
            if (value2) {
                const shallow: User = {
                    ...value2,
                    Followers: [{ id: session?.user?.email as string }],
                    _count: {
                        ...value2._count,
                        Followers: value2._count?.Followers + 1,
                    },
                };
                queryClient.setQueryData(['users', userId], shallow);
            }
        },
    });

    if (!!error) {
        console.log('you have this error', error);
        return (
            <>
                <div className={styles.header}>
                    <BackButton />
                    <h3 className={styles.headerTitle}>프로필</h3>
                </div>
                <div className={styles.userZone}>
                    <div className={styles.userImage}></div>
                    <div className={styles.userName}>
                        <div>@{username}</div>
                    </div>
                </div>
                <div
                    style={{
                        height: 100,
                        fontSize: 31,
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    계정이 존재하지 않음
                </div>
            </>
        );
    }

    if (!user) {
        console.log('no user');
        return null;
    }

    const followed = !!user?.Followers?.find((v) => v.id === session?.user?.email);

    const onFollow: MouseEventHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (followed) {
            unFollow.mutate(user.id);
        } else {
            follow.mutate(user.id);
        }
    };

    return (
        <>
            <div className={styles.header}>
                <BackButton />
                <h3 className={styles.headerTitle}>{user.nickname}</h3>
            </div>
            <div className={styles.userZone}>
                <div className={styles.userRow}>
                    <div className={styles.userImage}>
                        <img src={user.image} alt={user.id} />
                    </div>
                    <div className={styles.userName}>
                        <div>{user.nickname}</div>
                        <div>@{user.id}</div>
                    </div>
                    {user.id !== session?.user?.email && (
                        <button onClick={onFollow} className={cx(styles.followButton, followed && styles.followed)}>
                            {followed ? '팔로잉' : '팔로우'}
                        </button>
                    )}
                </div>
                <div className={styles.userFollower}>
                    <div>{user._count.Followers} 팔로워</div>
                    &nbsp;
                    <div>{user._count.Followings} 팔로우 중</div>
                </div>
            </div>
        </>
    );
}
