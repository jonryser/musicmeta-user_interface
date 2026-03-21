import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import type { NavBarProps } from './NavBarProps';
import styles from './NavBar.module.css';
import { NAV } from '../../constants/navigation';
import { ARIA } from '../../constants/aria';

export const NavBar = ({ userName, userImage }: NavBarProps) => {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    const displayName = userName ?? session?.user?.name ?? '';
    const displayImage = userImage ?? session?.user?.image ?? null;
    const initial = displayName.charAt(0).toUpperCase();

    const handleSignOut = () => {
        signOut({ callbackUrl: '/auth/signin' });
    };

    return (
        <nav className={styles.nav}>
            <Link href="/works" className={styles.logo}>
                {NAV.LOGO}
            </Link>

            <ul className={styles.links}>
                <li><Link href="/works">{NAV.WORKS}</Link></li>
                <li><Link href="/people">{NAV.PEOPLE}</Link></li>
                <li><Link href="/places">{NAV.PLACES}</Link></li>
            </ul>

            <div className={styles.user}>
                <div className={styles.avatar} title={displayName}>
                    {displayImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={displayImage} alt={displayName} />
                    ) : (
                        initial || '?'
                    )}
                </div>
                <button className={styles.signOut} onClick={handleSignOut}>
                    {NAV.SIGN_OUT}
                </button>
            </div>

            <button
                className={styles.hamburger}
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label={ARIA.TOGGLE_MENU}
                aria-expanded={menuOpen}
            >
                <span />
                <span />
                <span />
            </button>

            <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
                <Link href="/works" onClick={() => setMenuOpen(false)}>{NAV.WORKS}</Link>
                <Link href="/people" onClick={() => setMenuOpen(false)}>{NAV.PEOPLE}</Link>
                <Link href="/places" onClick={() => setMenuOpen(false)}>{NAV.PLACES}</Link>
                <button onClick={handleSignOut}>{NAV.SIGN_OUT}</button>
            </div>
        </nav>
    );
};
