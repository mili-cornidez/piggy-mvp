import React, { useState } from 'react';
import styles from '@styles/components/AddAccount.module.scss';
import { useRouter } from 'next/router';
import { usePrivy } from '@privy-io/react-auth';

interface AddAccountProps {
    onClose: () => void;
}

const AddAccount: React.FC<AddAccountProps> = ({ onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const [formData, setFormData] = useState({ name: '', birthdate: '', email: '' });
    const [errors, setErrors] = useState({ name: '', birthdate: '', email: '' });
    const router = useRouter();
    const { user } = usePrivy();

    const validateFields = (): boolean => {
        let isValid = true;
        const newErrors = { name: '', birthdate: '', email: '' };

        if (!formData.name.trim()) {
            newErrors.name = 'Name cannot be blank';
            isValid = false;
        }

        const birthdateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!birthdateRegex.test(formData.birthdate)) {
            newErrors.birthdate = 'Birthdate must be in DD/MM/YYYY format';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Email must be valid';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateFields()) return;

        const walletAddress = user?.id || '';
        const parentEmail = user?.email?.address || '';

        if (!walletAddress || !parentEmail) {
            console.error('User wallet address or email is missing');
            return;
        }

        try {
            const response = await fetch(`/api/user/${encodeURIComponent(walletAddress)}/add-child`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parentEmail, childData: { ...formData, wallet_balance: 0 } }),
            });

            if (!response.ok) {
                throw new Error('Failed to add child account');
            }

            setIsSuccessVisible(true);
        } catch (error) {
            console.error('Error adding account:', error);
        }
    };

    const handleSuccessOk = () => {
        router.push('/home');
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 200);
    };

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={`${styles.popup} ${isClosing ? styles.popupClosing : ''}`}
                 onClick={(e) => e.stopPropagation()}>
                {!isSuccessVisible ? (
                    <div className={styles.content}>
                        <h2 className={styles.title}>Add Account</h2>
                        <p>Enter the new account holder's details to create the account.</p>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.inputField}>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" value={formData.name} onChange={handleInputChange}
                                       placeholder="John"/>
                                {errors.name && <span className={styles.error}>{errors.name}</span>}
                            </div>

                            <div className={styles.inputField}>
                                <label htmlFor="birthdate">Birthdate</label>
                                <input type="text" id="birthdate" value={formData.birthdate}
                                       onChange={handleInputChange} placeholder="DD/MM/YYYY"/>
                                {errors.birthdate && <span className={styles.error}>{errors.birthdate}</span>}
                            </div>

                            <div className={styles.inputField}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={formData.email} onChange={handleInputChange}
                                       placeholder="john@example.com"/>
                                {errors.email && <span className={styles.error}>{errors.email}</span>}
                            </div>

                            <button type="submit" className={styles.submitButton}>Add Account</button>
                        </form>
                    </div>
                ) : (
                    <div className={styles.successMessage}>
                        <h1>All set up!</h1>
                        <p>We sent an email to the new account holder with a link to access their piggy wallet.</p>
                        <button onClick={handleSuccessOk} className={styles.submitButton}>Got it</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddAccount;
