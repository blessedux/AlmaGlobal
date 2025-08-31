# AlmaGlobal API Documentation

## Overview

This document outlines the API endpoints for AlmaGlobal's decentralized health insurance platform.

## Base URL

```
https://api.almaglobal.com
```

## Authentication

All API calls require Web3 wallet authentication using JWT tokens.

### Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Endpoints

### User Management

- `POST /auth/wallet` - Authenticate with Web3 wallet
- `POST /auth/passkey` - Authenticate with passkey
- `POST /auth/2fa` - Verify 2FA code
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

### Health Records

- `GET /health/records` - Get user's health records
- `POST /health/records` - Upload new health record
- `PUT /health/records/:id` - Update health record
- `DELETE /health/records/:id` - Delete health record
- `GET /health/passport` - Generate medical passport

### Insurance

- `POST /insurance/subscribe` - Subscribe to insurance plan
- `GET /insurance/status` - Get insurance status
- `POST /insurance/claims` - Submit insurance claim
- `GET /insurance/claims` - Get claim history
- `GET /insurance/coverage` - Get coverage details

### Storage

- `POST /storage/upload` - Upload file to IPFS/Arweave
- `GET /storage/:cid` - Retrieve file from storage
- `DELETE /storage/:cid` - Remove file from storage

## Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

## WebSocket Events

- `user:connected` - User wallet connected
- `claim:submitted` - New insurance claim submitted
- `record:updated` - Health record updated
- `payment:processed` - Insurance payment processed

---

_This documentation will be updated as the API evolves during development._
