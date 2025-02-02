import React, { useState } from 'react';
import styles from '@styles/components/Withdraw.module.scss';

interface WithdrawProps {
    onClose: () => void;
}

const Withdraw: React.FC<WithdrawProps> = ({ onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [currency, setCurrency] = useState<'Crypto' | 'Bank Account'>('Bank Account');
    const [accountInfo, setAccountInfo] = useState('');
    const [error, setError] = useState('');

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 200);
    };

    const handlePaste = async () => {
        try {
            if (!navigator.clipboard) {
                throw new Error('Clipboard API not available');
            }
            const text = await navigator.clipboard.readText();
            if (text) {
                setAccountInfo(text);
            } else {
                alert('Clipboard is empty');
            }
        } catch (error) {
            console.error('Failed to paste:', error);
            alert('Failed to paste from clipboard');
        }
    };

    const handleContinue = () => {
        if (!/^\d{22}$/.test(accountInfo)) {
            setError('Must contain exactly 22 numbers.');
        }
    };

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={`${styles.popup} ${isClosing ? styles.popupClosing : ''}`} onClick={(e) => e.stopPropagation()}>

                <div className={styles.content}>
                    <h2 className={styles.title}>Withdraw Money from Your Piggy</h2>

                    <div className={styles.currencyToggle}>
                        <button className={`${styles.currencyButton} ${styles.disabled}`} disabled>
                            Crypto
                        </button>
                        <button
                            className={`${styles.currencyButton} ${currency === 'Bank Account' ? styles.active : ''}`}
                            onClick={() => setCurrency('Bank Account')}>
                            Bank Account
                        </button>
                    </div>

                    <p className={styles.instruction}>
                        Add bank account information to withdraw in Argentine Pesos
                    </p>

                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            placeholder="Enter CBU (22 digits)"
                            value={accountInfo}
                            onChange={(e) => setAccountInfo(e.target.value)}
                        />
                        <button className={styles.pasteButton} onClick={handlePaste}>Paste</button>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button className={styles.continueButton} onClick={handleContinue}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
    };

    export default Withdraw;
