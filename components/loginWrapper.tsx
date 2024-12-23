import React from 'react';
import styles from '@styles/components/LoginWrapper.module.scss';
import bgLogin from '@public/images/bg-login.png';
import piggy from '@public/images/piggy.png';
import Image from 'next/image';

interface LoginWrapperProps {
    children: React.ReactNode;
}

const LoginWrapper: React.FC<LoginWrapperProps> = ({ children }) => {
    return (
        <div className={styles.onboardingContainer}>
            <div
                className={styles.backgroundContainer}
                style={{ backgroundImage: `url(${bgLogin.src})` }}
            >
                <div className={styles.waveBackground}></div>
            </div>

            <header className={styles.header}>
                <div className={styles.piggyContainer}>
                    <Image
                        src={piggy}
                        alt="Piggy Bank"
                        className={styles.piggyImage}
                        priority
                    />
                </div>
            </header>

            <main className={styles.content}>{children}</main>
        </div>
    );
};

export default LoginWrapper;
