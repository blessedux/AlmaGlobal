# Medical Reimbursement Smart Contracts

## Overview

This directory contains the smart contracts for the AlmaGlobal medical cost reimbursement system. The contracts are designed to handle subscriptions, claims submission, document verification, and automatic payouts on the **Lisk L2 network**.

## Architecture

### Core Contract: `MedicalReimbursement.sol`

The main contract that handles all medical reimbursement functionality:

#### **Key Components:**

1. **Subscription Management**
   - Create, renew, and cancel subscriptions
   - Monthly fee collection
   - Coverage limits and deductibles
   - Subscription duration tracking

2. **Claims Processing**
   - Submit medical cost claims
   - Document verification (IPFS hash storage)
   - Claim approval/rejection workflow
   - Automatic payment processing

3. **Document Verification**
   - Medical document validation
   - Verifier role management
   - Amount verification and adjustment

4. **Fund Management**
   - Contract treasury
   - Processing fees
   - Automatic payouts
   - Fund withdrawal (admin only)

#### **Data Structures:**

```solidity
struct Subscription {
    uint256 subscriptionId;
    address subscriber;
    uint256 monthlyFee;
    uint256 coverageLimit;
    uint256 deductible;
    uint256 startDate;
    uint256 endDate;
    bool isActive;
}

struct Claim {
    uint256 claimId;
    address claimant;
    uint256 subscriptionId;
    uint256 amount;
    string medicalDocumentHash; // IPFS hash
    uint256 submissionDate;
    ClaimStatus status;
    string rejectionReason;
}

struct DocumentVerification {
    uint256 claimId;
    bool isVerified;
    uint256 verifiedAmount;
    address verifier;
    uint256 verificationDate;
}
```

#### **Workflow:**

1. **Subscription Creation**
   ```
   User → createSubscription() → Pay monthly fee → Active subscription
   ```

2. **Claim Submission**
   ```
   User → submitClaim() → Upload medical docs → Pay processing fee → Claim pending
   ```

3. **Verification Process**
   ```
   Verifier → approveClaim() → Set verified amount → Claim approved
   ```

4. **Payment Processing**
   ```
   Verifier → processPayment() → Automatic payout → Claim paid
   ```

## Security Features

- **ReentrancyGuard**: Prevents reentrancy attacks
- **Ownable**: Admin-only functions protected
- **Input Validation**: Comprehensive parameter checks
- **Access Control**: Verifier role management
- **Safe Transfers**: Secure ETH transfers

## Lisk Network Configuration

### **Network Details:**
- **Lisk Mainnet**: Chain ID 1135, RPC: `https://rpc.api.lisk.com`
- **Lisk Sepolia Testnet**: Chain ID 4202, RPC: `https://rpc.sepolia-api.lisk.com`
- **Block Explorer**: [Blockscout](https://blockscout.lisk.com) (Mainnet) / [Sepolia Blockscout](https://sepolia-blockscout.lisk.com) (Testnet)

### **Gas Settings:**
- **Default Gas Price**: 1 Gwei (1,000,000,000 wei)
- **Recommended Gas Limit**: 5,000,000

## Deployment

### Prerequisites

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Add your WALLET_KEY (private key from MetaMask)
   ```

3. **Get testnet ETH:**
   - Use [Lisk Bridge](https://bridge.lisk.com) to bridge ETH from Ethereum Sepolia
   - Or use [Sepolia Faucet](https://sepoliafaucet.com) and bridge to Lisk

### Local Development

1. **Compile contracts:**
   ```bash
   npm run compile
   ```

2. **Run tests:**
   ```bash
   npm run test
   ```

3. **Start local node:**
   ```bash
   npm run node
   ```

4. **Deploy locally:**
   ```bash
   npm run deploy:local
   ```

### Lisk Testnet Deployment

1. **Deploy to Lisk Sepolia:**
   ```bash
   npm run deploy:lisk-sepolia
   ```

2. **Verify contract on Blockscout:**
   ```bash
   npm run verify:lisk-sepolia <deployed_address>
   ```

3. **View on Blockscout:**
   ```
   https://sepolia-blockscout.lisk.com/address/<deployed_address>
   ```

### Lisk Mainnet Deployment

1. **Deploy to Lisk Mainnet:**
   ```bash
   npm run deploy:lisk
   ```

2. **Verify contract on Blockscout:**
   ```bash
   npm run verify:lisk <deployed_address>
   ```

3. **View on Blockscout:**
   ```
   https://blockscout.lisk.com/address/<deployed_address>
   ```

## Testing

The contract includes comprehensive tests covering:

- ✅ Contract deployment
- ✅ Subscription management
- ✅ Claim submission and validation
- ✅ Document verification
- ✅ Payment processing
- ✅ Admin functions
- ✅ Access control
- ✅ Error handling

Run tests with:
```bash
npm run test
```

## Gas Optimization

- **Efficient storage**: Packed structs where possible
- **Batch operations**: Optimized for multiple operations
- **Event emission**: Minimal gas cost for logging
- **Function optimization**: Reduced external calls

## Lisk-Specific Features

- **Blockscout Integration**: Native support for Lisk's block explorer
- **Network Optimization**: Configured for Lisk's gas pricing model
- **Contract Verification**: Streamlined verification process
- **Multi-Network Support**: Easy switching between testnet and mainnet

## Future Enhancements

1. **Role-Based Access Control**: Multiple verifier roles
2. **Automated Verification**: Oracle integration for document validation
3. **Multi-Token Support**: ERC-20 token payments
4. **Insurance Pool**: Risk distribution mechanism
5. **Governance**: DAO-style decision making
6. **Lisk L2 Features**: Leverage Lisk's L2 scaling solutions

## License

MIT License - see LICENSE file for details
