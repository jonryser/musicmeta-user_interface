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
            setFormError('Title is required.');
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
                err instanceof Error ? err.message : 'Failed to create work.',
            );
        }
    };

    return (
        <ProtectedLayout>
            <div className={styles.breadcrumb}>
                <Link href="/works" className={styles.breadcrumbLink}>
                    Works
                </Link>
                <span className={styles.breadcrumbSep}> / </span>
                <span>New Work</span>
            </div>

            <h1 className={styles.title}>Create New Work</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                {formError && (
                    <div className={styles.error}>{formError}</div>
                )}

                <div className={styles.field}>
                    <label htmlFor="title" className={styles.label}>
                        Title <span className={styles.required}>*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        className={styles.input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter work title"
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="description" className={styles.label}>
                        Description
                    </label>
                    <textarea
                        id="description"
                        className={styles.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Optional description"
                        rows={4}
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="parentId" className={styles.label}>
                        Parent Work{' '}
                        <span className={styles.hint}>(for version tree)</span>
                    </label>
                    <select
                        id="parentId"
                        className={styles.select}
                        value={parentId}
                        onChange={(e) => setParentId(e.target.value)}
                    >
                        <option value="">None</option>
                        {worksData?.works.map((work) => (
                            <option key={work.guid} value={work.guid}>
                                {work.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.actions}>
                    <Link href="/works" className={styles.cancelLink}>
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Creating…' : 'Create Work'}
                    </button>
                </div>
            </form>
        </ProtectedLayout>
    );
};

export default NewWorkPage;
