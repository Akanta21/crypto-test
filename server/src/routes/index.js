import { Router } from 'express'
import Operations from '../operations'

const router = Router()

router.get('/token/:tokenId/total', async (req, res) => {
  const tokenId = req.params.tokenId
  try {
    const totalSupply = await Operations.GetTotalSupply(tokenId)
    res.json(totalSupply)
  } catch (err) {
    res.status(400).json('Unable to retrieve token supply info')
  }
})

router.get('/token/:tokenId', async (req, res) => {
  const tokenId = req.params.tokenId
  try {
    const tokenInfo = await Operations.GetTokenInfo(tokenId)
    res.json(tokenInfo)
  } catch (err) {
    res.status(400).json('Unable to retrieve token info')
  }
})

router.get('/balance/:address', async (req, res) => {
  const address = req.params.address
  const coinAddress = req.query.coinAddress
  try {
    const balance = await Operations.GetBalanceByAddress(address, coinAddress)
    res.json(balance)
  } catch (err) {
    res.status(400).json('Unable to retrieve balance')
  }
})

router.get('/balances/:address', async (req, res) => {
  const address = req.params.address
  try {
    const balances = await Operations.GetBalances(address)
    res.json(balances)
  } catch (err) {
    res.status(400).json('Unable to retrieve balances')
  }
})

export default router