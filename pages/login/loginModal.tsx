import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import styles from '@styles/pages/LoginModal.module.scss';
import piggy from '@public/images/piggy.png';
import google from '@public/images/google-g.png';
import Image from 'next/image';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const router = useRouter();

    if (!isOpen) return null;

    const handleRedirect = () => {
        onClose();
        router.push('/login/loginSuccess');
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.logoSection}>
                    <Image src={piggy} alt="Piggy Wallet" className={styles.logo} />
                    <h2>{t('loginModal.title')}</h2>
                </div>

                <form className={styles.loginForm}>
                    <div className={styles.inputGroup}>
                        <span className={styles.emailIcon}>✉️</span>
                        <input
                            type="email"
                            placeholder={t('loginModal.emailPlaceholder')}
                            className={styles.emailInput}
                        />
                        <button
                            type="button"
                            className={styles.submitButton}
                            onClick={handleRedirect}
                        >
                            {t('loginModal.submitButton')}
                        </button>
                    </div>

                    <button
                        type="button"
                        className={styles.googleButton}
                        onClick={handleRedirect}
                    >
                        <Image src={google} alt="Google" width={24} height={24} />
                        {t('loginModal.googleButton')}
                    </button>

                    <button
                        type="button"
                        className={styles.walletButton}
                        onClick={handleRedirect}
                    >
                        {t('loginModal.walletButton')}
                        <span className={styles.arrowIcon}>{t('loginModal.arrowIcon')}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
