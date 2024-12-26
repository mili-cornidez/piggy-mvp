import React from 'react';
import NavBar from '@components/navBar';
import Header from '@components/header';
import WelcomeSection from '@components/welcomeSection';
import styles from '@styles/pages/Onboarding.module.scss';

const Onboarding: React.FC = () => {
    return (
        <div className={styles.onboarding}>
            <Header />
            <WelcomeSection />
            <NavBar />
        </div>
    );
};

export default Onboarding;
