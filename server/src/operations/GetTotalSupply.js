import zilliqa from '../zilliqa'

const GetTotalSupply = async (tokenId) => {
  const tokenInfo = await zilliqa
    .blockchain
    .getSmartContractInit(tokenId);

  const tokenSupply = tokenInfo.result.find((info) => {
    return info.vname === 'total_tokens'
  })

  return { total_supply: tokenSupply.value }
}

export default GetTotalSupply