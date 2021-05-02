const helpers = require('./helpers');

const MyToken = artifacts.require("Token");
const DBank = artifacts.require("DBank");


contract('Token and DBank', ([deployer, user]) => {
  it('Check token properties are correct', async() => {
    const token = await MyToken.deployed();
    const symbol = await token.symbol();
    assert.equal(symbol, 'DBC');
  });

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

  it('Only minter can Mint', async() => {
    const token = await MyToken.deployed();
    try {
      await token.mint(user, 10**2, {from: user});
    } catch (err) {
      assert.equal(
        err.reason, 
        'Error, only the minter can mint.'
        );
    }
  });

  it('Checking DBank has minting Role', async() => {
    const token = await MyToken.deployed();
    const minterAddress = await token.minter();
    const dBank = await DBank.deployed();

    assert.equal(dBank.address, minterAddress, "DBank has no Mint Role");
  });

  describe('Testing deposit', () => {
    let dBank;

    beforeEach(async() => {
      const token = await MyToken.new();
      dBank = await DBank.new(token.address);
      await token.passMinterRole(dBank.address, {from: deployer});
    });

    describe('Success', () => {
      it('DBank should have increased Balance', async() => {
        const initialBalance = await web3.eth.getBalance(dBank.address);
        assert.equal(0, initialBalance);
        assert.equal(await dBank.etherBalanceOf(user), 0);
        await dBank.deposit({value: 10**16, from: user});  // 0.01 ETH
        const finalBalance = await web3.eth.getBalance(dBank.address);
        assert.equal(0.01, web3.utils.fromWei(finalBalance, 'ether'));
        assert.equal(await dBank.etherBalanceOf(user), 10**16);
      });
    });

    describe('Fail', () => {
      it('Already Deposited', async() => {
        await dBank.deposit({value: 10**16, from: user});
        try {
          await dBank.deposit({value: 10**16, from: user});
        } catch(err) {
          assert.equal(
            err.reason, 
            'Error, deposit already active'
            );
        }
      });
    });
  });

  describe('Testing withdraw', () => {
    let dBank;
    let token;

    beforeEach(async() => {
      token = await MyToken.new();
      dBank = await DBank.new(token.address);
      await token.passMinterRole(dBank.address, {from: deployer});
    });

    it('User gets tokens after a while', async() => {
      const tokenBalance0 = await token.balanceOf(user);

      assert.equal(0, Number(tokenBalance0));
      
      await dBank.deposit({value: 10**16, from: user});
      await helpers.wait(4);
      await dBank.withdraw({from: user});
      const tokenBalance1 = await token.balanceOf(user);
      assert.isAbove(Number(tokenBalance1), 0);
    });

    it('DBank reduces its balance after withdraw', async() => {
      const dBankBalance = await token.balanceOf(user);
      await dBank.deposit({value: 10**16, from: user});
      const initialBalance = await web3.eth.getBalance(dBank.address);
      await helpers.wait(4);
      await dBank.withdraw({from: user});
      const finalBalance = await web3.eth.getBalance(dBank.address);

      assert.isAbove(Number(initialBalance), Number(finalBalance));
      assert.equal(0, Number(finalBalance));
    });

    it('Cannot withdraw without deposit', async() => {
      try {
        await dBank.withdraw({from: user});
      } catch(err) {
        assert.equal(
          err.reason, 
          'Error, user has no funds in the dBank.'
          );
      }
    });
  });
});
