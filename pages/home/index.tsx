import React, { useState, useEffect } from 'react';
import NavBar from '@components/navBar';
import Header from '@components/header';
import WelcomeSection from '@components/welcomeSection';
import AddAccountComponent from '@components/addAccount';
import { usePrivy } from '@privy-io/react-auth';
import styles from '@styles/pages/Home.module.scss';

const Home: React.FC = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [childAccounts, setChildAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const { user, authenticated } = usePrivy();

    const togglePopup = (forceState?: boolean) => {
        setIsPopupVisible(forceState ?? !isPopupVisible);
    };

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLDivElement).classList.contains(styles.popupOverlay)) {
            setIsPopupVisible(false);
        }
    };

    const fetchChildAccounts = async () => {
        if (!user?.id) {
            console.error('User is not authenticated');
            setLoading(false);
            return;
        }

        try {
            const walletAddress = user.id;
            const response = await fetch(`/api/user/${encodeURIComponent(walletAddress)}/children`);

            if (!response.ok) {
                throw new Error('Failed to fetch child accounts');
            }

            const data = await response.json();
            setChildAccounts(data);
        } catch (error) {
            console.error('Error fetching child accounts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authenticated) {
            fetchChildAccounts();
        }
    }, [authenticated, user]);

    const handleAddAccountSuccess = () => {
        togglePopup(false);
        fetchChildAccounts();
    };

    return (
        <div className={styles.home}>
            <div className={`${styles.content} ${isPopupVisible ? styles.blurred : ''}`}>
                <Header togglePopup={() => togglePopup(true)} />
                {loading ? (
                    <p className={styles.loadingMessage}>Loading...</p>
                ) : childAccounts.length > 0 ? (
                    <div className={styles.accountsSection}>
                        <h2 className={styles.sectionTitle}>Your Accounts</h2>
                        <div className={styles.accountsList}>
                            {childAccounts.map((account, index) => (
                                <div key={index} className={styles.accountCard}>
                                    <div className={styles.accountHeader}>
                                        <div className={styles.avatar}>
                                            <img src="/images/default-avatar.jpg" alt={account.name} />
                                        </div>
                                        <div className={styles.accountInfo}>
                                            <span className={styles.accountName}>
                                                {`${account.name}'${account.name.endsWith('s') ? '' : 's'} Account`}
                                            </span>
                                            <span className={styles.accountBalance}>
                                                ${account.wallet_balance.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <WelcomeSection togglePopup={() => togglePopup(true)} />
                )}
                <NavBar />
            </div>

            {isPopupVisible && (
                <div
                    className={styles.popupOverlay}
                    onClick={handleClickOutside}
                >
                    <AddAccountComponent onSuccess={handleAddAccountSuccess} />
                </div>
            )}
        </div>
    );
};

export default Home;
