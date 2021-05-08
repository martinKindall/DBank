const Token = artifacts.require("Token");
const DBank = artifacts.require("DBank");


module.exports = function(deployer) {
	console.log('I was here!');
	let myToken;
	deployer.deploy(Token)
	.then(() => Token.deployed())
	.then((token) => {
		myToken = token;
		return deployer.deploy(DBank, token.address);
	})
	.then(() =>  DBank.deployed())
	.then((dBank) =>  myToken.passMinterRole(dBank.address));
}