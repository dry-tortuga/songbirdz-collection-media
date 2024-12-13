# songbirdz-collection-media
This repo holds all the media (audio, images, metadata) for the Songbirdz collection.

The media is also stored in IPFS:
- Audio & Images for the first 5,000 birds: `bafybeigpzmrjda2b3bl3wja6whj7dfxwd4zjkqo23jtg6n4rrfroh2c3eq`

The `./points` folder stores JSON files containing the point logs awarded during Season 1 and Season 2.

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
