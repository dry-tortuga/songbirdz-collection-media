# songbirdz-collection-media
This repo holds all the media (audio, images, metadata) for the Songbirdz collection.

The media is also stored in IPFS:
- [0-picasso-genesis](https://gateway.lighthouse.storage/ipfs/bafybeia473yopibtibi5zmw7jdc5b7wus65vdhlfmjo4w3wtup4in6wx4y)
- [1-deep-blue](https://gateway.lighthouse.storage/ipfs/bafybeicp54cdtogn4tbtxxrpof5oi7pgjkt63n63arf45db55ckpo2awhe)
- [2-small-and-mighty](https://gateway.lighthouse.storage/ipfs/bafybeieq52obxbsw2fyxqk3u76bvkzv47oeox2dshl74ua65svgo4iaxtm)
- [3-night-and-day](https://gateway.lighthouse.storage/ipfs/bafybeicskvnce4dcw3qcs352yr2dmi656vwafimm2olybkdicozkylveza)
- [4-fire-and-ice](https://gateway.lighthouse.storage/ipfs/bafybeihzpowaivvuxvqmah3auusozc5afeiyfdhmdp5iefsbb3leimm3ge)
- [5-predator-and-prey](https://gateway.lighthouse.storage/ipfs/bafybeicwqk2bcgpfojh63o4txc5jezkj6oobqcmnu6he5uueh26lfd7w6u)
- [6-love-birds](https://gateway.lighthouse.storage/ipfs/bafybeibeegccbcxn3ofyor7yn6poodfc3tu2vhd3v6dtpxoqav4n33j5uq)
- [7-hatchlings](https://gateway.lighthouse.storage/ipfs/bafybeiecvcrprcqhssunvhwadcg7eztqlnxwek7czsvnkezozqyoz6mydm)
- [8-masters-of-disguise](https://gateway.lighthouse.storage/ipfs/bafybeigrv7kzq352xto7eptiowppuan2gmqr4tdlg37qf2lpuijbfluv3u)

2. Install dependencies:
```bash
npm install
```

3. Run the verify script:
```bash
node verifyMedia.js
```

This will check that all media files match the merkle tree in the solidity contract on Base and report any discrepancies.
