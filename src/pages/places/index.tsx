import type { NextPage } from 'next';
import { ProtectedLayout } from '../../components/ProtectedLayout';

const PlacesPage: NextPage = () => {
    return (
        <ProtectedLayout>
            <h1>Places</h1>
            <p>The places directory will appear here.</p>
        </ProtectedLayout>
    );
};

export default PlacesPage;
