import { useState } from 'react';
import {
    useLinksByWorkQuery,
    useCreateLinkMutation,
    useDeleteLinkMutation,
    LinkType,
} from '../../graphql/generated/types';
import type { LinksSectionProps } from './LinksSectionProps';
import styles from './LinksSection.module.css';

const LINK_TYPE_OPTIONS: { value: LinkType; label: string }[] = [
    { value: LinkType.Audio, label: 'Audio' },
    { value: LinkType.Image, label: 'Image' },
    { value: LinkType.Document, label: 'Document' },
    { value: LinkType.Video, label: 'Video' },
    { value: LinkType.Streaming, label: 'Streaming' },
    { value: LinkType.Purchase, label: 'Purchase' },
    { value: LinkType.Other, label: 'Other' },
];

const linkTypeBadgeClass = (linkType: LinkType): string => {
    const map: Record<LinkType, string> = {
        [LinkType.Audio]: styles.badgeAudio,
        [LinkType.Image]: styles.badgeImage,
        [LinkType.Document]: styles.badgeDocument,
        [LinkType.Video]: styles.badgeVideo,
        [LinkType.Streaming]: styles.badgeStreaming,
        [LinkType.Purchase]: styles.badgePurchase,
        [LinkType.Other]: styles.badgeOther,
    };
    return `${styles.badge} ${map[linkType] ?? styles.badgeOther}`;
};

export const LinksSection = ({ workGuid }: LinksSectionProps) => {
    const { data, loading, error, refetch } = useLinksByWorkQuery({
        variables: { workGuid },
    });

    const [createLink, { loading: creating }] = useCreateLinkMutation();
    const [deleteLink] = useDeleteLinkMutation();

    const [showForm, setShowForm] = useState(false);
    const [url, setUrl] = useState('');
    const [linkType, setLinkType] = useState<LinkType>(LinkType.Other);
    const [description, setDescription] = useState('');
    const [formError, setFormError] = useState<string | null>(null);

    const resetForm = () => {
        setUrl('');
        setLinkType(LinkType.Other);
        setDescription('');
        setFormError(null);
        setShowForm(false);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        if (!url.trim()) {
            setFormError('URL is required.');
            return;
        }
        try {
            await createLink({
                variables: {
                    workGuid,
                    url: url.trim(),
                    linkType,
                    description: description.trim() || undefined,
                },
            });
            await refetch();
            resetForm();
        } catch (err) {
            setFormError(
                err instanceof Error ? err.message : 'Failed to add link.',
            );
        }
    };

    const handleDelete = async (guid: string) => {
        if (!confirm('Remove this link?')) return;
        try {
            await deleteLink({ variables: { guid } });
            await refetch();
        } catch {
            // error visible via refetch state
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Links</h2>
                {!showForm && (
                    <button
                        className={styles.addButton}
                        onClick={() => setShowForm(true)}
                    >
                        Add Link
                    </button>
                )}
            </div>

            {loading && <p className={styles.status}>Loading links…</p>}
            {error && (
                <p className={styles.error}>
                    Error loading links: {error.message}
                </p>
            )}

            {showForm && (
                <form
                    onSubmit={handleAdd}
                    className={styles.form}
                    data-testid="link-form"
                >
                    {formError && (
                        <div className={styles.formError}>{formError}</div>
                    )}
                    <div className={styles.formRow}>
                        <div className={styles.formField}>
                            <label className={styles.formLabel}>
                                URL{' '}
                                <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="url"
                                className={styles.input}
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://..."
                                required
                            />
                        </div>
                        <div className={styles.formField}>
                            <label className={styles.formLabel}>Type</label>
                            <select
                                className={styles.select}
                                value={linkType}
                                onChange={(e) =>
                                    setLinkType(e.target.value as LinkType)
                                }
                            >
                                {LINK_TYPE_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.formField}>
                        <label className={styles.formLabel}>Description</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Optional description"
                        />
                    </div>
                    <div className={styles.formActions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={creating}
                        >
                            {creating ? 'Adding…' : 'Add Link'}
                        </button>
                    </div>
                </form>
            )}

            {data && data.linksByWork.length === 0 && !showForm && (
                <p className={styles.empty}>No links yet.</p>
            )}

            {data && data.linksByWork.length > 0 && (
                <ul className={styles.list}>
                    {data.linksByWork.map((link) => (
                        <li key={link.guid} className={styles.item}>
                            <span
                                className={linkTypeBadgeClass(link.linkType)}
                            >
                                {link.linkType}
                            </span>
                            <div className={styles.linkInfo}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.linkUrl}
                                >
                                    {link.url}
                                </a>
                                {link.description && (
                                    <span className={styles.linkDescription}>
                                        {link.description}
                                    </span>
                                )}
                            </div>
                            <button
                                className={styles.deleteButton}
                                onClick={() => handleDelete(link.guid)}
                                aria-label="Remove link"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};
