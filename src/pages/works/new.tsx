import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ProtectedLayout } from '../../components/ProtectedLayout';
import {
    useCreateWorkMutation,
    useWorksQuery,
} from '../../graphql/generated/types';
import styles from './workForm.module.css';
import { WORKS, COMMON } from '../../constants/labels';
import { ERRORS, LOADING_STATES } from '../../constants/messages';
import { BREADCRUMBS } from '../../constants/navigation';

const NewWorkPage: NextPage = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [parentId, setParentId] = useState('');
    const [formError, setFormError] = useState<string | null>(null);

    const { data: worksData } = useWorksQuery();
    const [createWork, { loading }] = useCreateWorkMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (!title.trim()) {
            setFormError(ERRORS.TITLE_REQUIRED);
            return;
        }

        try {
            const result = await createWork({
                variables: {
                    title: title.trim(),
                    description: description.trim() || undefined,
                },
            });
            const newGuid = result.data?.createWork.guid;
            if (newGuid) {
                router.push(`/works/${newGuid}`);
            }
        } catch (err) {
            setFormError(
                err instanceof Error ? err.message : ERRORS.FAILED_CREATE_WORK,
            );
        }
    };

    return (
        <ProtectedLayout>
            <div className={styles.breadcrumb}>
                <Link href="/works" className={styles.breadcrumbLink}>
                    {BREADCRUMBS.WORKS}
                </Link>
                <span className={styles.breadcrumbSep}> / </span>
                <span>{BREADCRUMBS.NEW_WORK}</span>
            </div>

            <h1 className={styles.title}>{WORKS.CREATE_NEW_HEADING}</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                {formError && (
                    <div className={styles.error}>{formError}</div>
                )}

                <div className={styles.field}>
                    <label htmlFor="title" className={styles.label}>
                        {WORKS.FIELD_TITLE} <span className={styles.required}>*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        className={styles.input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={WORKS.PLACEHOLDER_TITLE}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="description" className={styles.label}>
                        {WORKS.FIELD_DESCRIPTION}
                    </label>
                    <textarea
                        id="description"
                        className={styles.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={WORKS.PLACEHOLDER_DESCRIPTION}
                        rows={4}
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="parentId" className={styles.label}>
                        {WORKS.FIELD_PARENT_WORK}{' '}
                        <span className={styles.hint}>{WORKS.FIELD_PARENT_HINT}</span>
                    </label>
                    <select
                        id="parentId"
                        className={styles.select}
                        value={parentId}
                        onChange={(e) => setParentId(e.target.value)}
                    >
                        <option value="">{WORKS.FIELD_NONE_OPTION}</option>
                        {worksData?.works.map((work) => (
                            <option key={work.guid} value={work.guid}>
                                {work.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.actions}>
                    <Link href="/works" className={styles.cancelLink}>
                        {COMMON.CANCEL}
                    </Link>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? LOADING_STATES.CREATING : WORKS.SUBMIT_BUTTON}
                    </button>
                </div>
            </form>
        </ProtectedLayout>
    );
};

export default NewWorkPage;
