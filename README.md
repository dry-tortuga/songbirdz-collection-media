# songbirdz-collection-media
This repo holds all the media (audio, images, metadata) for the Songbirdz collection.

## Verifying the media
To run the media verification script:

1. Install Node.js if you don't have it
   - Download from [nodejs.org](https://nodejs.org)
   - Verify installation with `node -v`

2. Install dependencies:
```bash
npm install
```

3. Run the verify script:
```bash
node verifyMedia.js
```

This will check that all media files match the merkle tree in the solidity contract on Base and report any discrepancies.
