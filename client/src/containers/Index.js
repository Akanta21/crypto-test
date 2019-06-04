import React, { Component } from 'react'
import { getAPIClient } from '../Api'
import styles from './Styles/index.module.css';
import Card from '../components/Card'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';



function TabContainer({ items }) {
  return (
    <Paper className={styles.tableRoot}>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Holder</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.holder}
              </TableCell>
              <TableCell align="right">{row.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      balances: [],
      balance: {},
      selected: '',
      address: '',
      amountInAddress: '',
      error: undefined
    };
  }

  componentDidMount() {
    this.fetchFullList()
  }

  fetch = async (coinAddress, coinName) => {
    const balance = await getAPIClient().getTokenSupply(coinAddress)
    this.setState({ balance, selected: coinName })
  }

  fetchFullList = async () => {
    const { balanceInfo } = await getAPIClient().getBalances()
    this.setState({ balances: balanceInfo })
  }

  accountBalanceByAddress = async (e) => {
    this.setState({ error: undefined })
    e.preventDefault()
    try {
      const balance = await getAPIClient().getBalanceByAddress(this.state.address)
      this.setState({ amountInAddress: balance })
    } catch (err) {
      this.setState({ error: "Invalid address" })
    }
  }

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value });
  };

  handleTabchange = (e, newValue) => {
    this.setState({ value: newValue })
  }

  balanceComponent = () => (
    <div>
      <label className={styles.bold}>Total Supply of Token</label>
      <div className={styles.paddedHorizontal}>
        <Button variant="contained"
          onClick={() => this.fetch("5938fc8af82250ad6cf1da3bb92f4aa005cb2717", "Alice Coin")}
          color="primary"
        >
          Alice Coin
          </Button>
      </div>
      <section>
        <div>Selected coin: {this.state.selected}</div>
        <div>
          Balance of the coin: {this.state.balance.total_supply}
        </div>
      </section>
    </div>
  )

  balanceByAddress = () => (
    <div>
      <label className={styles.bold}>Token by Address</label>
      <form className={styles.paddedHorizontal} noValidate autoComplete="off">
        <Paper className={styles.root}>
          <InputBase className={styles.input} onChange={this.handleChange('address')} placeholder="Address" />
          <IconButton
            className={styles.iconButton}
            onClick={this.accountBalanceByAddress}
            aria-label="Search"
            disabled={!this.state.address}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
      <section className={styles.paddedHorizontal}>
        <div className={styles.wrappedText}>Selected address: {this.state.address}</div>
        <div className={styles.wrappedText}>
          Balance in that address: {this.state.amountInAddress.balance}
        </div>
      </section>
      {this.state.error && <div className={styles.error}>{this.state.error}</div>}
    </div>
  )

  balanceOfAllTokenHolders = () => (
    <div className={styles.container}>
      <AppBar position="static" color="default">
        <Tabs value={this.state.value} onChange={this.handleTabchange} variant="fullWidth">
          <Tab label="Alice Coin" />
          <Tab label="Bob Coin" />
        </Tabs>
      </AppBar>
      {this.state.value === 0 && <TabContainer items={this.state.balances} />}
      {this.state.value === 1 && <TabContainer items={this.state.balances} />}
    </div>
  )

  render() {
    return (
      <div className={styles.container}>
        {this.balanceOfAllTokenHolders()}
        <Card cardContent={this.balanceComponent()} />
        <Card cardContent={this.balanceByAddress()} />
      </div>
    )
  }
}

export default Index