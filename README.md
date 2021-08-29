1. Create a .env file in the root of the project that looks like this:

```
ALCHEMY_API_KEY=<API_KEY>
PRIVATE_KEY=<PRIVATE_KEY>
```

2. Run the following commands in the project root:

```
$ npm install

$ npx hardhat run scripts/submitProposalTest.js --network hardhat # test on local network
$ npx hardhat run scripts/submitProposal.js --network mainnet # send tx to mainnet
```
