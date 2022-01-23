const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const abiCode = [
	{
		"inputs": [],
		"name": "age",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setAge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const contract = new web3.eth.Contract(abiCode, "0x9E687574b50c7da6433c21bC2E52F42480e098d8");

// set age
contract.methods.setAge(40).send({from: "0xe667960998EA76b2f11019446571a070aa6d7EFE"});


// get age
contract.methods.age().call().then(response => {
	console.log(response);
}, error => {
	console.log(error);
});


