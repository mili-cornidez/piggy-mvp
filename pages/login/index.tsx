import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LoginWrapper from '@components/loginWrapper';
import styles from '@styles/pages/Login.module.scss';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    const { login, user, authenticated } = usePrivy();
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await login();
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error: Unable to complete the login process. Please try again.');
        }
    };

    useEffect(() => {
        const checkUserStatus = async () => {
            if (authenticated && user?.email?.address && user?.wallet?.address) {
                try {
                    const userData = {
                        email: user.email.address,
                        wallet_address: user.wallet.address
                    };
                    console.log('Sending user data:', userData);

                    const response = await axios.post('/api/login/check-user', userData);
                    console.log('Response from server:', response.data);

                    if (response.data.exists) {
                        await router.push('/home');
                    } else {
                        await router.push('/login/signupSuccess');
                    }
                } catch (error) {
                    console.error('Error checking user status:', error);
                }
            }
        };

        checkUserStatus();
    }, [authenticated, user, router]);

    return (
        <LoginWrapper>
            <div className={styles.headingContainer}>
                <h1 className={styles.title}>{t('login.welcomeTitle')}</h1>
                <h5 className={styles.subtitle}>{t('login.welcomeSubtitle')}</h5>
            </div>

            <div className={styles.buttonGroup}>
                <button className={styles.signInButton} onClick={handleLogin}>
                    {t('login.signInButton')}
                </button>
            </div>
        </LoginWrapper>
    );
};

export default LoginPage;