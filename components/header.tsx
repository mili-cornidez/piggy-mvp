import React, { useState, useEffect } from 'react';
import styles from '@styles/components/Header.module.scss';
import axios from 'axios';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';

axios.defaults.httpsAgent = new (require('https').Agent)({
    rejectUnauthorized: false
});

interface HeaderProps {
    toggleAddAccountPopup: () => void;
    toggleDepositPopup: () => void;
    toggleWithdrawPopup: () => void;
    toggleSendMoneyPopup: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleAddAccountPopup, toggleDepositPopup, toggleWithdrawPopup, toggleSendMoneyPopup }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [balance, setBalance] = useState({ dollars: '0', cents: '00' });
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { user, login, ready, logout } = usePrivy();

    const createOrUpdateUser = async () => {
        if (user?.email?.address) {
            const walletAddress = user.id || null;

            if (!walletAddress) {
                console.error("Error: Wallet address no encontrada");
                return false;
            }

            try {
                const userData = {
                    email: user.email.address,
                    wallet_address: walletAddress
                };

                const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://localhost:3001";

                const response = await axios.post(`${BACKEND_URL}/api/user/create`, userData, {
                    httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
                });

                console.log('Usuario creado/actualizado:', response.data);
                return true;
            } catch (error) {
                console.error('Error creando/actualizando usuario:', error);
                return false;
            }
        }
    };

    const fetchBalance = async () => {
        try {
            if (!user?.id) {
                throw new Error('User ID not found');
            }

            const walletAddress = user.id;

            const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://localhost:3001";

            const response = await axios.get(`${BACKEND_URL}/api/user/${encodeURIComponent(walletAddress)}/balance`, );

            const balance = response.data.balance;
            const [dollars, cents] = balance.toFixed(2).split('.');
            setBalance({ dollars, cents });
        } catch (error) {
            console.error('Error fetching balance:', error);
            setBalance({ dollars: '0', cents: '00' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isClient && ready && user?.id) {

            const initializeData = async () => {
                const userCreated = await createOrUpdateUser();
                if (userCreated) {
                    await fetchBalance();
                }
            };

            initializeData();
        } else {
            console.log('Waiting for user data...', { ready, user });
        }
    }, [ready, user?.id, isClient]);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    if (!isClient) return null;

    return (
        <div className={styles.header}>
            <div className={styles.balanceSection}>
                <div className={styles.balanceHeader}>
                    <span className={styles.balanceLabel}>Total Balance</span>
                    <img
                        src="/icons/info-icon.svg"
                        alt="info"
                        className="info-icon"
                    />
                </div>
                <div className={styles.balanceDisplay}>
                    <div className={styles.amount}>
                        <span className={styles.dollars}>
                            ${isVisible ? balance.dollars : '•••'}
                        </span>
                        <span className={styles.cents}>
                            .{isVisible ? balance.cents : '••'}
                        </span>
                    </div>
                    <div
                        className={styles.visibilityToggle}
                        onClick={toggleVisibility}
                    >
                        <img
                            src="/icons/eye-icon.svg"
                            alt="toggle visibility"
                            className={styles.eyeIcon}
                        />
                    </div>
                </div>
                {loading && <div className={styles.loading}>Loading...</div>}
            </div>

            <div className={styles.actionButtons}>
                {['Deposit', 'Withdraw', 'Send', 'Add Account'].map((action, index) => (
                    <div
                        className={styles.actionItem}
                        key={index}
                        onClick={
                            action === 'Deposit'
                                ? toggleDepositPopup
                                : action === 'Withdraw'
                                    ? toggleWithdrawPopup
                                    : action === 'Add Account'
                                        ? toggleAddAccountPopup
                                        : action === 'Send Money'
                                            ? toggleSendMoneyPopup
                                            : undefined
                        }
                    >
                        <div className={styles.actionButton}>
                            <img
                                src={`/icons/${action.toLowerCase()}-icon.svg`}
                                alt={action}
                                className={styles.actionIcon}
                            />
                        </div>
                        <span className={styles.actionLabel}>{action}</span>
                    </div>
                ))}
            </div>
            <div
                className={styles.actionItem}
                onClick={logout}
                style={{ cursor: 'pointer' }}
            >
                <span className={styles.actionLabel}>Logout</span>
            </div>
        </div>
    );
};

export default Header;
