const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MedicalReimbursement", function () {
  let medicalReimbursement;
  let owner;
  let subscriber;
  let verifier;
  let otherAccount;
  
  const monthlyFee = ethers.parseEther("0.01"); // 0.01 ETH
  const coverageLimit = ethers.parseEther("1.0"); // 1.0 ETH
  const deductible = ethers.parseEther("0.1"); // 0.1 ETH
  const claimAmount = ethers.parseEther("0.5"); // 0.5 ETH
  const processingFee = ethers.parseEther("0.001"); // 0.001 ETH

  beforeEach(async function () {
    [owner, subscriber, verifier, otherAccount] = await ethers.getSigners();
    
    const MedicalReimbursement = await ethers.getContractFactory("MedicalReimbursement");
    medicalReimbursement = await MedicalReimbursement.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await medicalReimbursement.owner()).to.equal(owner.address);
    });

    it("Should have correct initial values", async function () {
      expect(await medicalReimbursement.totalFunds()).to.equal(0);
      expect(await medicalReimbursement.claimProcessingFee()).to.equal(processingFee);
      expect(await medicalReimbursement.minimumSubscriptionDuration()).to.equal(30 * 24 * 60 * 60); // 30 days
    });
  });

  describe("Subscription Management", function () {
    it("Should create a subscription with correct parameters", async function () {
      await medicalReimbursement.connect(subscriber).createSubscription(
        monthlyFee,
        coverageLimit,
        deductible,
        { value: monthlyFee }
      );

      const subscription = await medicalReimbursement.subscriptions(1);
      expect(subscription.subscriber).to.equal(subscriber.address);
      expect(subscription.monthlyFee).to.equal(monthlyFee);
      expect(subscription.coverageLimit).to.equal(coverageLimit);
      expect(subscription.deductible).to.equal(deductible);
      expect(subscription.isActive).to.be.true;
    });

    it("Should fail to create subscription with insufficient payment", async function () {
      const insufficientFee = ethers.parseEther("0.005"); // Less than monthlyFee
      
      await expect(
        medicalReimbursement.connect(subscriber).createSubscription(
          monthlyFee,
          coverageLimit,
          deductible,
          { value: insufficientFee }
        )
      ).to.be.revertedWith("Insufficient payment");
    });

    it("Should fail to create subscription with invalid coverage", async function () {
      const invalidDeductible = ethers.parseEther("1.5"); // Higher than coverageLimit
      
      await expect(
        medicalReimbursement.connect(subscriber).createSubscription(
          monthlyFee,
          coverageLimit,
          invalidDeductible,
          { value: monthlyFee }
        )
      ).to.be.revertedWith("Coverage must exceed deductible");
    });

    it("Should renew subscription", async function () {
      await medicalReimbursement.connect(subscriber).createSubscription(
        monthlyFee,
        coverageLimit,
        deductible,
        { value: monthlyFee }
      );

      const initialEndDate = (await medicalReimbursement.subscriptions(1)).endDate;
      
      await medicalReimbursement.connect(subscriber).renewSubscription(1, { value: monthlyFee });
      
      const newEndDate = (await medicalReimbursement.subscriptions(1)).endDate;
      expect(newEndDate).to.be.gt(initialEndDate);
    });

    it("Should cancel subscription", async function () {
      await medicalReimbursement.connect(subscriber).createSubscription(
        monthlyFee,
        coverageLimit,
        deductible,
        { value: monthlyFee }
      );

      await medicalReimbursement.connect(subscriber).cancelSubscription(1);
      
      const subscription = await medicalReimbursement.subscriptions(1);
      expect(subscription.isActive).to.be.false;
    });
  });

  describe("Claim Submission", function () {
    beforeEach(async function () {
      await medicalReimbursement.connect(subscriber).createSubscription(
        monthlyFee,
        coverageLimit,
        deductible,
        { value: monthlyFee }
      );
    });

    it("Should submit a claim successfully", async function () {
      const documentHash = "QmHash123456789";
      
      await medicalReimbursement.connect(subscriber).submitClaim(
        1, // subscriptionId
        claimAmount,
        documentHash,
        { value: processingFee }
      );

      const claim = await medicalReimbursement.claims(1);
      expect(claim.claimant).to.equal(subscriber.address);
      expect(claim.subscriptionId).to.equal(1);
      expect(claim.amount).to.equal(claimAmount);
      expect(claim.medicalDocumentHash).to.equal(documentHash);
      expect(claim.status).to.equal(0); // Pending
    });

    it("Should fail to submit claim with insufficient processing fee", async function () {
      const insufficientFee = ethers.parseEther("0.0005"); // Less than processingFee
      
      await expect(
        medicalReimbursement.connect(subscriber).submitClaim(
          1,
          claimAmount,
          "QmHash123456789",
          { value: insufficientFee }
        )
      ).to.be.revertedWith("Insufficient processing fee");
    });

    it("Should fail to submit claim exceeding coverage limit", async function () {
      const excessiveAmount = ethers.parseEther("2.0"); // Higher than coverageLimit
      
      await expect(
        medicalReimbursement.connect(subscriber).submitClaim(
          1,
          excessiveAmount,
          "QmHash123456789",
          { value: processingFee }
        )
      ).to.be.revertedWith("Amount exceeds coverage limit");
    });

    it("Should fail to submit claim below deductible", async function () {
      const lowAmount = ethers.parseEther("0.05"); // Lower than deductible
      
      await expect(
        medicalReimbursement.connect(subscriber).submitClaim(
          1,
          lowAmount,
          "QmHash123456789",
          { value: processingFee }
        )
      ).to.be.revertedWith("Amount below deductible");
    });
  });

  describe("Claim Processing", function () {
    beforeEach(async function () {
      await medicalReimbursement.connect(subscriber).createSubscription(
        monthlyFee,
        coverageLimit,
        deductible,
        { value: monthlyFee }
      );

      await medicalReimbursement.connect(subscriber).submitClaim(
        1,
        claimAmount,
        "QmHash123456789",
        { value: processingFee }
      );
    });

    it("Should approve claim by verifier", async function () {
      const verifiedAmount = ethers.parseEther("0.4"); // Less than claimAmount
      
      await medicalReimbursement.connect(owner).approveClaim(1, verifiedAmount);
      
      const claim = await medicalReimbursement.claims(1);
      expect(claim.status).to.equal(2); // Approved
      
      const verification = await medicalReimbursement.verifications(1);
      expect(verification.isVerified).to.be.true;
      expect(verification.verifiedAmount).to.equal(verifiedAmount);
    });

    it("Should reject claim by verifier", async function () {
      const rejectionReason = "Insufficient documentation";
      
      await medicalReimbursement.connect(owner).rejectClaim(1, rejectionReason);
      
      const claim = await medicalReimbursement.claims(1);
      expect(claim.status).to.equal(3); // Rejected
      expect(claim.rejectionReason).to.equal(rejectionReason);
    });

    it("Should fail to approve claim by non-verifier", async function () {
      await expect(
        medicalReimbursement.connect(otherAccount).approveClaim(1, claimAmount)
      ).to.be.revertedWith("Not authorized verifier");
    });

    it("Should process payment for approved claim", async function () {
      const verifiedAmount = ethers.parseEther("0.4");
      
      // Add funds to contract
      await medicalReimbursement.connect(owner).addFunds({ value: ethers.parseEther("1.0") });
      
      // Approve claim
      await medicalReimbursement.connect(owner).approveClaim(1, verifiedAmount);
      
      // Process payment
      const initialBalance = await ethers.provider.getBalance(subscriber.address);
      await medicalReimbursement.connect(owner).processPayment(1);
      
      const finalBalance = await ethers.provider.getBalance(subscriber.address);
      expect(finalBalance).to.be.gt(initialBalance);
      
      const claim = await medicalReimbursement.claims(1);
      expect(claim.status).to.equal(4); // Paid
    });
  });

  describe("Admin Functions", function () {
    it("Should allow owner to add funds", async function () {
      const amount = ethers.parseEther("1.0");
      
      await medicalReimbursement.connect(owner).addFunds({ value: amount });
      
      expect(await medicalReimbursement.totalFunds()).to.equal(amount);
    });

    it("Should allow owner to withdraw funds", async function () {
      const amount = ethers.parseEther("1.0");
      
      await medicalReimbursement.connect(owner).addFunds({ value: amount });
      await medicalReimbursement.connect(owner).withdrawFunds(amount, otherAccount.address);
      
      expect(await medicalReimbursement.totalFunds()).to.equal(0);
    });

    it("Should fail to withdraw funds by non-owner", async function () {
      await expect(
        medicalReimbursement.connect(otherAccount).withdrawFunds(
          ethers.parseEther("1.0"),
          otherAccount.address
        )
      ).to.be.revertedWithCustomError(medicalReimbursement, "OwnableUnauthorizedAccount");
    });

    it("Should allow owner to update processing fee", async function () {
      const newFee = ethers.parseEther("0.002");
      
      await medicalReimbursement.connect(owner).updateClaimProcessingFee(newFee);
      
      expect(await medicalReimbursement.claimProcessingFee()).to.equal(newFee);
    });
  });

  describe("View Functions", function () {
    beforeEach(async function () {
      await medicalReimbursement.connect(subscriber).createSubscription(
        monthlyFee,
        coverageLimit,
        deductible,
        { value: monthlyFee }
      );

      await medicalReimbursement.connect(subscriber).submitClaim(
        1,
        claimAmount,
        "QmHash123456789",
        { value: processingFee }
      );
    });

    it("Should return user subscriptions", async function () {
      const userSubs = await medicalReimbursement.getUserSubscriptions(subscriber.address);
      expect(userSubs).to.have.lengthOf(1);
      expect(userSubs[0]).to.equal(1);
    });

    it("Should return user claims", async function () {
      const userClaims = await medicalReimbursement.getUserClaims(subscriber.address);
      expect(userClaims).to.have.lengthOf(1);
      expect(userClaims[0]).to.equal(1);
    });
  });
});
