import React from 'react';
import { useTranslation } from 'react-i18next';
import LoginWrapper from '@components/loginWrapper';
import styles from '@styles/pages/LoginSuccess.module.scss';

const LoginSuccess: React.FC = () => {
    const { t } = useTranslation();

    return (
        <LoginWrapper>
            <div className={styles.headingContainer}>
                <h1 className={styles.title}>{t('loginSuccess.title')}</h1>
                <p className={styles.subtitle}>
                    {t('loginSuccess.subtitle')}
                </p>
            </div>

            <button className={styles.finishButton}>{t('loginSuccess.finishButton')}</button>
        </LoginWrapper>
    );
};

export default LoginSuccess;
