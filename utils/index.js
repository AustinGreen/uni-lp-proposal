const hre = require('hardhat')

const addresses = {
  uniToken: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  uniTimelock: '0x1a9C8182C09F50C8318d769245beA52c32BE35BC',
  uniStaker: '0x1f98407aaB862CdDeF78Ed252D6f557aA5b0f00d',
  uniGov: '0x5e4be8bc9637f0eaa1a755019e06a68ce081d58f',
}

const threeMonthsInSeconds = 7776000
const startTime = 1630454400
const endTime = startTime + threeMonthsInSeconds

const stableIncentiveReward = ethers.utils.parseEther('62313')
const defiIncentiveReward = ethers.utils.parseEther('124626.122')
const receiptIncentiveReward = ethers.utils.parseEther('5340.6')

// Incentivized pool addresses
const daiUsdcPool = '0x6c6bc977e13df9b0de53b251522280bb72383700'
const usdcUsdtPool = '0x7858e59e0c01ea06df3af3d20ac7b0003275d4bf'
const daiUsdtPool = '0x6f48eca74b38d2936b02ab603ff4e36a6c0e3a77'
const wethLinkPool = '0xa6cc3c2531fdaa6ae1a3ca84c2855806728693e8'
const wethYfiPool = '0x04916039b1f59d9745bf6e0a21f191d1e0a84287'
const wethMkrPool = '0xe8c6c9227491c0a8156a0106a0204d881bb7e531'
const wethAavePool = '0x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb'
const wethCompPool = '0xea4ba4ce14fdd287f380b55419b1c5b6c3f22ab6'
const cdaiDaiPool = '0x53c0d552ea40055aa0311ad7bbe12152b65e8f41'
const wstethWethPool = '0xd340b57aacdd10f96fc1cf10e15921936f41e29c'
const usdcPcusdcPool = '0xc2e9213fe0aaf5ee55e4bbe665935c2df94af13d'

const incentiveParams = [
  [
    {
      rewardToken: addresses.uniToken,
      pool: daiUsdcPool,
      startTime,
      endTime,
      refundee: addresses.uniTimelock,
    },
    stableIncentiveReward,
  ],
  [
    {
      rewardToken: addresses.uniToken,
      pool: usdcUsdtPool,
      startTime,
      endTime,
      refundee: addresses.uniTimelock,
    },
    stableIncentiveReward,
  ],
  [
    {
      rewardToken: addresses.uniToken,
      pool: daiUsdtPool,
      startTime,
      endTime,
      refundee: addresses.uniTimelock,
    },
    stableIncentiveReward,
  ],
  [
    {
      rewardToken: addresses.uniToken,
      pool: wethLinkPool,
      startTime,
      endTime,
      refundee: addresses.uniTimelock,
    },
    defiIncentiveReward,
  ],
  [
    {
      rewardToken: addresses.uniToken,
      pool: wethYfiPool,
      startTime,
      endTime,
      refundee: addresses.uniTimelock,
    },
    defiIncentiveReward,
  ],
  [
    {
      rewardToken: addresses.uniToken,
      pool: wethMkrPool,
      startTime,
      endTime,
      refundee: addresses.uniTimelock,
    },
    defiIncentiveReward,
  ],
  [
    {
      rewardToken: addresses.uniToken,
      pool: wethAavePool,
      startTime,
      endTime,
      refundee: addresses.uniTimelock,
    },
    defiIncentiveReward,
  ],
  [
    {
      rewardToken: addresses.uniToken,
      pool: wethCompPool,
      startTime,
      endTime,
      refundee: addresses.uniTimelock,
    },
    defiIncentiveReward,
  ],
  [
    {
      rewardToken: addresses.uniToken,
      pool: cdaiDaiPool,
      startTime,
      endTime,
      refundee: addresses.uniTimelock,
    },
    receiptIncentiveReward,
  ],
  [
    {
      rewardToken: addresses.uniToken,
      pool: wstethWethPool,
      startTime,
      endTime,
      refundee: addresses.uniTimelock,
    },
    receiptIncentiveReward,
  ],
  [
    {
      rewardToken: addresses.uniToken,
      pool: usdcPcusdcPool,
      startTime,
      endTime,
      refundee: addresses.uniTimelock,
    },
    receiptIncentiveReward,
  ],
]

