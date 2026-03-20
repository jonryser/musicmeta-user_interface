import { signIn } from 'next-auth/react';
import type { NextPage } from 'next';
import styles from './signin.module.css';

const SignInPage: NextPage = () => {
    const handleSignIn = () => {
        signIn('google', { callbackUrl: '/works' });
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>MusicMeta</h1>
                <p className={styles.subtitle}>Sign in to manage your musical works</p>
                <button className={styles.button} onClick={handleSignIn}>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default SignInPage;
