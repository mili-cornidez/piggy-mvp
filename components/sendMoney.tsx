import React, { useState } from 'react';
import styles from '@styles/components/SendMoney.module.scss';

interface SendMoneyProps {
    onClose: () => void;
    childAccounts: { name: string; wallet_balance: number; avatar?: string }[];
    availableBalance: number;
    onSendMoney: (recipient: string, amount: number) => void;
}

const SendMoney: React.FC<SendMoneyProps> = ({ onClose, childAccounts, availableBalance, onSendMoney }) => {
    const [selectedChild, setSelectedChild] = useState<string | null>(null);
    const [step, setStep] = useState<'select' | 'confirm'>('select');
    const [amount, setAmount] = useState<string>('');

    const handleChildSelect = (childName: string) => {
        setSelectedChild(childName);
    };

    const handleContinue = () => {
        if (selectedChild) {
            setStep('confirm');
        }
    };

    const handleSend = () => {
        if (selectedChild && parseFloat(amount) > 0 && parseFloat(amount) <= availableBalance) {
            onSendMoney(selectedChild, parseFloat(amount));
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <div className={styles.handleBar}></div>

                {step === 'select' ? (
                    <div className={styles.modalContent}>
                        <h1 className={styles.title}>Send Money from Your Piggy</h1>
                        <p className={styles.description}>Select one of your children to send funds</p>

                        <div className={styles.childrenList}>
                            {childAccounts.map((child) => (
                                <div
                                    key={child.name}
                                    className={`${styles.childItem} ${selectedChild === child.name ? styles.selected : ''}`}
                                    onClick={() => handleChildSelect(child.name)}
                                >
                                    <div className={styles.childInfo}>
                                        <img src={child.avatar || "/images/default-avatar.jpg"} alt={child.name} />
                                        <div className={styles.childDetails}>
                                            <span className={styles.childName}>{child.name}</span>
                                            <span className={styles.childBalance}>${child.wallet_balance.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className={styles.radioIcon}>
                                        {selectedChild === child.name ? '🔘' : '⚪'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.continueButton}>
                            <button onClick={handleContinue} disabled={!selectedChild}>
                                Continue
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.modalContent}>
                        <h1 className={styles.title}>Send Money from Your Piggy</h1>
                        <p className={styles.description}>Confirm amount to send</p>

                        <div className={styles.inputField}>
                            <input
                                type="number"
                                placeholder="$0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                min="0"
                                max={availableBalance}
                            />
                            <span className={styles.balanceText}>Balance: ${availableBalance.toFixed(2)}</span>
                            <button className={styles.maxButton} onClick={() => setAmount(availableBalance.toFixed(2))}>
                                Max
                            </button>
                        </div>

                        <div className={styles.recipientInfo}>
                            <span>Sending to</span>
                            <div className={styles.recipient}>
                                <img src="/images/default-avatar.jpg" alt={selectedChild as string}/>
                                <span>{selectedChild}</span>
                            </div>
                        </div>

                        <div className={styles.continueButton}>
                            <button onClick={handleSend} disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > availableBalance}>
                                Confirm & Send
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SendMoney;
