import zilliqa from '../zilliqa'

const aliceCoin = "5938fc8af82250ad6cf1da3bb92f4aa005cb2717"

const GetBalances = async (tokenAddress = aliceCoin) => {
  const tokenInfo = await zilliqa
    .blockchain
    .getSmartContractState(tokenAddress);

  const balanceInfo = tokenInfo.result.find((info) => {
    return info.vname === 'balances'
  })

  const sortedBalance = balanceInfo.value.sort((a, b) => {
    return b.val - a.val
  })

  const renamedSorted = sortedBalance.map((balance) => {
    return {
      holder: balance.key,
      balance: balance.val
    }
  })

  return { balanceInfo: renamedSorted }
}

export default GetBalances