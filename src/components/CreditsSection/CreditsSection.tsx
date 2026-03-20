import { useState } from 'react';
import {
    useCreditsByWorkQuery,
    usePeopleQuery,
    useCreateCreditMutation,
    useDeleteCreditMutation,
} from '../../graphql/generated/types';
import ROLES_QUERY from '../../../graphql/roles.query';
import { useQuery } from '@apollo/client';
import type { CreditsSectionProps } from './CreditsSectionProps';
import styles from './CreditsSection.module.css';

export const CreditsSection = ({ workGuid }: CreditsSectionProps) => {
    const { data, loading, error, refetch } = useCreditsByWorkQuery({
        variables: { workGuid },
    });
    const { data: peopleData } = usePeopleQuery();
    const { data: rolesData } = useQuery(ROLES_QUERY);

    const [createCredit, { loading: creating }] = useCreateCreditMutation();
    const [deleteCredit] = useDeleteCreditMutation();

    const [showForm, setShowForm] = useState(false);
    const [personGuid, setPersonGuid] = useState('');
    const [roleGuid, setRoleGuid] = useState('');
    const [instrument, setInstrument] = useState('');
    const [notes, setNotes] = useState('');
    const [formError, setFormError] = useState<string | null>(null);

    const resetForm = () => {
        setPersonGuid('');
        setRoleGuid('');
        setInstrument('');
        setNotes('');
        setFormError(null);
        setShowForm(false);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        if (!personGuid || !roleGuid) {
            setFormError('Person and Role are required.');
            return;
        }
        try {
            await createCredit({
                variables: {
                    workGuid,
                    personGuid,
                    roleGuid,
                    instrument: instrument.trim() || undefined,
                    notes: notes.trim() || undefined,
                },
            });
            await refetch();
            resetForm();
        } catch (err) {
            setFormError(
                err instanceof Error ? err.message : 'Failed to add credit.',
            );
        }
    };

    const handleDelete = async (guid: string) => {
        if (!confirm('Remove this credit?')) return;
        try {
            await deleteCredit({ variables: { guid } });
            await refetch();
        } catch {
            // error visible in UI via refetch state
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Credits</h2>
                {!showForm && (
                    <button
                        className={styles.addButton}
                        onClick={() => setShowForm(true)}
                    >
                        Add Credit
                    </button>
                )}
            </div>

            {loading && <p className={styles.status}>Loading credits…</p>}
            {error && (
                <p className={styles.error}>
                    Error loading credits: {error.message}
                </p>
            )}

            {showForm && (
                <form
                    onSubmit={handleAdd}
                    className={styles.form}
                    data-testid="credit-form"
                >
                    {formError && (
                        <div className={styles.formError}>{formError}</div>
                    )}
                    <div className={styles.formRow}>
                        <div className={styles.formField}>
                            <label className={styles.formLabel}>
                                Person <span className={styles.required}>*</span>
                            </label>
                            <select
                                className={styles.select}
                                value={personGuid}
                                onChange={(e) => setPersonGuid(e.target.value)}
                                required
                            >
                                <option value="">Select person…</option>
                                {peopleData?.people.map((p) => (
                                    <option key={p.guid} value={p.guid}>
                                        {p.firstName} {p.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.formField}>
                            <label className={styles.formLabel}>
                                Role <span className={styles.required}>*</span>
                            </label>
                            <select
                                className={styles.select}
                                value={roleGuid}
                                onChange={(e) => setRoleGuid(e.target.value)}
                                required
                            >
                                <option value="">Select role…</option>
                                {rolesData?.roles.map((r) => (
                                    <option key={r.guid} value={r.guid}>
                                        {r.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formField}>
                            <label className={styles.formLabel}>
                                Instrument
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                value={instrument}
                                onChange={(e) => setInstrument(e.target.value)}
                                placeholder="e.g. electric guitar"
                            />
                        </div>
                        <div className={styles.formField}>
                            <label className={styles.formLabel}>Notes</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Optional notes"
                            />
                        </div>
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
                            {creating ? 'Adding…' : 'Add Credit'}
                        </button>
                    </div>
                </form>
            )}

            {data && data.creditsByWork.length === 0 && !showForm && (
                <p className={styles.empty}>No credits yet.</p>
            )}

            {data && data.creditsByWork.length > 0 && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Person</th>
                            <th className={styles.th}>Role</th>
                            <th className={styles.th}>Instrument</th>
                            <th className={styles.th}>Notes</th>
                            <th className={styles.th}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.creditsByWork.map((credit) => (
                            <tr key={credit.guid} className={styles.tr}>
                                <td className={styles.td}>
                                    {credit.person.firstName}{' '}
                                    {credit.person.lastName}
                                </td>
                                <td className={styles.td}>
                                    {credit.role.name}
                                </td>
                                <td className={styles.td}>
                                    {credit.instrument ?? '—'}
                                </td>
                                <td className={styles.td}>
                                    {credit.notes ?? '—'}
                                </td>
                                <td className={styles.td}>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() =>
                                            handleDelete(credit.guid)
                                        }
                                        aria-label="Remove credit"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};
