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
      // {
      //   headers: this._headers()
      // }
    )
      .then(result => {
        return result.data
      })
      .catch(error => {
        throw new Error(error)
      })
  }


  getBalanceByAddress(address) {
    return Axios.get(
      `${this._config.coinUrl}/balance/${address}`
    )
      .then(result => {
        console.log(result)
        return result.data
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  getBalances(address) {
    return Axios.get(
      `${this._config.coinUrl}/balances`
    )
      .then(result => {
        console.log(result)
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
