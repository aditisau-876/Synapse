// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * Stores only an audit-root commitment.
 * NEVER put message text, keys, phone numbers, emails, or files on-chain.
 * A backend/operator can periodically anchor its off-chain hash-chain root.
 */
contract SynapseAuditAnchor {
    address public immutable owner;
    bytes32 public latestRoot;
    uint64 public latestTimestamp;

    event RootAnchored(bytes32 indexed root, uint64 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function anchor(bytes32 root) external onlyOwner {
        latestRoot = root;
        latestTimestamp = uint64(block.timestamp);
        emit RootAnchored(root, latestTimestamp);
    }
}
