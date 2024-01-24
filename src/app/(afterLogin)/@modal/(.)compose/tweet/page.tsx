"use client";
import { ChangeEventHandler, FormEvent, FormEventHandler, useRef, useState } from "react";
import styles from "./modal.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import TextareaAutosize from "react-textarea-autosize";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { Post as IPost, Post } from "@/model/Post";
import { useModalStore } from "@/store/modal";
import Link from "next/link";

export default function TweetModal() {
    const [content, setContent] = useState("");
    const [preview, setPreview] = useState<Array<{ dataUrl: string; file: File } | null>>([]);
    const imageRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { data: me } = useSession();
    const queryClient = useQueryClient();
    const modalStore = useModalStore();
    const parent = modalStore.data;

    const mutation = useMutation({
        mutationFn: async (e: FormEvent) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append("content", content);
            preview.forEach((p) => {
                p && formData.append("images", p.file);
            });

            return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
                method: "post",
                credentials: "include",
                body: formData,
            });
        },
        async onSuccess(data, variables) {
            setPreview([]);
            setContent("");
            const newPost = await data.json();
            const queryCache = queryClient.getQueryCache();
            const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
            console.log("queryKeys", queryKeys);
            queryKeys.forEach((queryKey) => {
                if (queryKey[0] === "posts") {
                    const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
                    if (value && "pages" in value) {
                        const obj = value.pages.flat().find((v) => v.postId === parent?.postId);
                        if (obj) {
                            const shallow = { ...value, pages: [...value.pages] };
                            shallow.pages[0] = [...shallow.pages[0]];
                            shallow.pages[0].unshift(newPost);
                            queryClient.setQueryData(queryKey, shallow);
                        }
                    }
                }
            });
            await queryClient.invalidateQueries({
                queryKey: ["trends"],
            });
        },
        onError(error, variables, context) {
            console.error("let me know about error", error);
            alert("업로드 중 에러 발생");
        },
        onSettled() {
            router.back();
        },
    });

    const comment = useMutation({
        mutationFn: async (e: FormEvent) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append("content", content);
            preview.forEach((p) => {
                p && formData.append("images", p.file);
            });

            return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${parent?.postId}/comments`, {
                method: "post",
                credentials: "include",
                body: formData,
            });
        },
        async onSuccess(data, variables) {
            setPreview([]);
            setContent("");
            const newPost = await data.json();
            const queryCache = queryClient.getQueryCache();
            const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
            console.log("queryKeys", queryKeys);
            queryKeys.forEach((queryKey) => {
                if (queryKey[0] === "posts") {
                    const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
                    if (value && "pages" in value) {
                        const obj = value.pages.flat().find((v) => v.postId === parent?.postId);
                        if (obj) {
                            const pageIndex = value.pages.findIndex((page) => page.includes(obj));
                            const index = value.pages[pageIndex].findIndex((v) => v.postId === parent?.postId);
                            const shallow = { ...value };
                            value.pages = { ...value.pages };
                            value.pages[pageIndex] = [...value.pages[pageIndex]];
                            shallow.pages[pageIndex][index] = {
                                ...shallow.pages[pageIndex][index],
                                Comments: [{ userId: me?.user?.email as string }],
                                _count: {
                                    ...shallow.pages[pageIndex][index]._count,
                                    Comments: shallow.pages[pageIndex][index]._count.Comments + 1,
                                },
                            };
                            shallow.pages[0].unshift(newPost); // 새 답글 추가
                            queryClient.setQueryData(queryKey, shallow);
                        }
                    } else if (value) {
                        // 싱글 포스트인 경우
                        if (value.postId === parent?.postId) {
                            const shallow = {
                                ...value,
                                Comments: [{ userId: me?.user?.email as string }],
                                _count: {
                                    ...value._count,
                                    Comments: value._count.Comments + 1,
                                },
                            };
                            queryClient.setQueryData(queryKey, shallow);
                        }
                    }
                }
            });
            await queryClient.invalidateQueries({
                queryKey: ["trends"],
            });
        },
        onError(error, variables, context) {
            console.error("let me know about error", error);
            alert("업로드 중 에러 발생");
        },
        onSettled() {
            modalStore.reset();
            router.back();
        },
    });

    const onClickClose = () => router.back();

    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setContent(e.target.value);
    };

    const onClickButton = () => {
        imageRef.current?.click();
    };

    const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        if (e.target.files) {
            Array.from(e.target.files).forEach((file, idx) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview((prevPreview) => {
                        const prev = [...prevPreview];
                        prev[idx] = { dataUrl: reader.result as string, file };
                        return prev;
                    });
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const onRemoveImage = (idx: number) => () => {
        setPreview((prevPreview) => {
            const prev = [...prevPreview];
            prev[idx] = null;
            return prev;
        });
    };

    const onSubmit: FormEventHandler = (e) => {
        if (modalStore.mode === "new") {
            mutation.mutate(e);
        } else {
            comment.mutate(e);
        }
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClickClose}>
                    <svg width={24} viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                        <g>
                            <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                        </g>
                    </svg>
                </button>
                <form className={styles.modalForm} onSubmit={onSubmit}>
                    {modalStore.mode === "comment" && parent && (
                        <div className={styles.modalOriginal}>
                            <div className={styles.postUserSection}>
                                <div className={styles.postUserImage}>
                                    <img src={parent.User.image} alt={parent.User.id} />
                                </div>
                            </div>
                            <div>
                                {parent.content}
                                <div>
                                    <Link href={`/${parent.User.id}`} style={{ color: "rgb(29, 155, 240)" }}>
                                        @{parent.User.id}
                                    </Link>
                                    님에게 보내는 답글
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={styles.modalBody}>
                        <div className={styles.postUserSection}>
                            <div className={styles.postUserImage}>
                                <img src={me?.user?.image as string} alt={me?.user?.email as string} />
                            </div>
                        </div>
                        <div className={styles.inputDiv}>
                            <TextareaAutosize
                                className={styles.input}
                                placeholder={modalStore.mode === "comment" ? "답글 게시하기" : "무슨 일이 일어나고 있나요?"}
                                value={content}
                                onChange={onChange}
                            />
                        </div>
                        <div style={{ display: "flex" }}>
                            {preview.map(
                                (v, index) =>
                                    v && (
                                        <div key={index} style={{ flex: 1 }} onClick={onRemoveImage(index)}>
                                            <img src={v.dataUrl} alt="미리보기" style={{ width: "100%", objectFit: "contain", maxHeight: 100 }} />
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                    <div className={styles.modalFooter}>
                        <div className={styles.modalDivider} />
                        <div className={styles.footerButtons}>
                            <div className={styles.footerButtonLeft}>
                                <input type="file" name="imageFiles" multiple hidden ref={imageRef} onChange={onUpload} />
                                <button className={styles.uploadButton} type="button" onClick={onClickButton}>
                                    <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                                        <g>
                                            <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                            <button className={styles.actionButton} disabled={!content}>
                                게시하기
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
