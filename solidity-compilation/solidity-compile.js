const solc = require("solc");
const fs = require("fs");
const Web3 = require("web3");
const path = require("path");
const inboxPath = path.resolve(__dirname, "user.sol");

const web = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const fileContent = fs.readFileSync(inboxPath, "utf8").toString();
const input = {
    language: 'Solidity',
    sources: {
        'user.sol': {
            content: fileContent
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

// get abi and byte code
const output = JSON.parse(solc.compile(JSON.stringify(input)));
const abi = output.contracts["user.sol"]["User"].abi;
const byteCode = output.contracts["user.sol"]["User"].evm.bytecode.object;
console.log(abi, byteCode);


// deploy contract
const contract = new web.eth.Contract(abi);
let defaultAccount;
web.eth.getAccounts().then(accounts => {
    defaultAccount = accounts[0];
    contract
        .deploy({ data: byteCode })
        .send({ from: defaultAccount, gas: 500000 })
        .on("receipt", receipt => {
            console.log(receipt.contractAddress);
        }).then(demoContract => {
            demoContract.methods.age().call((err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(data);
            })
        });
});