import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ProtectedLayout } from '../../components/ProtectedLayout';
import { useWorksQuery } from '../../graphql/generated/types';
import styles from './works.module.css';

const WorksPage: NextPage = () => {
    const router = useRouter();
    const { data, loading, error } = useWorksQuery();

    const handleNewWork = () => {
        router.push('/works/new');
    };

    return (
        <ProtectedLayout>
            <div className={styles.header}>
                <h1 className={styles.title}>Works</h1>
                <button className={styles.newButton} onClick={handleNewWork}>
                    New Work
                </button>
            </div>

            {loading && <p className={styles.status}>Loading...</p>}
            {error && (
                <p className={styles.error}>
                    Error loading works: {error.message}
                </p>
            )}

            {!loading && !error && data?.works.length === 0 && (
                <div className={styles.empty}>
                    <p>No works yet. Create your first one.</p>
                    <button
                        className={styles.newButton}
                        onClick={handleNewWork}
                    >
                        Create Your First Work
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
                                            ? `${work.description.slice(0, 120)}…`
                                            : work.description}
                                    </p>
                                )}
                                <span className={styles.itemDate}>
                                    Created{' '}
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
