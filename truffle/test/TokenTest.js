const MyToken = artifacts.require("Token");
const DBank = artifacts.require("DBank");

contract('Token and DBank', ([deployer, user]) => {

  it('Passing mint role properly at new Token instance', async() => {
    const token = await MyToken.new();
    const address = await token.minter();
    assert.equal(address, deployer, 'Minter and Deployed mismatch');
  });

  it('Rejecting changing Mint Role from wrong user', async() => {
    const token = await MyToken.deployed();
    try {
      await token.passMinterRole(user, {from: user});
    } catch (err) {
      assert.equal(
        err.reason, 
        'Error, only the minter can pass the minter role.',
        'Rejecting Mint Role not throwing correct msg'
        );
    }
  });

  it('Checking DBank has minting Role', async() => {
    const token = await MyToken.deployed();
    const minterAddress = await token.minter();
    const dBank = await DBank.deployed();

    assert.equal(dBank.address, minterAddress, "DBank has no Mint Role");
  });
});
