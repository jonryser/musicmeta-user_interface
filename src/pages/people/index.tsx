import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { ProtectedLayout } from '../../components/ProtectedLayout';
import { usePeopleQuery } from '../../graphql/generated/types';
import styles from './people.module.css';

const PeoplePage: NextPage = () => {
    const { data, loading, error } = usePeopleQuery();
    const [search, setSearch] = useState('');

    const filtered = data?.people.filter((person) => {
        const q = search.toLowerCase();
        return (
            person.firstName.toLowerCase().includes(q) ||
            person.lastName.toLowerCase().includes(q) ||
            (person.email?.toLowerCase().includes(q) ?? false)
        );
    });

    return (
        <ProtectedLayout>
            <div className={styles.header}>
                <h1 className={styles.title}>People</h1>
            </div>

            <div className={styles.searchBar}>
                <input
                    type="search"
                    className={styles.searchInput}
                    placeholder="Search by name or email…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search people"
                />
            </div>

            {loading && <p className={styles.status}>Loading…</p>}
            {error && (
                <p className={styles.error}>
                    Error loading people: {error.message}
                </p>
            )}

            {!loading && !error && filtered?.length === 0 && (
                <p className={styles.empty}>
                    {search
                        ? `No people match "${search}".`
                        : 'No people in the directory yet.'}
                </p>
            )}

            {filtered && filtered.length > 0 && (
                <ul className={styles.list}>
                    {filtered.map((person) => (
                        <li key={person.guid} className={styles.item}>
                            <Link
                                href={`/people/${person.guid}`}
                                className={styles.itemLink}
                            >
                                <span className={styles.itemName}>
                                    {person.firstName} {person.lastName}
                                </span>
                                {person.email && (
                                    <span className={styles.itemEmail}>
                                        {person.email}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </ProtectedLayout>
    );
};

export default PeoplePage;
