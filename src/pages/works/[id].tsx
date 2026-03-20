import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ProtectedLayout } from '../../components/ProtectedLayout';
import { CreditsSection } from '../../components/CreditsSection';
import { LinksSection } from '../../components/LinksSection';
import {
    useWorkQuery,
    useUpdateWorkMutation,
    useDeleteWorkMutation,
} from '../../graphql/generated/types';
import styles from './workDetail.module.css';

const WorkDetailPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const guid = typeof id === 'string' ? id : '';

    const { data, loading, error, refetch } = useWorkQuery({
        variables: { guid },
        skip: !guid,
    });

    const [updateWork, { loading: updating }] = useUpdateWorkMutation();
    const [deleteWork, { loading: deleting }] = useDeleteWorkMutation();

    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);
    const [titleDraft, setTitleDraft] = useState('');
    const [descriptionDraft, setDescriptionDraft] = useState('');
    const [updateError, setUpdateError] = useState<string | null>(null);

    const work = data?.work;

    const startEditTitle = () => {
        setTitleDraft(work?.title ?? '');
        setEditingTitle(true);
    };

    const startEditDescription = () => {
        setDescriptionDraft(work?.description ?? '');
        setEditingDescription(true);
    };

    const saveTitle = async () => {
        if (!guid || !titleDraft.trim()) return;
        setUpdateError(null);
        try {
            await updateWork({
                variables: { guid, title: titleDraft.trim() },
            });
            await refetch();
        } catch (err) {
            setUpdateError(
                err instanceof Error ? err.message : 'Failed to update title.',
            );
        }
        setEditingTitle(false);
    };

    const saveDescription = async () => {
        if (!guid) return;
        setUpdateError(null);
        try {
            await updateWork({
                variables: {
                    guid,
                    description: descriptionDraft.trim() || undefined,
                },
            });
            await refetch();
        } catch (err) {
            setUpdateError(
                err instanceof Error
                    ? err.message
                    : 'Failed to update description.',
            );
        }
        setEditingDescription(false);
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') saveTitle();
        if (e.key === 'Escape') setEditingTitle(false);
    };

    const handleDescriptionKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) saveDescription();
        if (e.key === 'Escape') setEditingDescription(false);
    };

    const handleDelete = async () => {
        if (!guid) return;
        if (
            !confirm(
                `Delete "${work?.title}"? This cannot be undone.`,
            )
        )
            return;
        try {
            await deleteWork({ variables: { guid } });
            router.push('/works');
        } catch (err) {
            setUpdateError(
                err instanceof Error ? err.message : 'Failed to delete work.',
            );
        }
    };

    if (loading) {
        return (
            <ProtectedLayout>
                <p className={styles.status}>Loading…</p>
            </ProtectedLayout>
        );
    }

    if (error || !work) {
        return (
            <ProtectedLayout>
                <div className={styles.breadcrumb}>
                    <Link href="/works" className={styles.breadcrumbLink}>
                        Works
                    </Link>
                </div>
                <p className={styles.error}>
                    {error ? error.message : 'Work not found.'}
                </p>
            </ProtectedLayout>
        );
    }

    return (
        <ProtectedLayout>
            <div className={styles.breadcrumb}>
                <Link href="/" className={styles.breadcrumbLink}>
                    Home
                </Link>
                <span className={styles.breadcrumbSep}> / </span>
                <Link href="/works" className={styles.breadcrumbLink}>
                    Works
                </Link>
                <span className={styles.breadcrumbSep}> / </span>
                <span className={styles.breadcrumbCurrent}>{work.title}</span>
            </div>

            {updateError && (
                <div className={styles.updateError}>{updateError}</div>
            )}

            <div className={styles.header}>
                <div className={styles.titleArea}>
                    {editingTitle ? (
                        <input
                            className={styles.titleInput}
                            value={titleDraft}
                            onChange={(e) => setTitleDraft(e.target.value)}
                            onBlur={saveTitle}
                            onKeyDown={handleTitleKeyDown}
                            autoFocus
                            disabled={updating}
                        />
                    ) : (
                        <h1
                            className={styles.title}
                            onClick={startEditTitle}
                            title="Click to edit"
                        >
                            {work.title}
                        </h1>
                    )}
                </div>
                <button
                    className={styles.deleteButton}
                    onClick={handleDelete}
                    disabled={deleting}
                >
                    {deleting ? 'Deleting…' : 'Delete Work'}
                </button>
            </div>

            <div className={styles.field}>
                <span className={styles.fieldLabel}>Description</span>
                {editingDescription ? (
                    <textarea
                        className={styles.descriptionInput}
                        value={descriptionDraft}
                        onChange={(e) =>
                            setDescriptionDraft(e.target.value)
                        }
                        onBlur={saveDescription}
                        onKeyDown={handleDescriptionKeyDown}
                        autoFocus
                        disabled={updating}
                        rows={4}
                    />
                ) : (
                    <p
                        className={
                            work.description
                                ? styles.description
                                : styles.descriptionEmpty
                        }
                        onClick={startEditDescription}
                        title="Click to edit"
                    >
                        {work.description ?? 'No description. Click to add one.'}
                    </p>
                )}
            </div>

            <div className={styles.meta}>
                <span className={styles.metaItem}>
                    <strong>Created:</strong>{' '}
                    {new Date(work.createdAt).toLocaleString()}
                </span>
                <span className={styles.metaItem}>
                    <strong>Updated:</strong>{' '}
                    {new Date(work.updatedAt).toLocaleString()}
                </span>
            </div>

            {work.versions.length > 0 && (
                <div className={styles.versionsSection}>
                    <h2 className={styles.sectionTitle}>Versions</h2>
                    <ul className={styles.versionList}>
                        {work.versions.map((v) => (
                            <li key={v.guid} className={styles.versionItem}>
                                <span className={styles.versionTitle}>
                                    {v.title}
                                </span>
                                <span className={styles.versionDate}>
                                    {new Date(v.createdAt).toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <CreditsSection workGuid={guid} />
            <LinksSection workGuid={guid} />
        </ProtectedLayout>
    );
};

export default WorkDetailPage;
