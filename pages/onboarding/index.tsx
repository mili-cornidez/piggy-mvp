import React, { useState, useEffect, useRef } from 'react';
import NavBar from '@components/navBar';
import Header from '@components/header';
import WelcomeSection from '@components/welcomeSection';
import AddAccountComponent from '@components/addAccount';
import styles from '@styles/pages/Onboarding.module.scss';

const Onboarding: React.FC = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLDivElement).classList.contains(styles.popupOverlay)) {
            setIsPopupVisible(false);
        }
    };

    return (
        <div className={styles.onboarding}>
            {/* Content that gets blurred */}
            <div className={`${styles.content} ${isPopupVisible ? styles.blurred : ''}`}>
                <Header />
                <WelcomeSection togglePopup={togglePopup} />
                <NavBar />
            </div>

            {/* Popup Overlay */}
            {isPopupVisible && (
                <div
                    className={styles.popupOverlay}
                    onClick={handleClickOutside} // Close popup on overlay click
                >
                    <AddAccountComponent />
                </div>
            )}
        </div>
    );
};

export default Onboarding;
