const hre = require('hardhat')

const uniTokenAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
const uniTimelockAddress = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC'
const startTime = 1630458000
const endTime = 1638320400

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
      rewardToken: uniTokenAddress,
      pool: daiUsdcPool,
      startTime,
      endTime,
      refundee: uniTimelockAddress,
    },
    stableIncentiveReward,
  ],
  [
    {
      rewardToken: uniTokenAddress,
      pool: usdcUsdtPool,
      startTime,
      endTime,
      refundee: uniTimelockAddress,
    },
    stableIncentiveReward,
  ],
  [
    {
      rewardToken: uniTokenAddress,
      pool: daiUsdtPool,
      startTime,
      endTime,
      refundee: uniTimelockAddress,
    },
    stableIncentiveReward,
  ],
  [
    {
      rewardToken: uniTokenAddress,
      pool: wethLinkPool,
      startTime,
      endTime,
      refundee: uniTimelockAddress,
    },
    defiIncentiveReward,
  ],
  [
    {
      rewardToken: uniTokenAddress,
      pool: wethYfiPool,
      startTime,
      endTime,
      refundee: uniTimelockAddress,
    },
    defiIncentiveReward,
  ],
  [
    {
      rewardToken: uniTokenAddress,
      pool: wethMkrPool,
      startTime,
      endTime,
      refundee: uniTimelockAddress,
    },
    defiIncentiveReward,
  ],
  [
    {
      rewardToken: uniTokenAddress,
      pool: wethAavePool,
      startTime,
      endTime,
      refundee: uniTimelockAddress,
    },
    defiIncentiveReward,
  ],
  [
    {
      rewardToken: uniTokenAddress,
      pool: wethCompPool,
      startTime,
      endTime,
      refundee: uniTimelockAddress,
    },
    defiIncentiveReward,
  ],
  [
    {
      rewardToken: uniTokenAddress,
      pool: cdaiDaiPool,
      startTime,
      endTime,
      refundee: uniTimelockAddress,
    },
    receiptIncentiveReward,
  ],
  [
    {
      rewardToken: uniTokenAddress,
      pool: wstethWethPool,
      startTime,
      endTime,
      refundee: uniTimelockAddress,
    },
    receiptIncentiveReward,
  ],
  [
    {
      rewardToken: uniTokenAddress,
      pool: usdcPcusdcPool,
      startTime,
      endTime,
      refundee: uniTimelockAddress,
    },
    receiptIncentiveReward,
  ],
]

module.exports = incentiveParams
