import React from 'react';
import styles from '@styles/components/WelcomeSection.module.scss';

interface WelcomeSectionProps {
    togglePopup: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ togglePopup }) => {
    return (
        <div className={styles.welcomeSection}>
            <div className={styles.welcomeImage}>
                <img
                    src="/images/piggy-main.svg"
                    alt="Piggy Bank"
                    width="90"
                    height="125"
                />
            </div>
            <div className={styles.welcomeContent}>
                <h1 className={styles.welcomeTitle}>Welcome to Piggy Wallet!</h1>
                <p className={styles.welcomeDescription}>
                    Let's start building your family's financial future. Create your first account to begin saving, investing, and managing allowances for your loved ones.
                </p>
            </div>
            <div className={styles.welcomeAction}>
                <button
                    className={styles.createAccountButton}
                    onClick={togglePopup}
                >
                    Create My First Account
                </button>
            </div>
        </div>
    );
};

export default WelcomeSection;
