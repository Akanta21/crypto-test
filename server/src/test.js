const zilliqa = require('./zilliqa')
const { BN, Long, bytes, units } = require('@zilliqa-js/util');
const CP = require('@zilliqa-js/crypto');

const CHAIN_ID = 333;
const MSG_VERSION = 1;
const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);

// 0x2b2ab0aB1964E9F49fa8Fec72182e3B6E30525Da
// 0xB38122df13F28b919Be6169ae0E8fFfB63E66c4d

zilliqa.wallet.addByPrivateKey(
  "e53d1c3edaffc7a7bab5418eb836cf75819a82872b4a1a0f1c7fcf5c3e020b89"
);

const publicKey = CP.getPubKeyFromPrivateKey("e53d1c3edaffc7a7bab5418eb836cf75819a82872b4a1a0f1c7fcf5c3e020b89")
const myGasPrice = units.toQa('3000', units.Units.Li);


async function testBlockchain() {
  try {
    console.log('transact start')
    const tx = await zilliqa.blockchain.createTransaction(
      zilliqa.transactions.new({
        version: 21823489,
        toAddr: "0x2b2ab0aB1964E9F49fa8Fec72182e3B6E30525Da",
        amount: new BN(8),// Sending an amount in Zil (1) and converting the amount to Qa
        pubKey: publicKey,
        gasPrice: myGasPrice, // Minimum gasPrice veries. Check the `GetMinimumGasPrice` on the blockchain
        gasLimit: Long.fromNumber(1),
        priority: true
      }, 50, 100)
    );


    console.log(`The transaction status is:`);
    console.log(tx.receipt);
  } catch (err) {
    console.log('err', err)
  }
}

testBlockchain()