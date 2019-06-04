const zilliqa = require('./zilliqa')
const { BN, Long, bytes, units } = require('@zilliqa-js/util');
// const CP = require('@zilliqa-js/crypto');

const CHAIN_ID = 333;
const MSG_VERSION = 1;
const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);

// 0x2b2ab0aB1964E9F49fa8Fec72182e3B6E30525Da
// 0xB38122df13F28b919Be6169ae0E8fFfB63E66c4d

zilliqa.wallet.addByPrivateKey(
  "e53d1c3edaffc7a7bab5418eb836cf75819a82872b4a1a0f1c7fcf5c3e020b89"
);

// const publicKey = CP.getPubKeyFromPrivateKey("e53d1c3edaffc7a7bab5418eb836cf75819a82872b4a1a0f1c7fcf5c3e020b89")
const myGasPrice = units.toQa('1000', units.Units.Li);


async function testBlockchain() {
  try {
    console.log('transact start')
    const tx = await zilliqa.contracts.at("0xB38122df13F28b919Be6169ae0E8fFfB63E66c4d");
    const call = await tx.call(
      "Transfer",
      [
        { vname: 'to', type: 'ByStr20', value: '0xf6dad9e193fa2959a849b81caf9cb6ecde466771' },
        { vname: 'tokens', type: 'Uint128', value: "200" }
      ],
      {
        version: VERSION,
        amount: new BN(200),
        gasPrice: myGasPrice,
        gasLimit: Long.fromNumber(8000),
      },
      100,
      100
    )
    console.log(call)
  } catch (err) {
    console.log('err', err)
  }
}

testBlockchain()