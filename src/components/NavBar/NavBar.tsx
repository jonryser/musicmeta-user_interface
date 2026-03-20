import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import type { NavBarProps } from './NavBarProps';
import styles from './NavBar.module.css';

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
                MusicMeta
            </Link>

            <ul className={styles.links}>
                <li><Link href="/works">Works</Link></li>
                <li><Link href="/people">People</Link></li>
                <li><Link href="/places">Places</Link></li>
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
                    Sign out
                </button>
            </div>

            <button
                className={styles.hamburger}
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
            >
                <span />
                <span />
                <span />
            </button>

            <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
                <Link href="/works" onClick={() => setMenuOpen(false)}>Works</Link>
                <Link href="/people" onClick={() => setMenuOpen(false)}>People</Link>
                <Link href="/places" onClick={() => setMenuOpen(false)}>Places</Link>
                <button onClick={handleSignOut}>Sign out</button>
            </div>
        </nav>
    );
};
