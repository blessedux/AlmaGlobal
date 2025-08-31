# AlmaGlobal v0 Technical Prompt

## Project Overview

Build a functional UI/frontend for AlmaGlobal - a decentralized health insurance platform offering $30/month, no-KYC, non-catastrophic event coverage up to $5000. The MVP should demonstrate a frictionless user experience for authentication, document upload, and instant insurance claims processing.

## Core Requirements

### 1. Authentication Flow

- **Web3 Wallet Integration**: MetaMask and WalletConnect support
- **Passkey Creation**: WebAuthn API for biometric authentication
- **2FA Setup**: TOTP implementation for additional security
- **Onboarding**: Complete setup in under 5 minutes

### 2. Document Management

- **Health Record Upload**: Support for PDFs, images (max 10MB)
- **Encrypted Storage**: Client-side encryption before IPFS upload
- **Medical Passport**: QR code generation for easy sharing
- **Record Organization**: Date-based categorization and search

### 3. Insurance Claims

- **Instant Processing**: Claims under $1000 processed automatically
- **Documentation**: Receipt upload and claim form
- **Coverage Validation**: Smart contract integration for limits
- **Payment**: Stablecoin refunds within 24 hours

## Technical Specifications

### Frontend Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand for global state
- **Web3**: ethers.js, wagmi, viem for blockchain interaction

### UI/UX Requirements

- **Responsive Design**: Mobile-first, works on all devices
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: <100MB app size, fast loading
- **Offline Support**: Basic functionality without internet

## User Flow Screens

### 1. Landing Page

- Hero section explaining the $30/month insurance
- Coverage details (up to $5000, non-catastrophic only)
- "Get Started" CTA button
- Trust indicators and social proof

### 2. Wallet Connection

- Wallet selection (MetaMask, WalletConnect, Passkey)
- Connection status and network validation
- 2FA setup if using passkey
- Welcome message with user's address

### 3. Insurance Subscription

- Plan selection ($30/month)
- Payment method (USDC/USDT)
- Coverage confirmation
- Subscription status dashboard

### 4. Health Records Dashboard

- Upload new record button
- Existing records list with search/filter
- Medical passport QR code
- Record sharing controls

### 5. Document Upload

- Drag & drop file upload
- File type validation (PDF, JPG, PNG)
- Encryption status indicator
- IPFS upload progress
- Success confirmation

### 6. Claims Submission

- Claim type selection
- Amount input (max $5000)
- Receipt/document upload
- Coverage validation
- Submission confirmation

### 7. Claims Dashboard

- Claim history and status
- Payment tracking
- Document requirements
- Support contact

### 8. Medical Passport

- QR code display
- Record summary
- Sharing options
- Offline access

## Mock Data & Integration

### Smart Contract Mocking

- **Insurance Contract**: Mock premium collection and claims
- **User Profile**: Mock health record storage
- **Claims Processing**: Mock validation and payment
- **Events**: Mock blockchain events for real-time updates

### IPFS Mocking

- **File Upload**: Simulate IPFS upload with local storage
- **Content Addressing**: Generate mock CIDs
- **Retrieval**: Mock file download and decryption

### Authentication Mocking

- **Wallet Connection**: Mock MetaMask/WalletConnect responses
- **Passkey**: Mock WebAuthn API calls
- **2FA**: Mock TOTP generation and validation

## Key Components to Build

### 1. Layout Components

- `Header` - Navigation and wallet status
- `Sidebar` - Main navigation menu
- `Footer` - Links and legal information
- `LoadingStates` - Skeleton loaders and spinners

### 2. Authentication Components

- `WalletConnect` - Wallet selection and connection
- `PasskeySetup` - Biometric authentication setup
- `TwoFactorAuth` - 2FA configuration
- `UserProfile` - User information display

### 3. Insurance Components

- `SubscriptionCard` - Plan selection and payment
- `CoverageStatus` - Current insurance status
- `ClaimsForm` - Claim submission interface
- `ClaimsHistory` - Claim tracking and status

### 4. Health Records Components

- `RecordUpload` - File upload with encryption
- `RecordsList` - Organized record display
- `MedicalPassport` - QR code and sharing
- `RecordViewer` - Document preview and download

### 5. Utility Components

- `QRCode` - Medical passport QR generation
- `FileUpload` - Drag & drop file handling
- `EncryptionStatus` - Upload progress and security
- `Notification` - Success/error messages

## Design System

### Color Palette

- **Primary**: Deep Blue (#296870)
- **Secondary**: Teal (#0a7f8a)
- **Accent**: Bright Cyan (#2fced6)
- **Highlight**: Light Teal (#037682)
- **Background**: Soft Blue (#effaff)
- **Surface**: Pale Cyan (#e0fbfc)

### Typography

- **Headings**: Inter font family
- **Body**: System font stack
- **Monospace**: For addresses and technical info

### Spacing & Layout

- **Grid**: 8px base unit system
- **Breakpoints**: Mobile (320px), Tablet (768px), Desktop (1024px)
- **Containers**: Max-width 1200px, centered

## Performance Requirements

### Loading States

- Skeleton screens for all data fetching
- Progressive loading for large lists
- Optimistic updates for user actions

### Error Handling

- User-friendly error messages
- Retry mechanisms for failed operations
- Fallback UI for broken components
