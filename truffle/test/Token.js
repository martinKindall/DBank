const MetaCoin = artifacts.require("Token");

contract("Token", ([deployer, user]) => {
  it("Just checking", () => {
    console.log(deployer);
    console.log(user);

    assert.equal(1, 1, "Hallo");
  });
});
