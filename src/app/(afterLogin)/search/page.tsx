import styles from './search.module.css';
import SearchForm from '@/app/(afterLogin)/_component/SearchForm';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import Tab from './_component/Tab';
import SearchResult from './_component/SearchResult';
import { Metadata } from 'next';

type Props = {
    searchParams: { q: string; f?: string; pf?: string };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    return {
        title: `${searchParams.q} - 검색 / Z`,
        description: `${searchParams.q} - 검색 / Z`,
    };
}

export default function Page({ searchParams }: Props) {
    return (
        <main className={styles.main}>
            <div className={styles.searchTop}>
                <div className={styles.searchZone}>
                    <div className={styles.buttonZone}>
                        <BackButton />
                    </div>
                    <div className={styles.formZone}>
                        <SearchForm q={searchParams.q} />
                    </div>
                </div>
                <Tab />
            </div>
            <div className={styles.list}>
                <SearchResult searchParams={searchParams} />
            </div>
        </main>
    );
}
