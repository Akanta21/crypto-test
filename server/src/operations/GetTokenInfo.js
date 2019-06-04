import zilliqa from '../zilliqa'

const GetTokenInfo = async tokenId => {
  const tokenInfo = await zilliqa
    .blockchain
    .getSmartContractInit(tokenId);

  console.log(tokenInfo)
  let infoReturn = {}
  tokenInfo.result.forEach((info) => {
    if (info.vname === 'name') {
      infoReturn.name = info.value
    } else if (info.vname === 'symbol') {
      infoReturn.symbol = info.value
    }
  })

  return infoReturn
}

export default GetTokenInfo