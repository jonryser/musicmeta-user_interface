import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NavBar } from '../NavBar';
import type { ProtectedLayoutProps } from './ProtectedLayoutProps';
import styles from './ProtectedLayout.module.css';

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (status === 'unauthenticated') {
        return null;
    }

    return (
        <div className={styles.layout}>
            <NavBar />
            <main className={styles.main}>{children}</main>
        </div>
    );
};
