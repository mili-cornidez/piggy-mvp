import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginWrapper from '@components/loginWrapper';
import styles from '@styles/pages/Login.module.scss';
import LoginModal from './loginModal';

const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <LoginWrapper>
            <div className={styles.headingContainer}>
                <h1 className={styles.title}>{t('login.welcomeTitle')}</h1>
                <h5 className={styles.subtitle}>{t('login.welcomeSubtitle')}</h5>
            </div>

            <div className={styles.buttonGroup}>
                <button className={styles.signInButton} onClick={openModal}>
                    {t('login.signInButton')}
                </button>
            </div>

            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        </LoginWrapper>
    );
};

export default LoginPage;
