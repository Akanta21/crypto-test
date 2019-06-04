import Axios from 'axios'

class API {
  constructor(config) {
    this._config = config
  }

  _headers() {
    let headers = {
      Accept: 'application/json'
    }

    if (this._config.token) {
      headers['Authorization'] = `Bearer ${this._config.token}`
    }

    return headers
  }

  getTokenSupply(tokenId) {
    return Axios.get(
      `${this._config.coinUrl}/token/${tokenId}/total`,
    )
      .then(result => {
        return result.data
      })
      .catch(error => {
        throw new Error(error)
      })
  }


  getBalanceByAddress(address, coinAddress) {
    return Axios.get(
      `${this._config.coinUrl}/balance/${address}?coinAddress=${coinAddress}`
    )
      .then(result => {
        return result.data
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  getBalances(address) {
    return Axios.get(
      `${this._config.coinUrl}/balances/${address}`
    )
      .then(result => {
        return result.data
      })
      .catch(error => {
        throw new Error(error)
      })
  }
}

export const getAPIClient = () => {
  return new API({
    coinUrl: "http://localhost:8080/v1",
  })
}
