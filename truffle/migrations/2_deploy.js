const Token = artifacts.require("Token");

module.exports = async function(deployer) {
	//deploy Token
	await deployer.deploy(Token);
}