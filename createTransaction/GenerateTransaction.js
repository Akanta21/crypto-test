const { Zilliqa } = require('@zilliqa-js/zilliqa');
const { BN, Long, bytes, units } = require('@zilliqa-js/util');
const CP = require('@zilliqa-js/crypto');

const CHAIN_ID = 333;
const MSG_VERSION = 1;
const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);

const zilliqa = new Zilliqa('https://dev-api.zilliqa.com')

const addresses = [
  '0xec902fe17d90203d0bddd943d97b29576ece3177',
  '0xc2035715831ab100ec42e562ce341b834bed1f4c',
  '0x6cd3667ba79310837e33f0aecbe13688a6cbca32',
  '0xac941274c3b6a50203cc5e7939b7dad9f32a0c12',
  '0x10200e3da08ee88729469d6eabc055cb225821e7',
  '0xf6dad9e193fa2959a849b81caf9cb6ecde466771',
  '0xb028055ea3bc78d759d10663da40d171dec992aa',
  '0x381f4008505e940ad7681ec3468a719060caf796'
]

// console.log(process.argv[2]) -> private key
// console.log(process.argv[3]) -> contract address
// console.log(process.argv[4]) -> number of addresses
// console.log(process.argv[5]) -> amount

const privateKey = process.argv[2]
const contractAddress = process.argv[3]
const numberOfTimes = process.argv[4]
const numOfTokens = process.argv[5]

zilliqa.wallet.addByPrivateKey(
  privateKey
);

const myGasPrice = units.toQa('1000', units.Units.Li);

async function testBlockchain() {
  try {
    let transaction = []
    console.log('transact start')
    const tx = await zilliqa.contracts.at(contractAddress);
    for (let i = 0; i < numberOfTimes; i++) {
      const call = tx.call(
        "Transfer",
        [
          { vname: 'to', type: 'ByStr20', value: addresses[Math.floor(Math.random() * addresses.length)] },
          { vname: 'tokens', type: 'Uint128', value: numOfTokens }
        ],
        {
          version: VERSION,
          amount: new BN(50),
          gasPrice: myGasPrice,
          gasLimit: Long.fromNumber(8000),
        },
        100,
        100
      )

      transaction.push(call)
    }
    console.log('transaction adding complete')
    Promise.all(transaction).then((response) => {
      console.log('response', response)
    })
  } catch (err) {
    console.log('err', err)
  }
}

testBlockchain()