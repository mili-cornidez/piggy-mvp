import React, { useState, useEffect } from 'react';
import styles from '@styles/components/Header.module.scss';
import axios from 'axios';
import { usePrivy } from '@privy-io/react-auth';

const Header: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [balance, setBalance] = useState({ dollars: '0', cents: '00' })
    const [loading, setLoading] = useState(true);
    const { user, login, ready, logout } = usePrivy();

    const createOrUpdateUser = async () => {
        if (user?.email?.address) {
            try {
                const userData = {
                    email: user.email.address,
                    wallet_address: user.id
                };

                const response = await axios.post('/api/user/create', userData);
                console.log('Create/update response:', response.data);
            } catch (error) {
                console.error('Error creating/updating user:', error);
            }
        }
    };

    const fetchBalance = async () => {
        try {
            if (!user?.id) {
                console.log('No user ID found:', user);
                throw new Error('User ID not found');
            }

            console.log('Fetching balance for:', user.id);
            const response = await axios.get(`/api/user/balance/${encodeURIComponent(user.id)}`);
            console.log('Balance response:', response.data);

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
        if (ready && user?.id) {
            console.log('User data available:', {
                email: user.email?.address,
                id: user.id
            });
            createOrUpdateUser();
            fetchBalance();
        } else {
            console.log('Waiting for user data...', { ready, user });
        }
    }, [ready, user?.id]);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

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
                {loading && <div className={styles.loading}>Loading...</div>} {/* Muestra un indicador de carga */}
            </div>

            <div className={styles.actionButtons}>
                {['Deposit', 'Withdraw', 'Send', 'Add Account'].map((action, index) => (
                    <div className={styles.actionItem} key={index}>
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
                style={{cursor: 'pointer'}}
            >
                <span className={styles.actionLabel}>Logout</span>
            </div>
        </div>
    );
};

export default Header;
