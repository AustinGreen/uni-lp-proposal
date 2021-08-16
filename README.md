1. Create a .env file in the root of the project that looks like this:

```
ALCHEMY_API_KEY=<API_KEY>
PRIVATE_KEY=<PRIVATE_KEY>
ALCHEMY_ROPSTEN_API_KEY=<API_KEY>
ROPSTEN_PRIVATE_KEY=<ROPSTEN_PRIVATE_KEY>
```

2. Run the following commands in the project root:

```
$ npm install

$ npx hardhat run scripts/submitProposal.js --network hardhat # submit to local network
$ npx hardhat run scripts/submitProposal.js --network ropsten # submit to ropsten testnet
$ npx hardhat run scripts/submitProposal.js --network mainnet # submit to mainnet
```
