let Web3 = require("web3");
const web = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const bal = getUserBalance(web, "0xe667960998EA76b2f11019446571a070aa6d7EFE");
/**
 * Get user balance
 * get account address balance
 * @param {*} web3 web 3 instance
 * @param {*} address account address
 */
async function getUserBalance(web3, address) {
    try {
        const response = await web3.eth.getBalance(address);
        // print value in the form of wei
        console.log(await response, '14');
        // amount is in wei, converting to ether
        const val = web.utils.fromWei(await response, "ether");
        console.log(val, '17');

        // make transaction from one account to another account
        makeTranscation(web3, address, "0x8DCC6dDA6B9bc8b5626911107B41CDee2Aa9dFB2", await response);
    }
    catch (err) {
        console.log('fetch failed', err);
    }
}

/**
 * Transfer amount from one account to another
 * @param {*} web3 web 3 instance
 * @param {*} from from account
 * @param {*} to to account
 * @param {*} val amount to transact
 */
async function makeTranscation(web3, from, to, val) {
    try {
        console.log(val, 'value');
        web3.eth.sendTransaction({
            from: from,
            to: to,
            value: web3.utils.toWei("5", "ether")
        })
    } catch (e) {
        console.log(e.message);
    }

}