import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NavBar } from './NavBar';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    signOut: jest.fn(),
}));

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('next/link', () => {
    const MockLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
        <a href={href} {...props}>{children}</a>
    );
    MockLink.displayName = 'MockLink';
    return MockLink;
});

const mockUseSession = useSession as jest.Mock;
const mockSignOut = signOut as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

describe('NavBar', () => {
    beforeEach(() => {
        mockUseSession.mockReturnValue({
            data: { user: { name: 'Jon Ryser', image: null } },
            status: 'authenticated',
        });
        mockUseRouter.mockReturnValue({ push: jest.fn() });
        mockSignOut.mockReset();
    });

    it('renders the MusicMeta logo link', () => {
        render(<NavBar />);
        expect(screen.getByText('MusicMeta')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<NavBar />);
        expect(screen.getAllByText('Works').length).toBeGreaterThan(0);
        expect(screen.getAllByText('People').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Places').length).toBeGreaterThan(0);
    });

    it('displays user initial when no image provided', () => {
        render(<NavBar />);
        expect(screen.getByTitle('Jon Ryser')).toBeInTheDocument();
        expect(screen.getByTitle('Jon Ryser').textContent).toBe('J');
    });

    it('renders sign out button', () => {
        render(<NavBar />);
        expect(screen.getAllByText('Sign out').length).toBeGreaterThan(0);
    });

    it('calls signOut when sign out button is clicked', () => {
        render(<NavBar />);
        const signOutButtons = screen.getAllByText('Sign out');
        fireEvent.click(signOutButtons[0]);
        expect(mockSignOut).toHaveBeenCalledWith({ callbackUrl: '/auth/signin' });
    });

    it('toggles mobile menu on hamburger click', () => {
        render(<NavBar />);
        const hamburger = screen.getByLabelText('Toggle menu');
        fireEvent.click(hamburger);
        expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    });

    it('uses provided userName over session data', () => {
        render(<NavBar userName="Test User" />);
        expect(screen.getByTitle('Test User')).toBeInTheDocument();
    });
});
