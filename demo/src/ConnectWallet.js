import React, { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';

const ConnectWallet = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [phantomAvailable, setPhantomAvailable] = useState(false);

    // Check if Phantom is available
    useEffect(() => {
        if (window?.solana?.isPhantom) {
            setPhantomAvailable(true);
            // Auto-connect to the wallet if already connected
            window.solana.connect({ onlyIfTrusted: true })
                .then(response => {
                    setWalletAddress(response.publicKey.toString());
                })
                .catch(() => {});
        } else {
            setPhantomAvailable(false);
        }
    }, []);

    // Function to connect the wallet
    const connectWallet = async () => {
        if (phantomAvailable) {
            try {
                // Request a connection to the wallet
                const response = await window.solana.connect();
                setWalletAddress(response.publicKey.toString());
                console.log('Connected to wallet:', response.publicKey.toString());
            } catch (err) {
                console.error('Failed to connect wallet:', err);
            }
        } else {
            alert('Phantom Wallet is not installed or detected!');
        }
    };

    // Function to disconnect the wallet
    const disconnectWallet = () => {
        setWalletAddress(null);
        window.solana.disconnect();
        console.log('Disconnected from wallet');
    };

    return (
        <div>
            {phantomAvailable ? (
                walletAddress ? (
                    <div>
                        <p>Connected wallet address: {walletAddress}</p>
                        <button onClick={disconnectWallet}>Disconnect Wallet</button>
                    </div>
                ) : (
                    <button onClick={connectWallet}>Connect Wallet</button>
                )
            ) : (
                <p>Please install the Phantom Wallet extension.</p>
            )}
        </div>
    );
};

export default ConnectWallet;
