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
        <div className={styles.homeContainer}>
            <div className={styles.backgroundContainer}>
                <Image
                    src={bgLogin}
                    alt="Background"
                    fill
                    style={{objectFit: 'cover'}}
                    quality={90}
                />
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
