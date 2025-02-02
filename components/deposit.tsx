import React, { useState } from 'react';
import styles from '@styles/components/Deposit.module.scss';

interface DepositProps {
    onClose: () => void;
}

const Deposit: React.FC<DepositProps> = ({ onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [currency, setCurrency] = useState<'Crypto' | 'Argentine Pesos'>('Argentine Pesos');

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 200);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Deposit money here',
                text: 'Transfer money to this CVU: 00001768000000000764896\nAlias: piggy.wallet.invest',
                url: window.location.href,
            })
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            alert('Sharing not supported on this browser.');
        }
    };


    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={`${styles.popup} ${isClosing ? styles.popupClosing : ''}`}
                 onClick={(e) => e.stopPropagation()}>
                <div className={styles.piggyContainer}>
                    <img src="/images/piggy-main.svg" alt="Piggy" className={styles.piggyImage}/>
                </div>

                <div className={styles.content}>
                    <h2 className={styles.title}>Add Money to Your Piggy</h2>

                    <div className={styles.currencyToggle}>
                        <button className={`${styles.currencyButton} ${styles.disabled}`} disabled>
                            Crypto
                        </button>
                        <button
                            className={`${styles.currencyButton} ${currency === 'Argentine Pesos' ? styles.active : ''}`}
                            onClick={() => setCurrency('Argentine Pesos')}>
                            Argentine Pesos
                        </button>
                    </div>

                    <p className={styles.instruction}>
                        To deposit money in your account, transfer pesos to this CVU
                    </p>
                    <div className={styles.cvuContainer}>
                        <div className={styles.cvu}>
                            <span>CVU</span>
                            <span>00001768000000000764896</span>
                        </div>
                        <div className={styles.alias}>
                            <span>Alias</span>
                            <span>piggy.wallet.invest</span>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className={styles.buttonContainer}>
                        <button className={styles.closeButton} onClick={onClose}>Close</button>
                        <button className={styles.shareButton} onClick={handleShare}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deposit;
