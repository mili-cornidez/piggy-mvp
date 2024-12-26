import React from 'react';
import styles from '@styles/components/AddAccount.module.scss';

const AddAccount: React.FC = () => {
    return (
        <div className={styles.popup}>
            <div className={styles.handle}></div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1>Add Account</h1>
                    <p>Enter the new account holder's details to create the account.</p>
                </div>
                <div className={styles.formSection}>
                    <div className={styles.photoUpload}>
                        <div className={styles.photoPlaceholder}>
                            <img src="https://dashboard.codeparrot.ai/api/assets/Z227JI6CYQNjI8uy" alt="Upload" />
                            <div className={styles.addButton}>
                                <img src="https://dashboard.codeparrot.ai/api/assets/Z227JI6CYQNjI8uz" alt="Add" />
                            </div>
                        </div>
                    </div>
                    <form>
                        <div className={styles.inputField}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="John" />
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="birthdate">Birthdate</label>
                            <input type="text" id="birthdate" placeholder="MM/DD/YYYY" />
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="john@example.com" />
                        </div>
                        <button type="submit" className={styles.submitButton}>
                            Add Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAccount;
