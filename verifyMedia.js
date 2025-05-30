const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const ethers = require("ethers");
const fs = require("fs");
const path = require("path");

const COLLECTION_SIZE = 1000;

const COLLECTIONS_TO_VERIFY = [
	{
		name: "0-picasso-genesis",
		number: 0,
		merkleTreeRoot: "0x5eb5e6c29aeeeca6d18591b5857bb3732385b031b324a4a7e5ce0d93be4f2b96",
	},
	{
		name: "1-deep-blue",
		number: 1,
		merkleTreeRoot: "0x0fd31aa0cf9ce48e13dd99ecda792226242ce7c5e98bf99fc19c124f815b67db",
	},
	{
		name: "2-small-and-mighty",
		number: 2,
		merkleTreeRoot: "0xa0f7b9e7f1e8429b619ed5656b695085e10244be698636097f519ea4e789777e",
	},
	{
		name: "3-night-and-day",
		number: 3,
		merkleTreeRoot: "0xc5a013e8cdd4cdeb9179693293f7aca4047af04aa941dacf12a5347fc0b09477",
	},
	{
		name: "4-fire-and-ice",
		number: 4,
		merkleTreeRoot: "0x7d91627265e4a50df86e7b074cab652f298ab617b65c1f0a3a149aa786a1d504",
	},
	{
		name: "5-predator-and-prey",
		number: 5,
		merkleTreeRoot: "0xa28dd33ab13f6eaf5f28a9d444ed2b9ae3fd3be437babede46ed9266e9e7b82c",
	},
	{
		name: "6-love-birds",
		number: 6,
		merkleTreeRoot: "0x1119ce5125d4ccc90d4d8a21139b87ec4e168c711b68e90772537a0a5cd40a7e"
	},
	{
		name: "7-hatchlings",
		number: 7,
		merkleTreeRoot: "0xda2070ef627da6f6395a1a7c08cd115d7d2d0aa83456cf90d2cc52077e2bb36f"
	},
	{
		name: "8-masters-of-disguise",
		number: 8,
		merkleTreeRoot: "0x96931597d1e46bf69bad810d9aba52eb71b2353cb1451ba6c2823632c0116572"
	},
];

(() => {

	let numMediaValidated = 0;

	for (let i = 0; i < COLLECTIONS_TO_VERIFY.length; i++) {

		const collection = COLLECTIONS_TO_VERIFY[i];

		console.log(
			`---- Verifying media for the ${collection.name} collection ----`,
		);

		// Load the merkle tree

		const merkleTree = StandardMerkleTree.load(
			JSON.parse(fs.readFileSync(`./${collection.name}/tree.json`, "utf8")),
		);

		console.log("Merkle Root:", merkleTree.root);

		if (merkleTree.root !== collection.merkleTreeRoot) {
			throw new Error(
				`Invalid value=${merkleTree.root} for the merkle tree root!`,
			);
		}

		// Load the species names for the collection
		const speciesNames = fs
			.readFileSync(`./${collection.name}/key.txt`, "utf8")
			.split(/\r?\n/);

		for (let j = 0; j < COLLECTION_SIZE; j++) {

			// Get the unique ID of the bird relative to the entire 10000
			const birdId = i * COLLECTION_SIZE + j;

			const name = speciesNames[j];

			// Load the audio file for the bird
			const audioFile = fs.readFileSync(
				`./${collection.name}/audio/${birdId}.mp3`,
			);

			// Load the image file for the bird
			const imageFile = fs.readFileSync(
				`./${collection.name}/images-hidden/${birdId}.jpg`,
			);

			// Generate hash values for the species name, audio file, and image file

			const speciesHash = ethers.keccak256(ethers.toUtf8Bytes(name));

			const audioFileBytes = new Uint8Array(audioFile);
			const audioHash = ethers.keccak256(audioFileBytes);

			const imageFileBytes = new Uint8Array(imageFile);
			const imageHash = ethers.keccak256(imageFileBytes);

			console.log(
				`${birdId}: species=${name}, audio=${audioFileBytes.length}, image=${imageFileBytes.length}`,
			);

			// Check for a leaf in the merkle tree matching the hash value
			// for the bird's species, audio, and image

			let speciesProof = false,
			audioProof = false,
			imageProof = false;

			for (const [i, v] of merkleTree.entries()) {

				if (v[0] === speciesHash && v[1] === `${birdId}-species`) {
					speciesProof = true;
				} else if (v[0] === audioHash && v[1] === `${birdId}-audio`) {
					audioProof = true;
				} else if (v[0] === imageHash && v[1] === `${birdId}-image`) {
					imageProof = true;
				}

			}

			if (!speciesProof) {
				throw new Error(
					`Missing "species" leaf in merkle tree for birdId=${birdId}!`,
				);
			}

			if (!audioProof) {
				throw new Error(
					`Missing "audio" leaf in merkle tree for birdId=${birdId}!`,
				);
			}

			if (!imageProof) {
				throw new Error(
					`Missing "image" leaf in merkle tree for birdId=${birdId}!`,
				);
			}

			numMediaValidated += 3;

		}

		console.log("--------------------------------------------------");

	}

	if (
		numMediaValidated !==
		COLLECTION_SIZE * COLLECTIONS_TO_VERIFY.length * 3
	) {

		throw new Error(
			`Invalid number of media items validated for all the collections!`,
		);

	} else {
		console.log("------------- ALL DONE :) ----------------------");
	}

})();