const proposalDescription = `# Proposal: Uniswap Liquidity Program (ULP)

### Authors: Jon Itzler ([Variant](https://variant.fund/)), Shreyas Hariharan and AG ([Llama](https://www.llama.xyz/))

### Summary:

This proposal outlines a framework for establishing a liquidity incentives program (Uniswap Liquidity Program, ULP) with the goals of: accelerating the migration of liquidity to Uniswap v3; encouraging new market participants to experiment with liquidity provision, further distributing ownership of UNI tokens, and supporting ecosystem growth over the long-term.

We propose the program start with an initial maximum budget of 1.662m UNI, to be allocated as liquidity incentives across two quarters. Continuation of the program will require an additional governance vote. Upon renewal of the program, each of the three initiatives can be broken out into separate proposals.

The program will aim to bootstrap liquidity across three different initiatives:
* Stablecoin pairs
* Mid-tail pairs (e.g DeFi governance tokens)
* Deposit receipt tokens (i.e. cTokens, aTokens)
Similarly to the Uniswap Grants Program (UGP), pair selection is a subjective process that cannot be easily automated: any action requires close monitoring and frequent reporting to the Uniswap community. To this end, we propose a discretionary committee of 8 members — 5 core members from LlamaDAO to actively lead & manage the committee, as well 3 members for oversight. Find LlamaDAO’s full proposal & management plan detailed [here](https://docs.google.com/document/d/16pRfAbSvmU-A7oTlsQEHFPtSSRt1z21cIQaapGl6gWg/edit). 

The committee structure allows for incentives to be allocated efficiently across many pairs without requiring a full governance vote on each pair selection. However, Uniswap governance retains ultimate oversight by granting a budget on a bi-quarterly basis.  

### Purpose & Background:

While Uniswap v3 has quickly emerged as the market leading DEX, we believe that it has yet to reach its full potential. In particular, large amounts of liquidity remain locked in Uniswap v2, and a majority of v2 LPs have yet to migrate over the v3.

Liquidity incentive programs have seen varying degrees of success. In Uniswap’s case, the initial liquidity incentive program between September—November 2020 was met with considerable interest: 

* Protocol liquidity quickly increased from ~$750M in the week preceding the program to ~$3B at peak.
* The number of individual addresses holding more than 0 LP tokens increased by ~75% from ~33,500 to ~59,000. 
* The unique UNI token holder base grew by 14% over the course of 2 months. 

A contributing factor here is that Uniswap v2 has an organic user-base, which drives organic swap yields to LPs. 

We expect and hope that a liquidity incentives program on Uniswap v3 would succeed in increasing wider LP participation, liquidity across sought-after pairs, UNI distribution, and swap volume. Importantly, due to v3’s Concentrated Liquidity feature, Uniswap governance can afford to pay significantly lower reward rates than previous liquidity mining programs to achieve similar market depth. 

### Quarterly Budget:

* Max quarterly budget of up to 826,091 UNI across all initiatives to start
* In addition to the quarterly budget, LlamaDAO (core committee members) is to be collectively compensated at a rate of $150 per hour up to 30 hours a week. Each month, oversight members will be responsible for calculating exchange rate from UNI to USD and appropriate payouts (estimated at ~2917 UNI per quarter), with payments being made in UNI.
* Oversight members will be compensated at a rate of 300 UNI per quarter.

### Pair Selection Committee:

* 5 core committee members, composed of LlamaDAO team members for the first term, as well as 3 oversight committee members. 
* Each committee has a term of 2 quarters (6 months) after which the program and members need to be renewed by UNI governance.
* Committee functions as a 5 of 6 multi-sig, with 3 members of LlamaDAO and 3 members from the oversight committee.
* Committee to share a weekly report detailing the decision making process (using a standard template) and periodic updates detailing the successes and failures of the program.

## Committee Members:

Committee member criteria include:

* Credibly neutral — need to avoid any sense of conflict of interest
* Ability to evaluate fundamental strengths of projects and their place in the ecosystem  
* Data driven — capable of assessing quantitative merits/growth signals 

Committee members must recuse themselves from any ULP decision related to a project they hold an investment in or are otherwise related to. 

Core Committee Members (LlamaDAO): 

* [AG](https://twitter.com/verto0912): project management and evaluation
* [Shreyas Hariharan](https://twitter.com/HelloShreyas): project management, coordinate with Uniswap governance and stakeholders
* [Mason](https://twitter.com/summmason): project management, create progress reports on ULP, coordinate with projects
* [Austin Green](https://twitter.com/AustinGreen): technical and security expertise
* [Michael Silberling](https://twitter.com/MSilb7): create Dune Analytics dashboards that help us monitor the effectiveness of the liquidity program and enable us make changes when needed 

Oversight Committee Members:

* [Eva Beylin](https://twitter.com/evabeylin), Graph Protocol
* [Jon Itzler](https://twitter.com/jonitzler), Variant Fund
* [Arr00](https://twitter.com/Arr00c), Core Compound community contributor

### Implementation:

UNI is distributed to LPs that provide in-range liquidity, with those that concentrate their liquidity closer to the market price (i.e. higher virtual liquidity) receiving larger allocations. 

https://github.com/Uniswap/uniswap-v3-staker/releases/tag/v1.0.0

### Initial Proposed Reward Distribution Across Initiatives: 

*Stablecoin pairs*

We suggest an initial stablecoin/stablecoin liquidity mining program over the course of the next three months conservatively targeting $250m in each of the following pools: 

* USDC/DAI [0.05% fee tier]
* USDC/USDT [0.05% fee tier]
* DAI/USDT [0.05% fee tier]

A reward rate of 2% APY feels like an appropriate target for stablecoin/stablecoin pools as v3 stablecoin/stablecoin pools are already generating organic yields in-line with money market protocols. 

Based on a 30D moving average UNI price, the committee would distribute **741.82 UNI per day** to each of the three pools listed above for a total of **186,939 UNI** across all three pools over the next quarter.

*Mid-tail pairs*

We suggest an initial mid-tail pair liquidity mining program over the course of the next quarter. We are conservatively targeting $100m in each of the following pools:

* LINK/ETH [0.30% fee tier]
* YFI/ETH  [0.30% fee tier]
* MKR/ETH  [0.30% fee tier]
* AAVE/ETH  [0.30% fee tier]
* COMP/ETH  [0.30% fee tier]

A reward rate of 10% APY feels appropriate for mid-tail pair pools. Compared to stablecoin/stablecoin pools, LPs in mid-tail pairs must bear more price risk. 

Based on the 30D moving average UNI price, the committee would distribute **1,483.64 UNI per day** to each of the five pools listed above for a total of **623,130.61 UNI** across all five pools over the next quarter.

*Deposit Receipt Tokens (DRT)*

We suggest an initial DRT liquidity mining program over the course of the next quarter. Due to Uniswap’s brand recognition and gas optimized contracts, deeply liquid DRT pools may serve as an effective alternative distribution channel for yield-generating platforms. We are conservatively targeting $10m in each of the following pools: 

* DAI/cDAI [0.05% fee tier] [Compound]
* ETH/wstETH [0.05% fee tier] [Lido]
* USDC/PcUSDC [0.05% fee tier] [PoolTogether]
 
As with stablecoin/stablecoin pools, LPs in DRT pairs take on minimal price risk. Additionally, they earn passive yield by maintaining inventories of yield-bearing assets. A reward rate of 4% feels appropriate.

Based on the 30D moving average UNI price, the committee would distribute **59.34 UNI per day** to each of the three pools listed above for a total of **16,021.8 UNI** across all three pools over the next quarter.

### Conclusion:

We recommend the establishment of a Uniswap Liquidity Program (ULP), which will actively incentivize liquidity across three strategic categories:

* Stablecoin/stablecoin pairs 
* Mid-tail pairs 
* Depositary receipt pairs 

ULP will exist as a 8-person committee with 5 core members, where core committee members are tasked with closely monitoring the success of ongoing programs and frequently updating the Uniswap community via regular written reports. The 3 oversight members are responsible for monitoring the core committee and multisig signing.

We believe that the targeted nature of ULP’s proposals coupled with Uniswap’s organic user base will help achieve various objectives: wider LP participation, more liquidity across sought-after pairs, further UNI distribution, and increasing swap volume.`

module.exports = { incentiveParams, proposalDescription, addresses }
