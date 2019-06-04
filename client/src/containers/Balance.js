import React, { Component } from 'react'
import { getAPIClient } from '../Api'

class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: {},
      selected: ''
    };
  }

  fetch = async (coinAddress, coinName) => {
    const balance = await getAPIClient().getTokenSupply(coinAddress)
    this.setState({ balance, selected: coinName })
  }

  render() {
    return (
      <div>
        <button onClick={() => this.fetch("5938fc8af82250ad6cf1da3bb92f4aa005cb2717", "Alice Coin")}>
          Alice Coin
        </button>
        <div>Selected coin: {this.state.selected}</div>
        <div>
          Balance of the coin: {this.state.balance.total_supply}
        </div>
      </div>
    );
  }
}

export default Balance