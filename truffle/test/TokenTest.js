const MyToken = artifacts.require("Token");

contract("Token", ([deployer, user]) => {

  it("Passing mint role properly at instantiating", async () => {
    const token = await MyToken.deployed();
    const address = await token.minter.call();
    assert.equal(address, deployer, "Minter and Deployed mismatch");
  });
});
