import type { NextPage } from 'next';
import { ProtectedLayout } from '../../components/ProtectedLayout';

const PeoplePage: NextPage = () => {
    return (
        <ProtectedLayout>
            <h1>People</h1>
            <p>The people directory will appear here.</p>
        </ProtectedLayout>
    );
};

export default PeoplePage;
