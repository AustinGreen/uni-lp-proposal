const hre = require('hardhat')
const incentiveParams = require('../utils/incentiveParams')

async function main() {
  // Transfer ETH to proposer's address
  const [owner] = await ethers.getSigners()
  const proposalAddress = '0x2b1ad6184a6b0fac06bd225ed37c2abc04415ff4'
  const stakerAddress = '0x1f98407aaB862CdDeF78Ed252D6f557aA5b0f00d'

  const tx = {
    to: proposalAddress,
    value: ethers.utils.parseEther('1.0'),
  }

  await owner.sendTransaction(tx)

  // Impersonate address that has enough UNI to submit proposals
  await hre.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [proposalAddress],
  })
  const signer = await ethers.getSigner(proposalAddress)

  // Generate calldata for proposal
  const uniStakerAbi = [
    'function createIncentive((address rewardToken, address pool, uint256 startTime, uint256 endTime, address refundee) key, uint256 reward)',
    'function multicall(bytes[] data)',
  ]

  const uniTokenAbi = ['function approve(address spender, uint rawAmount) returns (bool)']

  let uniTokenIface = new ethers.utils.Interface(uniTokenAbi)
  let iface = new ethers.utils.Interface(uniStakerAbi)

  const approveParams = uniTokenIface.encodeFunctionData('approve', [stakerAddress, ethers.constants.MaxUint256])
  const callDataParams = [
    approveParams,
    ...incentiveParams.map((params) => iface.encodeFunctionData('createIncentive', params)),
  ]
  console.log([callDataParams])
  const calldata = iface.encodeFunctionData('multicall', [callDataParams])

  // Get uniswap governance contract
  const uniGovAbi = [
    'function propose(address[] targets, uint[] values, string[] signatures, bytes[] calldatas, string description) returns (uint)',
  ]
  const uniswapGovernance = await ethers.getContractAt(uniGovAbi, '0x5e4be8bc9637f0eaa1a755019e06a68ce081d58f', signer)

  // Create proposal
  const proposeTx = await uniswapGovernance.propose(
    ['0x1f98407aaB862CdDeF78Ed252D6f557aA5b0f00d'],
    [0],
    ['multicall(bytes[])'],
    [calldata],
    '# Uniswap LP Program'
  )

  await proposeTx.wait()

  console.log(proposeTx)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
