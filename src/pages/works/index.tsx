import type { NextPage } from 'next';
import { ProtectedLayout } from '../../components/ProtectedLayout';

const WorksPage: NextPage = () => {
    return (
        <ProtectedLayout>
            <h1>Works</h1>
            <p>Your musical works will appear here.</p>
        </ProtectedLayout>
    );
};

export default WorksPage;
