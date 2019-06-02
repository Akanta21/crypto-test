import zilliqa from '../zilliqa'

const aliceCoin = "5938fc8af82250ad6cf1da3bb92f4aa005cb2717"

const GetBalanceByAddress = async (address, tokenAddress = aliceCoin) => {
  const tokenInfo = await zilliqa
    .blockchain
    .getSmartContractState(tokenAddress);

  const balanceInfo = tokenInfo.result.find((info) => {
    return info.vname === 'balances'
  })

  const balanceByAddress = balanceInfo.value.find((balance) => balance.key === address)

  return {
    holder: address,
    balance: balanceByAddress.val || 0
  }
}

export default GetBalanceByAddress