import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import NavBar from '@components/navBar';
import Header from '@components/header';
import WelcomeSection from '@components/welcomeSection';
import AddAccountPopup from '@components/addAccount';
import DepositPopup from '@components/deposit';
import SendMoneyPopup from '@components/sendMoney';
import WithdrawPopup from '@components/withdraw';
import { usePrivy } from '@privy-io/react-auth';
import styles from '@styles/pages/Home.module.scss';

const Home: React.FC = () => {
    const [activePopup, setActivePopup] = useState<'addAccount' | 'deposit' | 'withdraw' | 'sendMoney' | null>(null);
    const [childAccounts, setChildAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://localhost:3001";


    const { user, authenticated } = usePrivy();

    const openPopup = (popup: 'addAccount' | 'deposit' | 'withdraw' | 'sendMoney') => {
        setActivePopup(popup);
    };

    const closePopup = () => {
        setActivePopup(null);
    };

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            closePopup();
        }
    };

    const fetchChildAccounts = async () => {
        if (!user?.id) {
            console.error('Error: User is not authenticated');
            setLoading(false);
            return;
        }

        try {
            const walletAddress = user.id;
            const endpoint = `${BACKEND_URL}/api/user/${encodeURIComponent(walletAddress)}/children`;

            const response = await fetch(endpoint, {
                method: "GET",
                mode: "cors",
                credentials: "include", // Asegura autenticación en HTTPS
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch child accounts: ${response.status}`);
            }

            const data = await response.json();

            setChildAccounts(data.children || []);
        } catch (error) {
            console.error('Error fetching child accounts:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (!isClient || !authenticated || !user?.id) {
            return;
        }

        const initializeData = async () => {
            try {
                await fetchChildAccounts();
            } catch (error) {
                console.error("Error en initializeData:", error);
            }
        };

        initializeData();
    }, [authenticated, user?.id, isClient]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const handleRefresh = () => {
            fetchChildAccounts();
        };

        window.addEventListener("refreshChildAccounts", handleRefresh);

        return () => {
            window.removeEventListener("refreshChildAccounts", handleRefresh);
        };
    }, []);


    const handleAddAccountSuccess = () => {
        closePopup();
        fetchChildAccounts();
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className={styles.home}>
            <div className={`${styles.content} ${activePopup ? styles.blurred : ''}`}>
                <Header
                    toggleAddAccountPopup={() => openPopup('addAccount')}
                    toggleDepositPopup={() => openPopup('deposit')}
                    toggleWithdrawPopup={() => openPopup('withdraw')}
                    toggleSendMoneyPopup={() => openPopup('sendMoney')}
                />
                {loading ? (
                    <p className={styles.loadingMessage}>Loading...</p>
                ) : childAccounts.length > 0 ? (
                    <div className={styles.accountsSection}>
                        <h2 className={styles.sectionTitle}>Your Accounts</h2>
                        <div className={styles.accountsList}>
                            {childAccounts.map((account, index) => (
                                <div key={index} className={styles.accountCard}
                                     style={{marginRight: index === childAccounts.length - 1 ? "0px" : "12px"}}>
                                    <div className={styles.accountHeader}>
                                        <div className={styles.avatar}>
                                            <img src="/images/default-avatar.jpg" alt={account.name}/>
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
                    <WelcomeSection togglePopup={() => openPopup('addAccount')}/>
                )}
                <NavBar/>
            </div>

            {activePopup && (
                <div className={styles.popupOverlay} onClick={handleClickOutside}>
                    {activePopup === 'addAccount' && <AddAccountPopup onClose={closePopup} />}
                    {activePopup === 'deposit' && <DepositPopup onClose={closePopup} />}
                    {activePopup === 'withdraw' && <WithdrawPopup onClose={closePopup} />}
                    {activePopup === 'sendMoney' && (
                        <SendMoneyPopup
                            onClose={closePopup}
                            childAccounts={childAccounts}
                            availableBalance={5000}  // O el balance real del usuario
                            onSendMoney={(recipient, amount) => {
                                console.log(`Sent $${amount} to ${recipient}`);
                                closePopup();
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
