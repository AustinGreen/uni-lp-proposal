const hre = require('hardhat')
const { incentiveParams, proposalDescription, addresses } = require('../utils/index')

async function main() {
  const [owner] = await ethers.getSigners()
  const totalLpAmount = incentiveParams.reduce((acc, curr, i) => (i === 1 ? acc[1].add(curr[1]) : acc.add(curr[1])))

  // Generate calldata for proposal
  const uniStakerAbi = [
    'function createIncentive((address rewardToken, address pool, uint256 startTime, uint256 endTime, address refundee) key, uint256 reward)',
    'function multicall(bytes[] data)',
  ]

  const uniTokenAbi = ['function approve(address spender, uint rawAmount) returns (bool)']

  let uniTokenIface = new ethers.utils.Interface(uniTokenAbi)
  let iface = new ethers.utils.Interface(uniStakerAbi)

  const approveCalldata = uniTokenIface.encodeFunctionData('approve', [addresses.uniStaker, totalLpAmount])

  const calldata = iface.encodeFunctionData('multicall', [
    incentiveParams.map((params) => iface.encodeFunctionData('createIncentive', params)),
  ])

  // Get uniswap governance contract
  const uniGovAbi = [
    'function propose(address[] targets, uint[] values, string[] signatures, bytes[] calldatas, string description) returns (uint)',
  ]
  const uniswapGovernance = await ethers.getContractAt(uniGovAbi, addresses.uniGov, owner)

  // Create proposal
  const proposeTx = await uniswapGovernance.propose(
    [addresses.uniToken, addresses.uniStaker],
    [0, 0],
    ['approve(address,uint)', 'multicall(bytes[])'],
    [approveCalldata, calldata],
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
