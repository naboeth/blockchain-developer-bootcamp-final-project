# Blockchain Developer Bootcamp Final Project

What is the project about?

Logistics Use Case: Smart contract payment execution on arrival of truck at the destination.

Example Workflow

1. Truck driver will register with their name and adress in the smart contract
2. Truck driver arrives
3. Smart Contract owner sends payment to truck driver

# Installation

## Preparation

clone github repo by entering

```
git clone git@github.com:naboeth/blockchain-developer-bootcamp-final-project.git
```

install truffle and ganache-cli

```
npm install -g truffle
npm install -g ganache-cli
```

install dependencies

```
npm install
```

## Compile and migrate the contract in Visual Studio Code

run ganache-cli (should be default port 8545)

```
ganache-cli
```

then

```
truffle compile
truffle migrate
```

## Interacting via frontend

have the Metamask browser extension installed with two accounts that have ether, e.g. name them Owner and Driver and change to the ropsten network

Problem: In the current state of the frontend page some functions are restricted to the owner address 0x5F64B66A19293436F5f2FcdEf0f40CCE19681293. These functions include among others change state driver and send payment. Also the payment receiver is hardcoded as address 0x0db9B8cD2D71F34c0e22b51850d93ffb8e1dCD4E in the dapp.js, meaning only this address will receive payments.

Solution: In order to make it work for you, deploy the Transport.sol contract (e.g. via remix on ropsten) copy the address and change it in the dapp.js, where it says contractAddress.
To change the receiver of payments, in the dapp.js for the sendPayment() function, insert your driver account address in the "to: ... ".

then

in Visual Studio Code

```
open the index.html in the frontend folder via live server
```

Enjoy using the dApp!

Also publicly hosted on:
https://naboeth.github.io/blockchain-developer-bootcamp-final-project/

## Running unit tests

Use port 8545

truffle test

## Demo Video

https://www.youtube.com/watch?v=6TcwSIa6tmM
