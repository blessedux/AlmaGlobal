# AlmaGlobal

## Description

AlmaGlobal is a decentralized health insurance platform that leverages blockchain technology to provide transparent, accessible, and efficient healthcare coverage. Built on the principles of decentralization and user sovereignty, AlmaGlobal eliminates traditional insurance intermediaries while maintaining robust security and compliance standards.

## MVP Goal

The MVP focuses on building a functional UI/frontend that demonstrates the core user experience for decentralized health insurance. This includes user authentication, document upload capabilities, and instant refund processing for medical expenses, all while maintaining a frictionless user experience.

## Business Model

**AlmaGlobal Basic Plan:** lets

- **Premium**: $30/month
- **Coverage**: Up to $5,000 per incident
- **Scope**: 100% non-catastrophic event insurance
- **Requirements**: No KYC required
- **Processing**: Instant claims under $1,000

**AlmaGlobal Plus Plan:**

- **Premium**: $890/month
- **Coverage**: Unlimited coverage for all events
- **Scope**: Comprehensive including catastrophic illnesses
- **Processing**: Instant claims under $10,000
- **Support**: Priority processing and support

## Key Features

- **Decentralized Architecture**: Built on blockchain for transparency and immutability
- **Instant Claims Processing**: AI-powered document analysis for rapid reimbursement
- **Global Coverage**: Worldwide healthcare provider network
- **Self-Custodial Records**: Users maintain full control of their health data
- **Mobile-First Design**: Responsive interface optimized for all devices
- **Secure Authentication**: Multi-factor authentication with biometric support
- **Real-Time Updates**: Live status tracking for claims and coverage

## Technical Stack

### Frontend

- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **State Management**: Zustand/Redux Toolkit
- **Authentication**: Passkeys + biometrics/2FA

### Backend

- **Runtime**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for session management
- **File Storage**: IPFS/Arweave for document storage

### Blockchain

- **Network**: LISK
- **Smart Contracts**: Solidity with Hardhat
- **Wallet Integration**: MetaMask, WalletConnect
- **Token Standards**: ERC-20, ERC-721 for health records

### Authentication & Security

- **Identity**: Self-custodial wallets
- **Encryption**: End-to-end encryption for health data
- **Compliance**: HIPAA-compliant data handling
- **Audit**: Regular security audits and penetration testing

### Development

- **LISC L2**: Native integration with LISC Layer 2 network
- **Smart Contracts**: Deployed on LISC L2 for optimal performance
- **Testing**: Comprehensive testing suite with Foundry
- **Monitoring**: Real-time blockchain monitoring and analytics

### Deployment & Infrastructure

- **Hosting**: Vercel for frontend deployment
- **Blockchain**: LISC L2 mainnet deployment
- **Storage**: IPFS pinning services for decentralized storage
- **CDN**: Global content delivery network
- **Monitoring**: Uptime monitoring and performance analytics

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
