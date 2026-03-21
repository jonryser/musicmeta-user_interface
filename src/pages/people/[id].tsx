import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ProtectedLayout } from '../../components/ProtectedLayout';
import { usePersonQuery } from '../../graphql/generated/types';
import styles from './personDetail.module.css';

const PersonDetailPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const guid = typeof id === 'string' ? id : '';

    const { data, loading, error } = usePersonQuery({
        variables: { guid },
        skip: !guid,
    });

    const person = data?.person;

    if (loading) {
        return (
            <ProtectedLayout>
                <p className={styles.status}>Loading…</p>
            </ProtectedLayout>
        );
    }

    if (error || !person) {
        return (
            <ProtectedLayout>
                <div className={styles.breadcrumb}>
                    <Link href="/people" className={styles.breadcrumbLink}>
                        People
                    </Link>
                </div>
                <p className={styles.error}>
                    {error ? error.message : 'Person not found.'}
                </p>
            </ProtectedLayout>
        );
    }

    return (
        <ProtectedLayout>
            <div className={styles.breadcrumb}>
                <Link href="/people" className={styles.breadcrumbLink}>
                    People
                </Link>
                <span className={styles.breadcrumbSep}> / </span>
                <span className={styles.breadcrumbCurrent}>
                    {person.firstName} {person.lastName}
                </span>
            </div>

            <h1 className={styles.title}>
                {person.firstName} {person.lastName}
            </h1>

            <div className={styles.card}>
                <div className={styles.field}>
                    <span className={styles.fieldLabel}>First Name</span>
                    <span className={styles.fieldValue}>
                        {person.firstName}
                    </span>
                </div>
                <div className={styles.field}>
                    <span className={styles.fieldLabel}>Last Name</span>
                    <span className={styles.fieldValue}>{person.lastName}</span>
                </div>
                {person.email && (
                    <div className={styles.field}>
                        <span className={styles.fieldLabel}>Email</span>
                        <a
                            href={`mailto:${person.email}`}
                            className={styles.emailLink}
                        >
                            {person.email}
                        </a>
                    </div>
                )}
                <div className={styles.field}>
                    <span className={styles.fieldLabel}>Added</span>
                    <span className={styles.fieldValue}>
                        {new Date(person.createdAt).toLocaleString()}
                    </span>
                </div>
                <div className={styles.field}>
                    <span className={styles.fieldLabel}>Last Updated</span>
                    <span className={styles.fieldValue}>
                        {new Date(person.updatedAt).toLocaleString()}
                    </span>
                </div>
            </div>
        </ProtectedLayout>
    );
};

export default PersonDetailPage;
