const MyToken = artifacts.require("Token");
const DBank = artifacts.require("DBank");

contract('Token and DBank', ([deployer, user]) => {

  it('Passing mint role properly at new Token instance', async() => {
    const token = await MyToken.new();
    const address = await token.minter();
    assert.equal(address, deployer, 'Minter and Deployed mismatch');
  });

  it('Checking DBank has minting Role', async() => {
    const token = await MyToken.deployed();
    const minterAddress = await token.minter();
    const dBank = await DBank.deployed();

    assert.equal(dBank.address, minterAddress, "DBank has no Mint Role");
  });
});
