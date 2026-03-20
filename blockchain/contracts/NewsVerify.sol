// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract NewsVerify {
    struct VerificationRecord {
        bytes32 contentHash;
        string prediction;
        uint256 credibilityScore;
        uint256 timestamp;
        address publisher;
    }

    mapping(bytes32 => VerificationRecord) public records;

    event NewsStored(
        bytes32 indexed contentHash,
        string prediction,
        uint256 credibilityScore,
        uint256 timestamp,
        address publisher
    );

    function storeNewsHash(
        bytes32 contentHash,
        string calldata prediction,
        uint256 credibilityScore
    ) external {
        require(records[contentHash].timestamp == 0, "Hash already stored");

        records[contentHash] = VerificationRecord({
            contentHash: contentHash,
            prediction: prediction,
            credibilityScore: credibilityScore,
            timestamp: block.timestamp,
            publisher: msg.sender
        });

        emit NewsStored(contentHash, prediction, credibilityScore, block.timestamp, msg.sender);
    }

    function verifyNewsHash(bytes32 contentHash) external view returns (bool) {
        return records[contentHash].timestamp != 0;
    }

    function getRecord(bytes32 contentHash) external view returns (VerificationRecord memory) {
        require(records[contentHash].timestamp != 0, "Hash not found");
        return records[contentHash];
    }
}

