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
import { CREDITS, COMMON } from '../../constants/labels';
import { STATUS, ERRORS, EMPTY, CONFIRM, LOADING_STATES } from '../../constants/messages';
import { ARIA } from '../../constants/aria';

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
            setFormError(ERRORS.PERSON_ROLE_REQUIRED);
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
                err instanceof Error ? err.message : ERRORS.FAILED_ADD_CREDIT,
            );
        }
    };

    const handleDelete = async (guid: string) => {
        if (!confirm(CONFIRM.REMOVE_CREDIT)) return;
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
                <h2 className={styles.sectionTitle}>{CREDITS.SECTION_TITLE}</h2>
                {!showForm && (
                    <button
                        className={styles.addButton}
                        onClick={() => setShowForm(true)}
                    >
                        {CREDITS.ADD_BUTTON}
                    </button>
                )}
            </div>

            {loading && <p className={styles.status}>{STATUS.LOADING_CREDITS}</p>}
            {error && (
                <p className={styles.error}>
                    {ERRORS.LOADING_CREDITS(error.message)}
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
                                {CREDITS.FIELD_PERSON} <span className={styles.required}>*</span>
                            </label>
                            <select
                                className={styles.select}
                                value={personGuid}
                                onChange={(e) => setPersonGuid(e.target.value)}
                                required
                            >
                                <option value="">{CREDITS.SELECT_PERSON_PLACEHOLDER}</option>
                                {peopleData?.people.map((p) => (
                                    <option key={p.guid} value={p.guid}>
                                        {p.firstName} {p.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.formField}>
                            <label className={styles.formLabel}>
                                {CREDITS.FIELD_ROLE} <span className={styles.required}>*</span>
                            </label>
                            <select
                                className={styles.select}
                                value={roleGuid}
                                onChange={(e) => setRoleGuid(e.target.value)}
                                required
                            >
                                <option value="">{CREDITS.SELECT_ROLE_PLACEHOLDER}</option>
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
                                {CREDITS.FIELD_INSTRUMENT}
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                value={instrument}
                                onChange={(e) => setInstrument(e.target.value)}
                                placeholder={CREDITS.PLACEHOLDER_INSTRUMENT}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label className={styles.formLabel}>{CREDITS.FIELD_NOTES}</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder={CREDITS.PLACEHOLDER_NOTES}
                            />
                        </div>
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
                            {creating ? LOADING_STATES.ADDING : CREDITS.ADD_BUTTON}
                        </button>
                    </div>
                </form>
            )}

            {data && data.creditsByWork.length === 0 && !showForm && (
                <p className={styles.empty}>{EMPTY.CREDITS}</p>
            )}

            {data && data.creditsByWork.length > 0 && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>{CREDITS.TABLE_PERSON}</th>
                            <th className={styles.th}>{CREDITS.TABLE_ROLE}</th>
                            <th className={styles.th}>{CREDITS.TABLE_INSTRUMENT}</th>
                            <th className={styles.th}>{CREDITS.TABLE_NOTES}</th>
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
                                    {credit.instrument ?? '\u2014'}
                                </td>
                                <td className={styles.td}>
                                    {credit.notes ?? '\u2014'}
                                </td>
                                <td className={styles.td}>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() =>
                                            handleDelete(credit.guid)
                                        }
                                        aria-label={ARIA.REMOVE_CREDIT}
                                    >
                                        {CREDITS.REMOVE_BUTTON}
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
