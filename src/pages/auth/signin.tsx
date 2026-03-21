import { signIn } from 'next-auth/react';
import type { NextPage } from 'next';
import styles from './signin.module.css';
import { SIGN_IN } from '../../constants/labels';

const SignInPage: NextPage = () => {
    const handleSignIn = () => {
        signIn('google', { callbackUrl: '/works' });
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>{SIGN_IN.TITLE}</h1>
                <p className={styles.subtitle}>{SIGN_IN.SUBTITLE}</p>
                <button className={styles.button} onClick={handleSignIn}>
                    {SIGN_IN.GOOGLE_BUTTON}
                </button>
            </div>
        </div>
    );
};

export default SignInPage;
