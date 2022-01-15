SWC-103 Floating Pragma

- Using Specific Compiler Pragma in Transport.sol.

SWC-119 Shadowing State Variables

- Storage variable layouts are reviewed and any naming ambiguities are removed, e.g. driverId

SWC-131 Presence of Unused variables

- The contract is checked to ensure no unused variables are present, except the (bytes memory data) for the sendPayment function, which was copied from https://solidity-by-example.org/sending-ether/ , so it was assumed this is safe.
