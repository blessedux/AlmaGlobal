// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MedicalReimbursement
 * @dev Smart contract for managing medical cost reimbursements
 * @dev Handles subscriptions, claims, and automatic payouts
 */
contract MedicalReimbursement is ReentrancyGuard, Ownable {
    
    // ============ STRUCTS ============
    
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
        string medicalDocumentHash; // IPFS hash of medical documents
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
    
    // ============ ENUMS ============
    
    enum ClaimStatus {
        Pending,
        UnderReview,
        Approved,
        Rejected,
        Paid
    }
    
    // ============ STATE VARIABLES ============
    
    uint256 private _subscriptionIds = 0;
    uint256 private _claimIds = 0;
    
    mapping(uint256 => Subscription) public subscriptions;
    mapping(uint256 => Claim) public claims;
    mapping(uint256 => DocumentVerification) public verifications;
    mapping(address => uint256[]) public userSubscriptions;
    mapping(address => uint256[]) public userClaims;
    
    uint256 public totalFunds;
    uint256 public minimumSubscriptionDuration = 30 days;
    uint256 public claimProcessingFee = 0.001 ether;
    
    // ============ EVENTS ============
    
    event SubscriptionCreated(uint256 indexed subscriptionId, address indexed subscriber, uint256 monthlyFee, uint256 coverageLimit);
    event SubscriptionRenewed(uint256 indexed subscriptionId, uint256 newEndDate);
    event SubscriptionCancelled(uint256 indexed subscriptionId);
    event ClaimSubmitted(uint256 indexed claimId, address indexed claimant, uint256 amount);
    event ClaimApproved(uint256 indexed claimId, uint256 amount);
    event ClaimRejected(uint256 indexed claimId, string reason);
    event ClaimPaid(uint256 indexed claimId, uint256 amount);
    event FundsAdded(uint256 amount);
    event FundsWithdrawn(uint256 amount, address indexed recipient);
    
    // ============ MODIFIERS ============
    
    modifier onlyActiveSubscription(uint256 _subscriptionId) {
        require(subscriptions[_subscriptionId].isActive, "Subscription not active");
        require(block.timestamp <= subscriptions[_subscriptionId].endDate, "Subscription expired");
        _;
    }
    
    modifier onlyClaimOwner(uint256 _claimId) {
        require(claims[_claimId].claimant == msg.sender, "Not claim owner");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == owner() || isVerifier(msg.sender), "Not authorized verifier");
        _;
    }
    
    // ============ CONSTRUCTOR ============
    
    constructor() Ownable(msg.sender) {
        _subscriptionIds = 1; // Start from 1
        _claimIds = 1; // Start from 1
    }
    
    // ============ SUBSCRIPTION FUNCTIONS ============
    
    /**
     * @dev Create a new subscription
     * @param _monthlyFee Monthly subscription fee in wei
     * @param _coverageLimit Maximum coverage amount per claim
     * @param _deductible Deductible amount before coverage kicks in
     */
    function createSubscription(
        uint256 _monthlyFee,
        uint256 _coverageLimit,
        uint256 _deductible
    ) external payable {
        require(msg.value >= _monthlyFee, "Insufficient payment");
        require(_coverageLimit > _deductible, "Coverage must exceed deductible");
        
        uint256 subscriptionId = _subscriptionIds;
        _subscriptionIds++;
        
        subscriptions[subscriptionId] = Subscription({
            subscriptionId: subscriptionId,
            subscriber: msg.sender,
            monthlyFee: _monthlyFee,
            coverageLimit: _coverageLimit,
            deductible: _deductible,
            startDate: block.timestamp,
            endDate: block.timestamp + minimumSubscriptionDuration,
            isActive: true
        });
        
        userSubscriptions[msg.sender].push(subscriptionId);
        totalFunds += msg.value;
        
        emit SubscriptionCreated(subscriptionId, msg.sender, _monthlyFee, _coverageLimit);
    }
    
    /**
     * @dev Renew an existing subscription
     * @param _subscriptionId ID of the subscription to renew
     */
    function renewSubscription(uint256 _subscriptionId) external payable onlyActiveSubscription(_subscriptionId) {
        Subscription storage subscription = subscriptions[_subscriptionId];
        require(msg.sender == subscription.subscriber, "Not subscription owner");
        require(msg.value >= subscription.monthlyFee, "Insufficient payment");
        
        subscription.endDate += minimumSubscriptionDuration;
        totalFunds += msg.value;
        
        emit SubscriptionRenewed(_subscriptionId, subscription.endDate);
    }
    
    /**
     * @dev Cancel a subscription
     * @param _subscriptionId ID of the subscription to cancel
     */
    function cancelSubscription(uint256 _subscriptionId) external {
        Subscription storage subscription = subscriptions[_subscriptionId];
        require(msg.sender == subscription.subscriber, "Not subscription owner");
        
        subscription.isActive = false;
        
        emit SubscriptionCancelled(_subscriptionId);
    }
    
    // ============ CLAIM FUNCTIONS ============
    
    /**
     * @dev Submit a new claim for medical reimbursement
     * @param _subscriptionId ID of the subscription
     * @param _amount Claim amount in wei
     * @param _medicalDocumentHash IPFS hash of medical documents
     */
    function submitClaim(
        uint256 _subscriptionId,
        uint256 _amount,
        string calldata _medicalDocumentHash
    ) external payable onlyActiveSubscription(_subscriptionId) nonReentrant {
        require(msg.value >= claimProcessingFee, "Insufficient processing fee");
        
        Subscription storage subscription = subscriptions[_subscriptionId];
        require(msg.sender == subscription.subscriber, "Not subscription owner");
        require(_amount <= subscription.coverageLimit, "Amount exceeds coverage limit");
        require(_amount > subscription.deductible, "Amount below deductible");
        
        uint256 claimId = _claimIds;
        _claimIds++;
        
        claims[claimId] = Claim({
            claimId: claimId,
            claimant: msg.sender,
            subscriptionId: _subscriptionId,
            amount: _amount,
            medicalDocumentHash: _medicalDocumentHash,
            submissionDate: block.timestamp,
            status: ClaimStatus.Pending,
            rejectionReason: ""
        });
        
        userClaims[msg.sender].push(claimId);
        totalFunds += msg.value;
        
        emit ClaimSubmitted(claimId, msg.sender, _amount);
    }
    
    /**
     * @dev Approve a claim and process payment
     * @param _claimId ID of the claim to approve
     * @param _verifiedAmount Verified amount to pay
     */
    function approveClaim(uint256 _claimId, uint256 _verifiedAmount) external onlyVerifier {
        Claim storage claim = claims[_claimId];
        require(claim.status == ClaimStatus.Pending, "Claim not pending");
        require(_verifiedAmount <= claim.amount, "Verified amount exceeds claim amount");
        
        claim.status = ClaimStatus.Approved;
        
        verifications[_claimId] = DocumentVerification({
            claimId: _claimId,
            isVerified: true,
            verifiedAmount: _verifiedAmount,
            verifier: msg.sender,
            verificationDate: block.timestamp
        });
        
        emit ClaimApproved(_claimId, _verifiedAmount);
    }
    
    /**
     * @dev Reject a claim
     * @param _claimId ID of the claim to reject
     * @param _reason Reason for rejection
     */
    function rejectClaim(uint256 _claimId, string calldata _reason) external onlyVerifier {
        Claim storage claim = claims[_claimId];
        require(claim.status == ClaimStatus.Pending, "Claim not pending");
        
        claim.status = ClaimStatus.Rejected;
        claim.rejectionReason = _reason;
        
        emit ClaimRejected(_claimId, _reason);
    }
    
    /**
     * @dev Process payment for approved claim
     * @param _claimId ID of the approved claim
     */
    function processPayment(uint256 _claimId) external onlyVerifier nonReentrant {
        Claim storage claim = claims[_claimId];
        require(claim.status == ClaimStatus.Approved, "Claim not approved");
        
        DocumentVerification storage verification = verifications[_claimId];
        require(verification.isVerified, "Claim not verified");
        
        uint256 payoutAmount = verification.verifiedAmount;
        require(totalFunds >= payoutAmount, "Insufficient funds");
        
        claim.status = ClaimStatus.Paid;
        totalFunds -= payoutAmount;
        
        (bool success, ) = claim.claimant.call{value: payoutAmount}("");
        require(success, "Payment failed");
        
        emit ClaimPaid(_claimId, payoutAmount);
    }
    
    // ============ VIEW FUNCTIONS ============
    
    /**
     * @dev Get user's active subscriptions
     * @param _user Address of the user
     * @return Array of subscription IDs
     */
    function getUserSubscriptions(address _user) external view returns (uint256[] memory) {
        return userSubscriptions[_user];
    }
    
    /**
     * @dev Get user's claims
     * @param _user Address of the user
     * @return Array of claim IDs
     */
    function getUserClaims(address _user) external view returns (uint256[] memory) {
        return userClaims[_user];
    }
    
    /**
     * @dev Check if address is a verifier
     * @param _address Address to check
     * @return True if verifier
     */
    function isVerifier(address _address) public view returns (bool) {
        // For now, only owner is verifier. Can be extended with role-based access
        return _address == owner();
    }
    
    // ============ ADMIN FUNCTIONS ============
    
    /**
     * @dev Update claim processing fee
     * @param _newFee New fee amount
     */
    function updateClaimProcessingFee(uint256 _newFee) external onlyOwner {
        claimProcessingFee = _newFee;
    }
    
    /**
     * @dev Update minimum subscription duration
     * @param _newDuration New duration in seconds
     */
    function updateMinimumSubscriptionDuration(uint256 _newDuration) external onlyOwner {
        minimumSubscriptionDuration = _newDuration;
    }
    
    /**
     * @dev Add funds to the contract
     */
    function addFunds() external payable {
        totalFunds += msg.value;
        emit FundsAdded(msg.value);
    }
    
    /**
     * @dev Withdraw funds from the contract (owner only)
     * @param _amount Amount to withdraw
     * @param _recipient Address to receive the funds
     */
    function withdrawFunds(uint256 _amount, address _recipient) external onlyOwner {
        require(_amount <= totalFunds, "Insufficient funds");
        require(_recipient != address(0), "Invalid recipient");
        
        totalFunds -= _amount;
        
        (bool success, ) = _recipient.call{value: _amount}("");
        require(success, "Withdrawal failed");
        
        emit FundsWithdrawn(_amount, _recipient);
    }
    
    // ============ FALLBACK FUNCTIONS ============
    
    receive() external payable {
        totalFunds += msg.value;
        emit FundsAdded(msg.value);
    }
}
