'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { DefaultError, InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import cx from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
dayjs.locale('ko');
dayjs.extend(relativeTime);

import { getMessages } from '../../_lib/getMessages';
import { Message } from '@/model/Message';
import { useMessageStore } from '@/store/message';
import useSocket from '../_lib/useSocket';

import styles from './chatRoom.module.css';

type Props = { id: string };

export default function MessageList({ id }: Props) {
    const { data: session } = useSession();
    const [pageRendered, setPageRendered] = useState(false);
    const [adjustingScroll, setAdjustingScroll] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const { shouldGoDown, setShouldGoDown } = useMessageStore();
    const [socket] = useSocket();
    const queryClient = useQueryClient();

    const {
        data: messages,
        hasPreviousPage,
        fetchPreviousPage,
        isFetching,
    } = useInfiniteQuery<
        Message[],
        DefaultError,
        InfiniteData<Message[]>,
        [string, { senderId: string; receiverId: string }, string],
        number
    >({
        queryKey: ['rooms', { senderId: session?.user?.email as string, receiverId: id }, 'messages'],
        queryFn: getMessages,
        enabled: !!(session?.user?.email && id),
        initialPageParam: 0,
        getPreviousPageParam: (firstPage) => firstPage.at(-1)?.messageId,
        getNextPageParam: (lastPage) => lastPage.at(-1)?.messageId,
    });

    const { ref, inView } = useInView({
        threshold: 0,
        delay: 1,
    });

    useEffect(() => {
        if (inView) {
            if (!isFetching && hasPreviousPage && !adjustingScroll) {
                const prevHeight = listRef.current?.scrollHeight || 0;
                fetchPreviousPage().then(() => {
                    setAdjustingScroll(true);
                    setTimeout(() => {
                        console.log('prevHeight', prevHeight, listRef.current?.scrollHeight);
                        if (listRef.current) {
                            listRef.current.scrollTop = listRef.current.scrollHeight - prevHeight;
                        }
                        setAdjustingScroll(false);
                    }, 0);
                });
            }
        }
    }, [inView, isFetching, hasPreviousPage, fetchPreviousPage, adjustingScroll]);

    let hasMessages = !!messages;
    useEffect(() => {
        if (hasMessages) {
            if (listRef.current) {
                listRef.current.scrollTop = listRef.current?.scrollHeight;
            }
            setPageRendered(true);
        }
    }, [hasMessages]);

    useEffect(() => {
        if (shouldGoDown) {
            if (listRef.current) {
                listRef.current.scrollTop = listRef.current?.scrollHeight;
                setShouldGoDown(false);
            }
        }
    }, [shouldGoDown, setShouldGoDown]);

    useEffect(() => {
        socket?.on('receiveMessage', (data) => {
            // 리액트 쿼리 데이터에 추가
            const exMessages = queryClient.getQueryData([
                'rooms',
                { senderId: session?.user?.email, receiverId: id },
                'messages',
            ]) as InfiniteData<Message[]>;
            if (exMessages && typeof exMessages === 'object') {
                const newMessages = { ...exMessages, pages: [...exMessages.pages] };
                const lastPage = newMessages.pages.at(-1);
                const newLastPage = lastPage ? [...lastPage] : [];
                newLastPage.push(data);
                newMessages.pages[newMessages.pages.length - 1] = newLastPage;
                queryClient.setQueryData(
                    ['rooms', { senderId: session?.user?.email, receiverId: id }, 'messages'],
                    newMessages
                );
                setShouldGoDown(true);
            }
        });
        return () => {
            socket?.off('receiveMessage');
        };
    }, [socket]);

    return (
        <div className={styles.list} ref={listRef}>
            {!adjustingScroll && pageRendered && <div ref={ref} style={{ height: 1 }} />}
            {messages?.pages?.map((page) =>
                page.map((m) => {
                    if (m.senderId === session?.user?.email) {
                        return (
                            <div key={m.messageId} className={cx(styles.message, styles.myMessage)}>
                                <div className={styles.content}>{m.content}</div>
                                <div className={styles.date}>
                                    {dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div key={m.messageId} className={cx(styles.message, styles.yourMessage)}>
                            <div className={styles.content}>{m.content}</div>
                            <div className={styles.date}>
                                {dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
