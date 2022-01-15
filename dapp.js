async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  }
}

async function load() {
  await loadWeb3();
  updateStatus("Ready!");
}

function updateStatus(status) {
  const statusEl = document.getElementById("status");
  statusEl.innerHTML = status;
  console.log(status);
}

function updateDriver(info) {
  const statusEl = document.getElementById("driver");
  statusEl.innerHTML = info;
  console.log(info);
}

load();

contractAddress = ("0xc017c7040320EF0A75797519C7f14198e5d8eB34");
ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "state",
        type: "string",
      },
    ],
    name: "LogArrived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "state",
        type: "string",
      },
    ],
    name: "LogDeparted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "state",
        type: "string",
      },
    ],
    name: "LogWaiting",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_driverId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "Registered",
    type: "event",
  },
  {
    inputs: [],
    name: "changeStateArrived",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "changeStateDeparted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "driverId",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "drivers",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "enum Transport.State",
        name: "state",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "_driverId",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDriver",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "state",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_driverId",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_driverId",
        type: "address",
      },
    ],
    name: "sendPayment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "setDriver",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function loadContract() {
  return await new window.web3.eth.Contract(ABI, contractAddress);
}

async function load() {
  await loadWeb3();
  window.contract = await loadContract();
  updateStatus("Ready!");
}

function setName() {
  const _name = document.getElementById("name-input-box").value;
  if (_name) {
    updateStatus(`Name Registered`);
    console.log(_name);
  } else {
    updateStatus("Input Name first");
  }
  return _name;
}

async function getCurrentAccount() {
  const accounts = await window.web3.eth.getAccounts();
  console.log(accounts);
  return accounts[0];
}

async function setDrivers() {
  updateStatus("Set Driver Data");
  const account = await getCurrentAccount();
  updateStatus("Fetched Accounts");
  console.log();
  _name = setName();
  updateDriver(`Will updatet with Driver ${_name} with Id ${account}`);
  const setDriver = await window.contract.methods
    .setDriver(_name)
    .send({ from: account });
  updateStatus(`Updated`);
}

async function getDrivers() {
  updateStatus("Getting driver");
  const _driverId = await getCurrentAccount();
  const getDriver = await contract.methods.getDriver().call();
  console.log(getDriver);
  updateDriver(`Getting Data of driver ${_driverId}`);
  const nameDriver = getDriver[0];
  console.log(nameDriver);
  updateDriver(` Welcome ${nameDriver}`);
  updateStatus("Driver ready");
}

///expected to fail when msg.sender not owner
async function changeStateArrived() {
  updateStatus("Changing status, make sure you are the owner");
  const account = await getCurrentAccount();
  const changeArrived = await window.contract.methods
    .changeStateArrived()
    .send({ from: account });
  console.log(changeArrived);
  updateDriver("Driver arrived");
}

async function sendPayment() {
  updateStatus("Sending out payment");
  const account = await getCurrentAccount();
  const amount = "0.0004"; //only fixed amount at the moment
  const amountToSend = web3.utils.toWei(amount, "ether"); // Convert to wei value
  await web3.eth.sendTransaction({
    from: account,
    to: "0x0db9B8cD2D71F34c0e22b51850d93ffb8e1dCD4E", //only fixed receiver at the moment
    //to: CONTRACT.options.address,
    value: amountToSend,
  });
  updateStatus("Payment made");
}
