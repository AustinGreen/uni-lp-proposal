const hre = require('hardhat')
const { incentiveParams, proposalDescription, addresses } = require('../utils/index')

async function main() {
  const [owner] = await ethers.getSigners()
  const totalLpAmount = incentiveParams.reduce((total, [_, reward]) => reward.add(total), 0)
  const paymentToComittee = ethers.utils.parseEther('3217')

  // Impersonate address that has enough UNI to submit proposals
  const proposalAddress = '0x2b1ad6184a6b0fac06bd225ed37c2abc04415ff4'
  const tx = {
    to: proposalAddress,
    value: ethers.utils.parseEther('2.0'),
  }

  await owner.sendTransaction(tx)

  await hre.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [proposalAddress],
  })
  const signer = await ethers.getSigner(proposalAddress)

  // Generate calldata for proposal
  const transferCallData = ethers.utils.defaultAbiCoder.encode(
    ['address', 'uint256'],
    [addresses.llamaMultisig, paymentToComittee]
  )
  const approveCalldata = ethers.utils.defaultAbiCoder.encode(
    ['address', 'uint256'],
    [addresses.uniStaker, totalLpAmount]
  )

  const uniStakerAbi = [
    'function createIncentive((address rewardToken, address pool, uint256 startTime, uint256 endTime, address refundee) key, uint256 reward)',
    'function multicall(bytes[] data)',
  ]

  let stakerIface = new ethers.utils.Interface(uniStakerAbi)
  const calldata = ethers.utils.defaultAbiCoder.encode(
    ['bytes[]'],
    [incentiveParams.map((params) => stakerIface.encodeFunctionData('createIncentive', params))]
  )

  // Get uniswap governance contract
  const uniGovAbi = [
    'function propose(address[] targets, uint[] values, string[] signatures, bytes[] calldatas, string description) returns (uint)',
  ]
  const uniswapGovernance = await ethers.getContractAt(uniGovAbi, addresses.uniGov, signer)

  // Create proposal
  const proposeTx = await uniswapGovernance.propose(
    [addresses.uniToken, addresses.uniToken, addresses.uniStaker],
    [0, 0, 0],
    ['transfer(address,uint256)', 'approve(address,uint256)', 'multicall(bytes[])'],
    [transferCallData, approveCalldata, calldata],
    proposalDescription
  )

  await proposeTx.wait()

  console.log(proposeTx)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
