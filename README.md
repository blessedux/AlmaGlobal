# AlmaGlobal

**Trustless Health. Eternal Records. Global Access.**

AlmaGlobal is a Web3 application offering **decentralized health insurance**, **eternal medical records on blockchain**, and a **global health passport** accessible anywhere in the world. All with seamless UX, no KYC, no intermediaries, and full user sovereignty over their data.

---

## MVP Goal

A functional UI/frontend where users can access decentralized healthcare by subscribing to a **$30/month, no-KYC, 100% non-catastrophic event insurance**. Cancer/deadly diseases are not covered. Any event worldwide under $5000 at a hospital/healthcare provider can be refunded through this competitive, pseudonymous, and self-custodial health insurance and personal medical record provider.

---

## Key Features

### Passkey Wallet Creation with 2FA Security

- Passwordless authentication with **passkeys + biometrics/2FA**
- Self-custodial wallet on user's device
- Onboarding in under 5 minutes

### Decentralized Health Data Storage

- Medical records on blockchain + encrypted storage on IPFS/Arweave
- User owns their keys and data
- Compatible with PDFs, images, and structured data

### Global Health Passport

- Consolidated medical records in a **digital passport**
- Globally accessible via **QR code or wallet**
- Sharing under user consent

### Trustless Insurance Integration

- Marketplace for decentralized insurance
- Premiums and claims managed by **smart contracts**
- Instant payments in stablecoins

### Multi-Language & Accessibility

- Spanish + regional dialects
- Accessibility: screen readers, high contrast mode, adjustable typography
- Works offline in low-connectivity areas

### Interoperability with Healthcare Providers

- APIs for laboratories, clinics, and doctors
- **Soulbound tokens** to validate record authenticity
- MVP admin for dispute resolution

### Health Insights & Personalization

- Preventive recommendations with **on-device analysis**
- Health metrics dashboard + exportable reports
- Gamified nudges for checkups and healthy habits

### Cross-Platform Availability

- iOS, Android, and Web (PWA)
- Optimized for low-bandwidth environments
- App <100MB for low-end devices

---

## Technical Stack

### Frontend

- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand/Redux Toolkit
- **Web3**: ethers.js, wagmi, viem

### Backend & Storage

- **API**: Next.js API routes
- **Decentralized Storage**: IPFS + Arweave
- **Local Storage**: IndexedDB for offline functionality
- **Encryption**: AES-256 for data security

### Blockchain

- **Network**: Ethereum/Polygon
- **Smart Contracts**: Solidity
- **Development**: Hardhat, Foundry
- **Testing**: Chai, Mocha

### Authentication & Security

- **Web3 Wallets**: MetaMask, WalletConnect
- **Passkeys**: WebAuthn API
- **2FA**: TOTP implementation
- **Security**: Rate limiting, input validation

### Deployment & Infrastructure

- **Frontend**: Vercel
- **IPFS Pinning**: Pinata, Infura
- **Monitoring**: Sentry, Vercel Analytics
- **CI/CD**: GitHub Actions

---

## MVP Scope & Insurance Details

### Insurance Coverage

- **Monthly Premium**: $30 USD
- **Coverage Limit**: $5,000 per claim
- **Coverage Type**: Non-catastrophic events only
- **Exclusions**: Cancer, deadly diseases, pre-existing conditions
- **Global Coverage**: Any healthcare provider worldwide
- **No KYC Required**: Pseudonymous and privacy-focused

### User Experience

- **Self-Custodial**: Users control their private keys
- **Pseudonymous**: No personal identification required
- **Instant Claims**: Automated processing via smart contracts
- **Global Access**: Works anywhere with internet access

### Admin Functions (MVP)

- **Dispute Resolution**: Manual review of complex claims
- **Record Validation**: Verification of medical documentation
- **System Monitoring**: Oversight of smart contract operations

---

## Global Impact

- **Universal Access** to medical records without borders
- **Financial Inclusion** through trustless micro-insurance
- **Hispanic Community Empowerment** (500M+ speakers)
- **Sustainable Infrastructure** by decentralizing storage
- **Fraud Reduction** through blockchain and soulbound tokens

---

## Development Phases

- ✅ **Planning**: Architecture, tech stack, MVP scope
- 🔜 **Phase 1**: Core infrastructure, wallet, authentication
- 🔜 **Phase 2**: Health data management, medical passport
- 🔜 **Phase 3**: Insurance smart contracts, claims system
- 🔜 **Phase 4**: Frontend UI/UX, responsive design
- 🔜 **Phase 5**: Integration, testing, optimization
- 🔜 **Phase 6**: Deployment, launch, user feedback

---

## Contributing

AlmaGlobal is an open project.  
Pull requests, issues, and proposals are welcome.

---

## Documentation

- [Development TODO](./docs/TODO.md) - Detailed development roadmap
- [API Documentation](./docs/API.md) - Coming soon
- [Smart Contract Docs](./docs/contracts.md) - Coming soon
- [User Guide](./docs/user-guide.md) - Coming soon

---

## License

MIT
