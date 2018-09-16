const OathAccessControlled = artifacts.require('OathAccessControlled.sol');

const BN = require('bignumber.js');

function toReadable(num) {
  return web3.fromWei(new BN(num)).toNumber();
}

contract('OathAccessControlled - Testing', function(accounts) {
  // let instance, token, init, fnl, buyer, seller;
  
  beforeEach(async () => {
    OACinstance = await OathAccessControlled.new();
    // token = await TestTokenERC20.new();
    // methods = await TokenMethods.new();
    // await instance.Initiate(accounts[1], amount, 'true', { from: accounts[0] });

  });
  describe('Check initial deployment', async function() {
    it('contract creator should have owner access',  async () => {
      let creatorLvl = await OACinstance.getAccessLevel(accounts[0], { from: accounts[0] });
      assert.equal(creatorLvl, 3);
    });
    it('random address should have default 0 access level',  async () => {
      let creatorLvl = await OACinstance.getAccessLevel(accounts[1], { from: accounts[0] });
      assert.equal(creatorLvl, 0);
    });
  });
  describe('Setting access level', async function() {
    it('should change the access level for an address',  async () => {
      let initialAccess = await OACinstance.getAccessLevel(accounts[1], { from: accounts[0] });
      const newLevel = 1;
      await OACinstance.setAccessLevel(accounts[1], newLevel, { from: accounts[0] });
      let setAccess = await OACinstance.getAccessLevel(accounts[1], { from: accounts[0] });
      assert.equal(initialAccess, 0);
      assert.equal(setAccess, 1);
    });
    it('should not be callable by non-owner',  async () => {
      let initialAccess = await OACinstance.getAccessLevel(accounts[2], { from: accounts[0] });
      const newLevel = 2;
      try {
        await OACinstance.setAccessLevel(accounts[2], newLevel, { from: accounts[1] });
      } catch(e) {
        // console.log(e);
        if (e.message.search('revert') >= 0) {
          assert('reverted');
        };
      }
      let setAccess = await OACinstance.getAccessLevel(accounts[2], { from: accounts[0] });
      assert.equal(initialAccess, 0);
      assert.equal(setAccess, 0);
    });
    it('should not allow the owner to remove their own access', async () => {
      let initialAccess = await OACinstance.getAccessLevel(accounts[0], { from: accounts[0] });
      const newLevel = 1;
      try {
        await OACinstance.setAccessLevel(accounts[0], newLevel, { from: accounts[0] });
      } catch(e) {
        // console.log(e);
        if (e.message.search('revert') >= 0) {
          assert('reverted');
        };
      }
      let setAccess = await OACinstance.getAccessLevel(accounts[0], { from: accounts[0] });
      assert.equal(initialAccess, 3);
      assert.equal(setAccess, 3);
    });
  });
});
