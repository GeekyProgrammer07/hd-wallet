# 🔐 HD Wallet Implementation (Backend)

This project implements a backend API using **Express.js** that generates **HD wallets (Hierarchical Deterministic wallets)** for Ethereum and Solana blockchains using a single mnemonic seed phrase. This is part of a larger project named **Timbing**, and the frontend is currently under development.

---

## 🚀 Features

- ✅ Generate 12-word seed phrase (BIP39)
- ✅ Create Ethereum wallet (BIP44)
- ✅ Create Solana wallet (BIP44 with ed25519)
- ✅ Stateless key derivation using counters
- ✅ RESTful API with Express.js

---

## 📦 Tech Stack

- **Backend:** Node.js, Express.js
- **Blockchain SDKs:**
  - `bip39` for mnemonic generation and seed derivation
  - `ethereumjs-wallet` for Ethereum HD key generation
  - `@solana/web3.js` and `ed25519-hd-key` for Solana wallet derivation

---
