const MetaCoin = artifacts.require("Token");

contract("Token", data => {
  it("Just checking", () => {
    console.log(data);

    assert.equal(1, 1, "Hallo");
  });
});
