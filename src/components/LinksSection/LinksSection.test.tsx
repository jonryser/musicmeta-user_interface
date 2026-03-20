import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LinksSection } from './LinksSection';
import { LinkType } from '../../graphql/generated/types';

jest.mock('../../graphql/generated/types', () => {
    const LinkType = {
        Audio: 'audio',
        Image: 'image',
        Document: 'document',
        Video: 'video',
        Streaming: 'streaming',
        Purchase: 'purchase',
        Other: 'other',
    };
    return {
        LinkType,
        useLinksByWorkQuery: jest.fn(),
        useCreateLinkMutation: jest.fn(),
        useDeleteLinkMutation: jest.fn(),
    };
});

import {
    useLinksByWorkQuery,
    useCreateLinkMutation,
    useDeleteLinkMutation,
} from '../../graphql/generated/types';

const links = [
    {
        guid: 'l1',
        url: 'https://example.com/audio.mp3',
        linkType: LinkType.Audio,
        description: 'Demo track',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
];

beforeEach(() => {
    (useLinksByWorkQuery as jest.Mock).mockReturnValue({
        data: { linksByWork: [] },
        loading: false,
        error: undefined,
        refetch: jest.fn(),
    });
    (useCreateLinkMutation as jest.Mock).mockReturnValue([
        jest.fn().mockResolvedValue({}),
        { loading: false },
    ]);
    (useDeleteLinkMutation as jest.Mock).mockReturnValue([
        jest.fn().mockResolvedValue({}),
        { loading: false },
    ]);
});

describe('LinksSection', () => {
    it('renders Links section heading', () => {
        render(<LinksSection workGuid="work-1" />);
        expect(screen.getByText('Links')).toBeInTheDocument();
    });

    it('renders empty state when no links', () => {
        render(<LinksSection workGuid="work-1" />);
        expect(screen.getByText('No links yet.')).toBeInTheDocument();
    });

    it('renders link items', () => {
        (useLinksByWorkQuery as jest.Mock).mockReturnValue({
            data: { linksByWork: links },
            loading: false,
            error: undefined,
            refetch: jest.fn(),
        });
        render(<LinksSection workGuid="work-1" />);
        expect(
            screen.getByText('https://example.com/audio.mp3'),
        ).toBeInTheDocument();
        expect(screen.getByText('Demo track')).toBeInTheDocument();
        expect(screen.getByText('audio')).toBeInTheDocument();
    });

    it('shows Add Link form when button clicked', () => {
        render(<LinksSection workGuid="work-1" />);
        fireEvent.click(screen.getByText('Add Link'));
        expect(screen.getByTestId('link-form')).toBeInTheDocument();
    });

    it('hides form when Cancel is clicked', () => {
        render(<LinksSection workGuid="work-1" />);
        fireEvent.click(screen.getByText('Add Link'));
        expect(screen.getByTestId('link-form')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByTestId('link-form')).not.toBeInTheDocument();
    });

    it('renders link as anchor with correct href', () => {
        (useLinksByWorkQuery as jest.Mock).mockReturnValue({
            data: { linksByWork: links },
            loading: false,
            error: undefined,
            refetch: jest.fn(),
        });
        render(<LinksSection workGuid="work-1" />);
        const anchor = screen.getByRole('link');
        expect(anchor).toHaveAttribute('href', 'https://example.com/audio.mp3');
    });
});
