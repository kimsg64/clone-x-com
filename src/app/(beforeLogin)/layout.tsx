import styles from '@/app/page.module.css';

type Props = { children: React.ReactNode; modal: React.ReactNode };

export default function BeforLoginLayout({ children, modal }: Props) {
    return (
        <div className={styles.container}>
            {children}
            {modal}
        </div>
    );
}
