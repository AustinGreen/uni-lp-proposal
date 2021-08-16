const hre = require('hardhat')
const { incentiveParams, proposalDescription } = require('../utils/index')

async function main() {
  // Transfer ETH to proposer's address
  const [owner] = await ethers.getSigners()
  const totalLpAmount = '826091.41'
  const stakerAddress = '0x1f98407aaB862CdDeF78Ed252D6f557aA5b0f00d'
  const uniGovAddress = '0x5e4be8bc9637f0eaa1a755019e06a68ce081d58f'

  // Generate calldata for proposal
  const uniStakerAbi = [
    'function createIncentive((address rewardToken, address pool, uint256 startTime, uint256 endTime, address refundee) key, uint256 reward)',
    'function multicall(bytes[] data)',
  ]

  const uniTokenAbi = ['function approve(address spender, uint rawAmount) returns (bool)']

  let uniTokenIface = new ethers.utils.Interface(uniTokenAbi)
  let iface = new ethers.utils.Interface(uniStakerAbi)

  const approveParams = uniTokenIface.encodeFunctionData('approve', [
    stakerAddress,
    ethers.utils.parseEther(totalLpAmount),
  ])
  const callDataParams = [
    approveParams,
    ...incentiveParams.map((params) => iface.encodeFunctionData('createIncentive', params)),
  ]

  const calldata = iface.encodeFunctionData('multicall', [callDataParams])

  // Get uniswap governance contract
  const uniGovAbi = [
    'function propose(address[] targets, uint[] values, string[] signatures, bytes[] calldatas, string description) returns (uint)',
  ]
  const uniswapGovernance = await ethers.getContractAt(uniGovAbi, uniGovAddress, owner)

  // Create proposal
  const proposeTx = await uniswapGovernance.propose(
    [stakerAddress],
    [0],
    ['multicall(bytes[])'],
    [calldata],
    proposalDescription
  )

  await proposeTx.wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
