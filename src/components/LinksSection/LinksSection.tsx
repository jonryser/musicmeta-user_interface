import { useState } from 'react';
import {
    useLinksByWorkQuery,
    useCreateLinkMutation,
    useDeleteLinkMutation,
    LinkType,
} from '../../graphql/generated/types';
import type { LinksSectionProps } from './LinksSectionProps';
import styles from './LinksSection.module.css';
import { LINKS, COMMON } from '../../constants/labels';
import { STATUS, ERRORS, EMPTY, CONFIRM, LOADING_STATES } from '../../constants/messages';
import { ARIA } from '../../constants/aria';

const LINK_TYPE_OPTIONS: { value: LinkType; label: string }[] = [
    { value: LinkType.Audio, label: LINKS.LINK_TYPE_AUDIO },
    { value: LinkType.Image, label: LINKS.LINK_TYPE_IMAGE },
    { value: LinkType.Document, label: LINKS.LINK_TYPE_DOCUMENT },
    { value: LinkType.Video, label: LINKS.LINK_TYPE_VIDEO },
    { value: LinkType.Streaming, label: LINKS.LINK_TYPE_STREAMING },
    { value: LinkType.Purchase, label: LINKS.LINK_TYPE_PURCHASE },
    { value: LinkType.Other, label: LINKS.LINK_TYPE_OTHER },
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
            setFormError(ERRORS.URL_REQUIRED);
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
                err instanceof Error ? err.message : ERRORS.FAILED_ADD_LINK,
            );
        }
    };

    const handleDelete = async (guid: string) => {
        if (!confirm(CONFIRM.REMOVE_LINK)) return;
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
                <h2 className={styles.sectionTitle}>{LINKS.SECTION_TITLE}</h2>
                {!showForm && (
                    <button
                        className={styles.addButton}
                        onClick={() => setShowForm(true)}
                    >
                        {LINKS.ADD_BUTTON}
                    </button>
                )}
            </div>

            {loading && <p className={styles.status}>{STATUS.LOADING_LINKS}</p>}
            {error && (
                <p className={styles.error}>
                    {ERRORS.LOADING_LINKS(error.message)}
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
                                {LINKS.FIELD_URL}{' '}
                                <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="url"
                                className={styles.input}
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder={LINKS.PLACEHOLDER_URL}
                                required
                            />
                        </div>
                        <div className={styles.formField}>
                            <label className={styles.formLabel}>{LINKS.FIELD_TYPE}</label>
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
                        <label className={styles.formLabel}>{LINKS.FIELD_DESCRIPTION}</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={LINKS.PLACEHOLDER_DESCRIPTION}
                        />
                    </div>
                    <div className={styles.formActions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={resetForm}
                        >
                            {COMMON.CANCEL}
                        </button>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={creating}
                        >
                            {creating ? LOADING_STATES.ADDING : LINKS.ADD_BUTTON}
                        </button>
                    </div>
                </form>
            )}

            {data && data.linksByWork.length === 0 && !showForm && (
                <p className={styles.empty}>{EMPTY.LINKS}</p>
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
                                aria-label={ARIA.REMOVE_LINK}
                            >
                                {LINKS.REMOVE_BUTTON}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};
