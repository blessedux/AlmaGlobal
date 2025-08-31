# AlmaGlobal Smart Contracts Documentation

## Overview

This document outlines the smart contracts that power AlmaGlobal's decentralized health insurance platform.

## Contract Architecture

### Core Contracts

- **AlmaGlobalFactory** - Deploys and manages user contracts
- **UserProfile** - Individual user health records and insurance data
- **InsurancePool** - Manages insurance premiums and claims
- **ClaimsProcessor** - Handles claim validation and payments
- **TokenRegistry** - Manages soulbound tokens for record validation

### Supporting Contracts

- **PriceOracle** - Provides stablecoin price feeds
- **DisputeResolver** - MVP admin functions for dispute resolution
- **AccessControl** - Manages permissions and roles

## Insurance Smart Contract Details

### Premium Structure

- **Monthly Cost**: $30 USD (paid in USDC/USDT)
- **Coverage Limit**: $5,000 per claim
- **Coverage Period**: Monthly renewable
- **Exclusions**: Cancer, deadly diseases, pre-existing conditions

### Claims Process

1. User submits claim with medical documentation
2. Smart contract validates coverage and limits
3. Automated payment if under $1,000
4. Manual review required for claims $1,000-$5,000
5. Payment processed in stablecoins within 24 hours

### Risk Management

- **Pool Reserves**: 80% of premiums held in reserve
- **Reinsurance**: 20% allocated to reinsurance contracts
- **Fraud Prevention**: Soulbound tokens for document verification
- **Dispute Resolution**: MVP admin oversight for complex cases

## Technical Specifications

### Solidity Version

- **Version**: 0.8.19+
- **Optimizer**: Enabled with 200 runs
- **License**: MIT

### Gas Optimization

- **Batch Operations**: Multiple claims in single transaction
- **Storage Packing**: Efficient storage layout
- **Event Usage**: Minimal storage, maximum transparency

### Security Features

- **Access Control**: Role-based permissions
- **Reentrancy Protection**: OpenZeppelin security patterns
- **Input Validation**: Comprehensive parameter checking
- **Emergency Pause**: Circuit breaker functionality

## Deployment

### Networks

- **Testnet**: Sepolia, Mumbai
- **Mainnet**: Ethereum, Polygon

### Verification

- **Etherscan**: All contracts verified
- **Documentation**: NatSpec comments included
- **Testing**: 95%+ test coverage required

## Integration

### Frontend Integration

- **Web3 Provider**: MetaMask, WalletConnect
- **Contract Interaction**: ethers.js, wagmi
- **Event Listening**: Real-time updates

### Backend Integration

- **API Endpoints**: Contract state queries
- **Event Processing**: Off-chain event handling
- **Gas Estimation**: Dynamic fee calculation

---

_This documentation will be updated as the smart contracts are developed and deployed._
