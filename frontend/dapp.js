

async function loadWeb3() {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		window.ethereum.enable();
	}
}

async function load() {
	await loadWeb3();
	updateStatus('Ready!');
}

function updateStatus(status) {
	const statusEl = document.getElementById('status');
	statusEl.innerHTML = status;
	console.log(status);
}

function updateDriver(info) {
	const statusEl = document.getElementById('driver');
	statusEl.innerHTML = info;
	console.log(info)
}


load();

contractAddress = ("0x38eb3fAe2EfF03cA0683855c3ACCD23266FaAf5f")
ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "changeStateArrived",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "changeStateDeparted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "driverId",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDriver",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "state",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_driverId",
				"type": "address"
			}
		],
		"name": "sendPayment",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "setDriver",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


async function loadContract() {
	return await new window.web3.eth.Contract(ABI, contractAddress);
}

async function load() {
	await loadWeb3();
	window.contract = await loadContract();
	updateStatus('Ready!');
}

function setName() {
	const _name = document.getElementById("name-input-box").value;
	if (_name) {
		updateStatus(`Name Registered`);
		console.log(_name);
	}
	else {
		updateStatus("Input Name first")
	}
	return (_name)
}

async function getCurrentAccount() {
	const accounts = await window.web3.eth.getAccounts();
	console.log(accounts)
	return accounts[0];
}


async function setDrivers() {
	updateStatus("Set Driver Data");
	const account = await getCurrentAccount();
	updateStatus("Fetched Accounts");
	console.log()
	_name = setName()
	//_driverId = account; //msg.sender is current Truck Driver
	//console.log(_driverId)
	//_driverId = "0x0db9B8cD2D71F34c0e22b51850d93ffb8e1dCD4E"
	updateDriver(`Will updatet with Driver ${_name} with Id ${account}`);
	const setDriver = await window.contract.methods.setDriver(_name).send({ from: account })
	updateStatus(`Updated`);
}

async function getDrivers() {
	updateStatus("Getting driver")
	//const _driverId = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
	const _driverId = await getCurrentAccount();
	const getDriver = await contract.methods.getDriver().call()
	console.log(getDriver)
	updateDriver(`Getting Data of driver ${_driverId}`);
	const nameDriver = getDriver[0];
	console.log(nameDriver);
	updateDriver(` Welcome ${nameDriver}`);
	updateStatus("Driver ready")
}

///expected to fail when msg.sender not owner
async function changeStateArrived() {
	updateStatus("Changing status, make sure you are the owner");
	const account = await getCurrentAccount();
	const changeArrived = await window.contract.methods.changeStateArrived().send({ from: account });
	console.log(changeArrived);
	updateDriver("Driver arrived");
}

// async function sendPayment(){
//     updateStatus("Sending out payment"); //only owner can make payments
//     const account = await getCurrentAccount();
// 	// const amount = {value: web3.utils.toWei("0.00001","ether")}
// 	// console.log(amount)
// 	//passing function arguments
//     //const executePayment = await window.contract.methods.sendPayment({from: account, value: web3.utils.toWei("0.00001","ether")});
// 	const executePayment = await window.contract.methods.
// 	sendPayment("0x0db9B8cD2D71F34c0e22b51850d93ffb8e1dCD4E").send(
// 		{from: account, 
// 		value: web3.utils.toWei("0.00001","ether")});
// 	updateStatus("Payment Sent")
// 	console.log(executePayment);
// }

async function sendPayment() {
	updateStatus("Sending out payment");
		const account = await getCurrentAccount()
		const amount = "0.0004"; 
		const amountToSend = web3.utils.toWei(amount, "ether"); // Convert to wei value
		web3.eth.sendTransaction({ 
		  from: account,
		  to: "0x0db9B8cD2D71F34c0e22b51850d93ffb8e1dCD4E",
		  //to: CONTRACT.options.address, 
		  value: amountToSend 
		});
	  }



//function
//make function.call() https://ethereum.stackexchange.com/questions/78336/error-invalid-number-of-parameters-for-method-got-3-expected-2
//pass function arguments https://dev.to/fllstck/solidity-basics-for-javascript-devs-part-2-430e

// async function printCoolNumber() {
//     updateStatus('fetching Cool Number...');
//     const coolNumber = await window.contract.methods.coolNumber().call();
//     updateStatus(`coolNumber: ${coolNumber}`);
// }

// async function changeCoolNumber() {
//     const value = Math.floor(Math.random() * 100);
//     updateStatus(`Updating coolNumber with ${value}`);
//     const account = await getCurrentAccount();
//     const coolNumber = await window.contract.methods.setCoolNumber(value).send({ from: account });
//     updateStatus('Updated.');
// }



