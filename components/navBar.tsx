import React from 'react';
import styles from '@styles/components/NavBar.module.scss';

const NavBar: React.FC = () => {
    const activeItem = 'Home'; // Simula el estado actual activo

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarItems}>
                <div className={styles.navbarItem}>
                    <img src="/icons/home-icon.svg" alt="Home" className={styles.navbarIcon} />
                    <span className={styles.navbarLabel}>Home</span>
                </div>
                <div className={styles.navbarItem}>
                    <img src="/icons/savings-icon.svg" alt="Savings" className={styles.navbarIcon} />
                    <span className={styles.navbarLabel}>Savings</span>
                </div>
                <div className={styles.navbarItem}>
                    <img src="/icons/investments-icon.svg" alt="Investments" className={styles.navbarIcon} />
                    <span className={styles.navbarLabel}>Investments</span>
                </div>
                <div className={styles.navbarItem}>
                    <img src="/icons/tasks-icon.svg" alt="Tasks" className={styles.navbarIcon} />
                    <span className={styles.navbarLabel}>Tasks</span>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
