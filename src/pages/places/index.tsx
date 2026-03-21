import type { NextPage } from 'next';
import { ProtectedLayout } from '../../components/ProtectedLayout';
import { PLACES } from '../../constants/labels';

const PlacesPage: NextPage = () => {
    return (
        <ProtectedLayout>
            <h1>{PLACES.PAGE_TITLE}</h1>
            <p>{PLACES.COMING_SOON_TEXT}</p>
        </ProtectedLayout>
    );
};

export default PlacesPage;
