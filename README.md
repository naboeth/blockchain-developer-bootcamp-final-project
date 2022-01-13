# Blockchain Developer Bootcamp Final Project

What is the project about?
Logistics Use Case: Automatic payment execution on arrival of truck at the destination

Example Workflow

1. Truck driver will register with their name and adress in the smart contract [State: Waiting].
2. Truck driver departs [State: departed]
3. Truck driver arrives [State: arrived] and will be automatically paid via smart contract execution

Installation

X) Compile and migrate the contract

```
truffle compile
```

```
truffle migrate
```

Deploy the contract to the ropsten testnet:

```
truffle migrate --network ropsten
```

X) Install dependencies

```
npm install
```
