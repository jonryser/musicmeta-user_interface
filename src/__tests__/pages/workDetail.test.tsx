import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import WorkDetailPage from '../../pages/works/[id]';
import { STATUS, ERRORS } from '../../constants/messages';
import { WORKS } from '../../constants/labels';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    signOut: jest.fn(),
}));

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('next/link', () => {
    const MockLink = ({
        href,
        children,
        ...props
    }: {
        href: string;
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <a href={href} {...props}>
            {children}
        </a>
    );
    MockLink.displayName = 'MockLink';
    return MockLink;
});

jest.mock('../../graphql/generated/types', () => ({
    useWorkQuery: jest.fn(),
    useUpdateWorkMutation: jest.fn(),
    useDeleteWorkMutation: jest.fn(),
}));

jest.mock('../../components/CreditsSection', () => ({
    CreditsSection: () => <div data-testid="credits-section" />,
}));

jest.mock('../../components/LinksSection', () => ({
    LinksSection: () => <div data-testid="links-section" />,
}));

import {
    useWorkQuery,
    useUpdateWorkMutation,
    useDeleteWorkMutation,
} from '../../graphql/generated/types';

const mockPush = jest.fn();
const mockRefetch = jest.fn().mockResolvedValue({});

const mockWork = {
    guid: 'work-guid-123',
    title: 'My Test Song',
    description: 'A song about testing',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    versions: [],
};

beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({
        status: 'authenticated',
        data: { user: { name: 'Test User' } },
    });
    (useRouter as jest.Mock).mockReturnValue({
        query: { id: mockWork.guid },
        push: mockPush,
    });
    (useWorkQuery as jest.Mock).mockReturnValue({
        data: { work: mockWork },
        loading: false,
        error: undefined,
        refetch: mockRefetch,
    });
    (useUpdateWorkMutation as jest.Mock).mockReturnValue([
        jest.fn().mockResolvedValue({}),
        { loading: false },
    ]);
    (useDeleteWorkMutation as jest.Mock).mockReturnValue([
        jest.fn().mockResolvedValue({}),
        { loading: false },
    ]);
});

describe('WorkDetailPage', () => {
    it('renders loading state', () => {
        (useWorkQuery as jest.Mock).mockReturnValue({
            data: undefined,
            loading: true,
            error: undefined,
            refetch: mockRefetch,
        });

        render(<WorkDetailPage />);
        expect(screen.getByText(STATUS.LOADING_ELLIPSIS)).toBeInTheDocument();
    });

    it('renders error state', () => {
        const errorMessage = 'Network error';
        (useWorkQuery as jest.Mock).mockReturnValue({
            data: undefined,
            loading: false,
            error: { message: errorMessage },
            refetch: mockRefetch,
        });

        render(<WorkDetailPage />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('renders work not found when work is absent', () => {
        (useWorkQuery as jest.Mock).mockReturnValue({
            data: { work: null },
            loading: false,
            error: undefined,
            refetch: mockRefetch,
        });

        render(<WorkDetailPage />);
        expect(screen.getByText(ERRORS.WORK_NOT_FOUND)).toBeInTheDocument();
    });

    it('renders work title and description', () => {
        render(<WorkDetailPage />);
        expect(screen.getByRole('heading', { name: mockWork.title })).toBeInTheDocument();
        expect(screen.getByText(mockWork.description)).toBeInTheDocument();
    });

    it('clicking title shows input field', () => {
        render(<WorkDetailPage />);
        fireEvent.click(screen.getByRole('heading', { name: mockWork.title }));
        expect(screen.getByDisplayValue(mockWork.title)).toBeInTheDocument();
    });

    it('saving title edit calls updateWork mutation', async () => {
        const mockUpdateWork = jest.fn().mockResolvedValue({});
        (useUpdateWorkMutation as jest.Mock).mockReturnValue([
            mockUpdateWork,
            { loading: false },
        ]);

        render(<WorkDetailPage />);
        fireEvent.click(screen.getByRole('heading', { name: mockWork.title }));
        const input = screen.getByDisplayValue(mockWork.title);
        fireEvent.change(input, { target: { value: 'Updated Title' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        await waitFor(() => {
            expect(mockUpdateWork).toHaveBeenCalledWith({
                variables: { guid: mockWork.guid, title: 'Updated Title' },
            });
        });
    });

    it('cancelling title edit restores original value', () => {
        render(<WorkDetailPage />);
        fireEvent.click(screen.getByRole('heading', { name: mockWork.title }));
        const input = screen.getByDisplayValue(mockWork.title);
        fireEvent.change(input, { target: { value: 'Changed Title' } });
        fireEvent.keyDown(input, { key: 'Escape' });

        expect(screen.queryByDisplayValue('Changed Title')).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { name: mockWork.title })).toBeInTheDocument();
    });

    it('delete work calls deleteWork mutation and redirects', async () => {
        const mockDeleteWork = jest.fn().mockResolvedValue({});
        (useDeleteWorkMutation as jest.Mock).mockReturnValue([
            mockDeleteWork,
            { loading: false },
        ]);
        window.confirm = jest.fn().mockReturnValue(true);

        render(<WorkDetailPage />);
        fireEvent.click(screen.getByRole('button', { name: WORKS.DELETE_BUTTON }));

        await waitFor(() => {
            expect(mockDeleteWork).toHaveBeenCalledWith({
                variables: { guid: mockWork.guid },
            });
            expect(mockPush).toHaveBeenCalledWith('/works');
        });
    });
});
