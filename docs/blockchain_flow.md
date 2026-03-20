# Blockchain Verification Flow

1. The article content is hashed with SHA-256.
2. The backend associates the hash with prediction metadata.
3. The hash can be written to `NewsVerify.sol`.
4. The frontend verify page checks whether the supplied hash exists in the ledger.
5. Readers receive a clear verified / not found response before sharing a story.

