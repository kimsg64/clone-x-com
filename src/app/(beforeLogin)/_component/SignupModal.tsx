"use client";

import { useFormState, useFormStatus } from "react-dom";
import styles from "./signup.module.css";
import BackButton from "./BackButton";
import submit from "@/app/(beforeLogin)/_lib/signup";

function showMessage(msg: string | undefined) {
    if (!msg) return "";
    return `${msg.split("_")[1]}을/를 입력하세요.`;
}

export default function SignupModal() {
    const [state, formAction] = useFormState(submit, { message: "" });
    const { pending } = useFormStatus();

    return (
        <>
            <div className={styles.modalBackground}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <BackButton />
                        <div>계정을 생성하세요.</div>
                    </div>
                    <form action={formAction}>
                        <div className={styles.modalBody}>
                            <div className={styles.inputDiv}>
                                <label className={styles.inputLabel} htmlFor="id">
                                    아이디
                                </label>
                                <input id="id" name="id" className={styles.input} type="text" placeholder="" required />
                            </div>
                            <div className={styles.inputDiv}>
                                <label className={styles.inputLabel} htmlFor="name">
                                    닉네임
                                </label>
                                <input id="name" name="name" className={styles.input} type="text" placeholder="" required />
                            </div>
                            <div className={styles.inputDiv}>
                                <label className={styles.inputLabel} htmlFor="password">
                                    비밀번호
                                </label>
                                <input id="password" name="password" className={styles.input} type="password" placeholder="" required />
                            </div>
                            <div className={styles.inputDiv}>
                                <label className={styles.inputLabel} htmlFor="image">
                                    프로필
                                </label>
                                <input id="image" name="image" className={styles.input} type="file" accept="image/*" required />
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button type="submit" className={styles.actionButton} disabled={pending}>
                                가입하기
                            </button>
                            <div className={styles.error}>{showMessage(state?.message)}</div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
