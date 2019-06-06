# Crypto - Alice and Bob Coins
This repo contains the method to generating a contract, viewing it from both the client and api server.

# Addresses of Coins:
* Alice : 0x5938fc8af82250ad6cf1da3bb92f4aa005cb2717
* Bob : 0xB38122df13F28b919Be6169ae0E8fFfB63E66c4d

## How is the repo organised?
1. Client -> this is where the client code is located
2. Server -> Api server
3. createTransaction -> script to generate a transaction

## Requirements
* Node 
* Docker

## Quickstart!
First part of the guide is meant to start the docker containers running for both API and React client.

``` shell
# check pwd
pwd -> xxx/crypto-test

# start the containers running
./auto/dev
```

Subsequently, the react and server client would have been started by the end of the process.

React Client: http://localhost:3000

Express Server: http://localhost:8080

API documentation: http://localhost:8080/api-doc

For the next part is to generate transaction,

```shell
# change directiory
cd createTransaction

# current directory
pwd -> xxx/crypto-test/createTransaction

# run npm / yarn install
npm install 

# run the command to generate the transaction in the following format
node GenerateTransaction.js privateKey-of-sender address-of-contract number-of-transactions amountoftoken

# an example of a transaction
node GenerateTransaction.js exxxxxxxxxxxxxxxxxx9 0xB38122df13F28b919Be6169ae0E8fFfB63E66c4d 1 102
            ||                      ||                          ||                          || ||
      code to generate            private key               contract address               no  amount
```

When transaction is generated, it should log the response
