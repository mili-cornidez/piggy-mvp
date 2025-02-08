import React, { useState, useEffect } from 'react';
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
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { user } = usePrivy();

    if (!isClient) return null;

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

        if (id === 'birthdate') {
            let newValue = value.replace(/\D/g, '');

            if (newValue.length > 2) {
                newValue = `${newValue.slice(0, 2)}/${newValue.slice(2)}`;
            }
            if (newValue.length > 5) {
                newValue = `${newValue.slice(0, 5)}/${newValue.slice(5)}`;
            }

            if (newValue.length > 10) {
                newValue = newValue.slice(0, 10);
            }

            setFormData((prevData) => ({
                ...prevData,
                [id]: newValue,
            }));
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFields()) return;

        if (!user?.id || !user?.email?.address) {
            console.error("No wallet address or email found for user.");
            return;
        }

        try {
            const walletAddress = user.id;
            const parentEmail = user.email.address; // Ahora TypeScript sabe que existe

            const response = await fetch(`${BACKEND_URL}/api/user/${encodeURIComponent(walletAddress)}/add-child`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parentEmail, childData: formData }),
            });

            if (!response.ok) {
                throw new Error(`Failed to add child account (Status: ${response.status})`);
            }

            setIsSuccessVisible(true);
        } catch (error) {
            console.error('Error adding account:', error);
        }
    };

    const handleSuccessOk = () => {

        onClose();

        setTimeout(() => {
            if (typeof window !== "undefined") {
                const event = new Event("refreshChildAccounts");
                window.dispatchEvent(event);
            }
        }, 300);
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
