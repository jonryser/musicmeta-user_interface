import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ProtectedLayout } from '../../components/ProtectedLayout';
import { useWorksQuery } from '../../graphql/generated/types';
import styles from './works.module.css';
import { WORKS } from '../../constants/labels';
import { STATUS, ERRORS, EMPTY } from '../../constants/messages';

const WorksPage: NextPage = () => {
    const router = useRouter();
    const { data, loading, error } = useWorksQuery();

    const handleNewWork = () => {
        router.push('/works/new');
    };

    return (
        <ProtectedLayout>
            <div className={styles.header}>
                <h1 className={styles.title}>{WORKS.PAGE_TITLE}</h1>
                <button className={styles.newButton} onClick={handleNewWork}>
                    {WORKS.NEW_BUTTON}
                </button>
            </div>

            {loading && <p className={styles.status}>{STATUS.LOADING}</p>}
            {error && (
                <p className={styles.error}>
                    {ERRORS.LOADING_WORKS(error.message)}
                </p>
            )}

            {!loading && !error && data?.works.length === 0 && (
                <div className={styles.empty}>
                    <p>{EMPTY.WORKS}</p>
                    <button
                        className={styles.newButton}
                        onClick={handleNewWork}
                    >
                        {WORKS.CREATE_FIRST_BUTTON}
                    </button>
                </div>
            )}

            {data && data.works.length > 0 && (
                <ul className={styles.list}>
                    {data.works.map((work) => (
                        <li key={work.guid} className={styles.item}>
                            <Link
                                href={`/works/${work.guid}`}
                                className={styles.itemLink}
                            >
                                <h2 className={styles.itemTitle}>
                                    {work.title}
                                </h2>
                                {work.description && (
                                    <p className={styles.itemDescription}>
                                        {work.description.length > 120
                                            ? `${work.description.slice(0, 120)}\u2026`
                                            : work.description}
                                    </p>
                                )}
                                <span className={styles.itemDate}>
                                    {WORKS.CREATED_PREFIX}{' '}
                                    {new Date(
                                        work.createdAt,
                                    ).toLocaleDateString()}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </ProtectedLayout>
    );
};

export default WorksPage;
