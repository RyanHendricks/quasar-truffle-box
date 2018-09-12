const OathMusic = artifacts.require('OathMusic.sol');

const BN = require('bignumber.js');

function toReadable(num) {
  return web3.fromWei(new BN(num)).toNumber();
}

contract('OathMusic - Initialize', function(accounts) {
  // let instance, token, init, fnl, buyer, seller;

  
  beforeEach(async () => {
    OMInstance = await OathMusic.new();
    // token = await TestTokenERC20.new();
    // methods = await TokenMethods.new();
    // await instance.Initiate(accounts[1], amount, 'true', { from: accounts[0] });

  });
  describe('Check deployment', async function() {
    it('should be deployed and songWriterCount equal to 0',  async () => {
      // console.log(OathMusic.address);
      let count = new BN(await OMInstance.songWriterCount({ from: accounts[0] })).toNumber();
      assert.equal(count, 0);
      // let balance = web3.fromWei(new BN(await token.balanceOf(accounts[0], { from: accounts[0] })));
      // console.log(count);
      // let supply = web3.fromWei(new BN(await token.INITIAL_SUPPLY()));
      // let bal = web3.fromWei(balance, 'ether')
      // assert.equal(balance.toNumber(), supply.toNumber());
      // console.log(`${balance.toString()} equals ${supply.toNumber()}`)
    });
  });
  describe('Add song data', async function() {
    it('should only be callable by the contract owner',  async () => {
      let title = "Three Little Birds";
      let String1 = "QmS987m3EFH8nQDjqsVubLZqrhmYF49Su7xCmXUvZkbmgN";
      let String2 = "QmS987m3EFH8nQDjqsVubLZqrhmYF49Su7xCmXUvZkbmgN";
      let String3 = "QmS987m3EFH8nQDjqsVubLZqrhmYF49Su7xCmXUvZkbmgN";
      try {
        await OMInstance.addSongData(title, String1, String2, String3, { from: accounts[1] });
      } catch(e) {
        // console.log(e);
        if (e.message.search('revert') >= 0) {
          assert('reverted');
        };
      } finally {
        assert.equal(await OMInstance.songTitle({ from: accounts[0] }), "")
      }
    });
    it('should hash metadata and add song when called by owner',  async () => {
      let title = "Three Little Birds";
      let String1 = "QmS987m3EFH8nQDjqsVubLZqrhmYF49Su7xCmXUvZkbmgN";
      let String2 = "QmS987m3EFH8nQDjqsVubLZqrhmYF49Su7xCmXUvZkbmgN";
      let String3 = "QmS987m3EFH8nQDjqsVubLZqrhmYF49Su7xCmXUvZkbmgN";
      await OMInstance.addSongData(title, String1, String2, String3, { from: accounts[0] });
      assert.equal(await OMInstance.songTitle({ from: accounts[0] }), "Three Little Birds")
      assert.equal(await OMInstance.lyricsStoragePointer({ from: accounts[0] }), web3.sha3("QmS987m3EFH8nQDjqsVubLZqrhmYF49Su7xCmXUvZkbmgN"));
      assert.equal(await OMInstance.audioStoragePointer({ from: accounts[0] }), web3.sha3("QmS987m3EFH8nQDjqsVubLZqrhmYF49Su7xCmXUvZkbmgN"));
      assert.equal(await OMInstance.pdfAttachmentStoragePointer({ from: accounts[0] }), web3.sha3("QmS987m3EFH8nQDjqsVubLZqrhmYF49Su7xCmXUvZkbmgN"));

    //   await instance.depositToken(token.address, { from: accounts[0] });
    //   let balance = await token.balanceOf(accounts[0], { from: accounts[0] });
    //   let balanceUnion = await token.balanceOf(instance.address);
    //   let uniontokenbalance = await instance.balanceToken(token.address);
    //   console.log(toReadable(balance), toReadable(balanceUnion), uniontokenbalance.toNumber());
    //   assert.equal(toReadable(balanceUnion), uniontokenbalance.toNumber())
    });
  });
  describe('Add SongWriter', async function() {
    it('should only be callable by the contract owner',  async () => {
      let name = "name";
      let split = 0.24;
      let artist = accounts[0];
      try {
        await OMInstance.addSongWriter(name, split, artist, { from: accounts[1] });
      } catch(e) {
        // console.log(e);
        if (e.message.search('revert') >= 0) {
          assert('reverted');
        };
      } finally {
        let count = new BN(await OMInstance.songWriterCount({ from: accounts[0] })).toNumber();
        assert.equal(count, 0);
      }
    });
    it('should allow song writer to be added', async () => {
      let name = "name";
      let split = 0.24;
      let artist = accounts[0];
      await OMInstance.addSongWriter(name, split, accounts[0], { from: accounts[0] });
      let count = new BN(await OMInstance.songWriterCount({ from: accounts[0] })).toNumber();
      assert.equal(count, 1);
    });
    it('should add the artist with signed variable equal to false', async () => {
      let name = "name";
      let split = 0.24;
      let artist = accounts[0];
      await OMInstance.addSongWriter(name, split, accounts[0], { from: accounts[0] });
      let signed = await OMInstance.hasSongWriterSigned(accounts[0], { from: accounts[0] });
      assert.equal(signed, false);
    });
    it('should give access privelege if the added songwriter is not the current owner', async () => {
      let name = "name";
      let split = 0.24;
      let artist = accounts[1];
      let accessinitial = new BN(await OMInstance.getAccessLevel(accounts[1], { from: accounts[0] })).toNumber();

      await OMInstance.addSongWriter(name, split, accounts[1], { from: accounts[0] });
      let accesspost = new BN(await OMInstance.getAccessLevel(accounts[1], { from: accounts[0] })).toNumber();
      assert.equal(accessinitial, 0);
      assert.equal(accesspost, 2);
    });
    it('should set pendingSignatures to 1', async () => {
      let prependingSig = new BN(await OMInstance.pendingSignatures(accounts[1], { from: accounts[0] })).toNumber();
      let name = "name";
      let split = 0.24;
      let artist = accounts[1];
      await OMInstance.addSongWriter(name, split, accounts[1], { from: accounts[0] });
      let pendingSig = new BN(await OMInstance.pendingSignatures(accounts[1], { from: accounts[0] })).toNumber();
      assert.equal(pendingSig, 1);
    });
    it('should not allow a duplicate songwriter to be added based on signature status', async () => {
      let prependingSig = new BN(await OMInstance.pendingSignatures(accounts[1], { from: accounts[0] })).toNumber();
      let name = "name";
      let split = 0.24;
      let artist = accounts[1];

      let count = new BN(await OMInstance.songWriterCount({ from: accounts[0] })).toNumber();
      assert.equal(count, 0);

      await OMInstance.addSongWriter(name, split, accounts[1], { from: accounts[0] });
      let pendingSig = new BN(await OMInstance.pendingSignatures(accounts[1], { from: accounts[0] })).toNumber();
      assert.equal(pendingSig, 1);

      let countpost = new BN(await OMInstance.songWriterCount({ from: accounts[0] })).toNumber();
      assert.equal(countpost, 1);

      try {
        await OMInstance.addSongWriter(name, split, accounts[1], { from: accounts[0] });
      } catch(e) {
        // console.log(e);
        if (e.message.search('revert') >= 0) {
          assert('reverted');
        };
      } finally {
        let sig = new BN(await OMInstance.pendingSignatures(accounts[1], { from: accounts[0] })).toNumber();
        let count = new BN(await OMInstance.songWriterCount({ from: accounts[0] })).toNumber();
        assert.equal(count, 1);
        assert.equal(sig, 1);
      }
    });
  });
  describe('Song Writer Signs', async function() {

    it('should only be callable by addresses with songwriter access',  async () => {
      let name = "name1";
      let split = 0.55;
      let artist = accounts[0];
      let nameTwo = "name2";
      let splitTwo = 0.45;
      let artistTwo = accounts[1];

      // Account 0 should have admin access and account 1 default access
      let account0Access = new BN(await OMInstance.getAccessLevel(accounts[0], { from: accounts[0] })).toNumber();
      let account1Access = new BN(await OMInstance.getAccessLevel(accounts[1], { from: accounts[0] })).toNumber();
      assert.equal(account0Access, 3);
      assert.equal(account1Access, 0);
      
      // Add songwriters
      await OMInstance.addSongWriter(name, split, accounts[0], { from: accounts[0] });
      await OMInstance.addSongWriter(name, split, accounts[1], { from: accounts[0] });
      
      // Account 0 should STILL have admin access and account 1 should now have songwriter access
      let account0AccessPost = new BN(await OMInstance.getAccessLevel(accounts[0], { from: accounts[0] })).toNumber();
      let account1AccessPost = new BN(await OMInstance.getAccessLevel(accounts[1], { from: accounts[0] })).toNumber();
      assert.equal(account0AccessPost, 3);
      assert.equal(account1AccessPost, 2);

      // Accounts 0,1 should have pending signatures and account 2 should NOT
      const sig0status = await OMInstance.getPendingSignatureStatus(accounts[0], { from: accounts[0] });
      const sig1status = await OMInstance.getPendingSignatureStatus(accounts[1], { from: accounts[1] });
      const sig2status = await OMInstance.getPendingSignatureStatus(accounts[2], { from: accounts[2] });

      assert.equal(sig0status, 1);
      assert.equal(sig1status, 1);
      assert.equal(sig2status, 0);

      await OMInstance.songWriterSign({ from: accounts[0] });
      await OMInstance.songWriterSign({ from: accounts[1] });

      try {
        await OMInstance.songWriterSign({ from: accounts[2] });
      } catch(e) {
        // console.log(e);
        if (e.message.search('revert') >= 0) {
          assert('reverted');
        };
      }
      
      assert.equal(await OMInstance.getPendingSignatureStatus(accounts[0], { from: accounts[0] }),2);
      assert.equal(await OMInstance.getPendingSignatureStatus(accounts[1], { from: accounts[1] }),2);
      assert.equal(await OMInstance.getPendingSignatureStatus(accounts[2], { from: accounts[2] }),0);

      // assert.equal(sig0status, 2);
      // assert.equal(sig1status, 2);
      // assert.equal(sig2status, 0);

      assert.equal(await OMInstance.hasSongWriterSigned(accounts[0], { from: accounts[0] }), true);
      assert.equal(await OMInstance.hasSongWriterSigned(accounts[1], { from: accounts[0] }), true);
      assert.equal(await OMInstance.hasSongWriterSigned(accounts[2], { from: accounts[0] }), false);
      
      // try {
      //   await OMInstance.addSongWriter(name, split, artist, { from: accounts[1] });
      // } catch(e) {
      //   // console.log(e);
      //   if (e.message.search('revert') >= 0) {
      //     assert('reverted');
      //   };
      // } finally {
      //   let count = new BN(await OMInstance.songWriterCount({ from: accounts[0] })).toNumber();
      //   assert.equal(count, 0);
      // }
    });
  });

  });


    // it('should simulate a withdrawal', async () => {
    //   let approveAmount = await token.balanceOf(accounts[0])/10;
      
    //   await token.approve(instance.address, (approveAmount), { from: accounts[0] });
    //   await instance.depositToken(token.address, { from: accounts[0] });
    //   let sim = await instance.simulatedWithdrawal(token.address, accounts[0], { from: accounts[0] });
    //   console.log(`Deposit Amount: ${toReadable(approveAmount)}`);
      
    //   await token.approve(instance.address, (approveAmount), { from: accounts[0] });
    //   await instance.depositToken(token.address, { from: accounts[0] });
    //   let sim2 = await instance.simulatedWithdrawal(token.address, accounts[0], { from: accounts[0] });
      
    //   console.log(' ')
    //   console.log('1 User Deposits 1000')
    //   console.log('----------------------------------------------')
    //   console.log(`Deposit Amount: ${toReadable(approveAmount)}`);
    //   console.log(`Current Balance: ${toReadable(sim[0])}`);
    //   console.log(`Accrued Rewards: ${toReadable(sim[1])}`);
    //   console.log(`Withdrawal Fee: ${toReadable(sim[2])}`);
    //   console.log(`Withdrawal Amount: ${toReadable(sim[3])}`);
    //   console.log(' ')
    //   console.log(' ')
    //   console.log(' ')
    //   console.log(' ')
    //   console.log('Same User Deposit Additional 1000')
    //   console.log('----------------------------------------------')
    //   console.log(`Deposit2 Amount: ${toReadable(approveAmount)}`);
    //   console.log(`Current Balance: ${toReadable(sim2[0])}`);
    //   console.log(`Accrued Rewards: ${toReadable(sim2[1])}`);
    //   console.log(`Withdrawal Fee: ${toReadable(sim2[2])}`);
    //   console.log(`Withdrawal Amount: ${toReadable(sim2[3])}`);
    //   assert.equal(approveAmount, sim[0]);
    //   assert.equal((sim[2].toNumber()+sim[3].toNumber()), sim[0])
    // });

    // it('should handle multiple user deposits', async () => {
    //   await token.giveMeTokens({ from: accounts[1] });
    //   await token.giveMeTokens({ from: accounts[2] });
    //   let balance1 = await token.balanceOf(accounts[0]);
    //   let balance2 = await token.balanceOf(accounts[1]);
    //   let balance3 = await token.balanceOf(accounts[2]);
    //   assert.equal(toReadable(balance1), toReadable(balance2), toReadable(balance3));

      
    //   let approveAmount = await token.balanceOf(accounts[0])/10;
    //   await token.approve(instance.address, (approveAmount), { from: accounts[0] });
    //   await token.approve(instance.address, (approveAmount*2), { from: accounts[1] });
    //   await token.approve(instance.address, (approveAmount*3), { from: accounts[2] });
    //   await instance.depositToken(token.address, { from: accounts[0] });
    //   await instance.depositToken(token.address, { from: accounts[1] });
    //   await instance.depositToken(token.address, { from: accounts[2] });

    //   let sim1u = await instance.simulatedWithdrawal(token.address, accounts[0], { from: accounts[0] });
    //   let sim2u = await instance.simulatedWithdrawal(token.address, accounts[1], { from: accounts[1] });
    //   let sim3u = await instance.simulatedWithdrawal(token.address, accounts[2], { from: accounts[2] });

    //   console.log(' ')
    //   console.log('3 Users Deposit 1000, 2000, 3000, respectively')
    //   console.log('----------------------------------------------')
    //   console.log(`Current Balances:  1: ${toReadable(sim1u[0])}  2: ${toReadable(sim2u[0])}  3: ${toReadable(sim3u[0])}`);
    //   console.log(`Accrued Rewards:   1: ${toReadable(sim1u[1])}  2: ${toReadable(sim2u[1])}  3: ${toReadable(sim3u[1])}`);
    //   console.log(`Withdrawal Fee:    1: ${toReadable(sim1u[2])}  2: ${toReadable(sim2u[2])}  3: ${toReadable(sim3u[2])}`);
    //   console.log(`Withdrawal Amount: 1: ${toReadable(sim1u[3])}  2: ${toReadable(sim2u[3])}  3: ${toReadable(sim3u[3])}`);
    //   assert.equal(toReadable(sim1u[0]), 1000);
    //   assert.equal(toReadable(sim2u[0]), 2000);
    //   assert.equal(toReadable(sim3u[0]), 3000);
    //   assert.equal(toReadable(sim1u[1]), 0, "should be zero");
    //   assert.equal(toReadable(sim2u[1]), 0, "should be zero");
    //   assert.equal(toReadable(sim3u[1]), 0, "should be zero");
      

    //   await instance.withdraw(token.address, { from: accounts[2] });
    //   let finalBalance = await token.balanceOf(accounts[2]);
    //   let finalWalletBalance = await instance.tokenBalance(token.address, accounts[2], { from: accounts[2] })
    //   sim1u = await instance.simulatedWithdrawal(token.address, accounts[0], { from: accounts[0] });
    //   sim2u = await instance.simulatedWithdrawal(token.address, accounts[1], { from: accounts[1] });
    //   sim3u = await instance.simulatedWithdrawal(token.address, accounts[2], { from: accounts[2] });

    //   console.log(' ')
    //   console.log('User3 Withdraws')
    //   console.log(toReadable(finalBalance), toReadable(finalWalletBalance));
    //   console.log('----------------------------------------------')
    //   console.log(`Current Balances:  1: ${toReadable(sim1u[0])}  2: ${toReadable(sim2u[0])}  3: ${toReadable(sim3u[0])}`);
    //   console.log(`Accrued Rewards:   1: ${toReadable(sim1u[1])}  2: ${toReadable(sim2u[1])}  3: ${toReadable(sim3u[1])}`);
    //   console.log(`Withdrawal Fee:    1: ${toReadable(sim1u[2])}  2: ${toReadable(sim2u[2])}  3: ${toReadable(sim3u[2])}`);
    //   console.log(`Withdrawal Amount: 1: ${toReadable(sim1u[3])}  2: ${toReadable(sim2u[3])}  3: ${toReadable(sim3u[3])}`);
    //   console.log('----------------------------------------------')

    //   await instance.withdraw(token.address, { from: accounts[1] });
    //   finalBalance = await token.balanceOf(accounts[1]);
    //   finalWalletBalance = await instance.tokenBalance(token.address, accounts[1], { from: accounts[1] })
    //   sim1u = await instance.simulatedWithdrawal(token.address, accounts[0], { from: accounts[0] });
    //   sim2u = await instance.simulatedWithdrawal(token.address, accounts[1], { from: accounts[1] });
    //   sim3u = await instance.simulatedWithdrawal(token.address, accounts[2], { from: accounts[2] });

    //   console.log(' ')
    //   console.log('User2 Withdraws')
    //   console.log(toReadable(finalBalance), toReadable(finalWalletBalance));
    //   console.log('----------------------------------------------')
    //   console.log(`Current Balances:  1: ${toReadable(sim1u[0])}  2: ${toReadable(sim2u[0])}  3: ${toReadable(sim3u[0])}`);
    //   console.log(`Accrued Rewards:   1: ${toReadable(sim1u[1])}  2: ${toReadable(sim2u[1])}  3: ${toReadable(sim3u[1])}`);
    //   console.log(`Withdrawal Fee:    1: ${toReadable(sim1u[2])}  2: ${toReadable(sim2u[2])}  3: ${toReadable(sim3u[2])}`);
    //   console.log(`Withdrawal Amount: 1: ${toReadable(sim1u[3])}  2: ${toReadable(sim2u[3])}  3: ${toReadable(sim3u[3])}`);

    //   await instance.withdraw(token.address, { from: accounts[0] });
    //   finalBalance = await token.balanceOf(accounts[0]);
    //   finalWalletBalance = await instance.tokenBalance(token.address, accounts[0], { from: accounts[0] })
    //   sim1u = await instance.simulatedWithdrawal(token.address, accounts[0], { from: accounts[0] });
    //   sim2u = await instance.simulatedWithdrawal(token.address, accounts[1], { from: accounts[1] });
    //   sim3u = await instance.simulatedWithdrawal(token.address, accounts[2], { from: accounts[2] });

    //   console.log(' ')
    //   console.log('User1 Withdraws (no fee paid)')
    //   console.log(toReadable(finalBalance), toReadable(finalWalletBalance));
    //   console.log('----------------------------------------------')
    //   console.log(`Current Balances:  1: ${toReadable(sim1u[0])}  2: ${toReadable(sim2u[0])}  3: ${toReadable(sim3u[0])}`);
    //   console.log(`Accrued Rewards:   1: ${toReadable(sim1u[1])}  2: ${toReadable(sim2u[1])}  3: ${toReadable(sim3u[1])}`);
    //   console.log(`Withdrawal Fee:    1: ${toReadable(sim1u[2])}  2: ${toReadable(sim2u[2])}  3: ${toReadable(sim3u[2])}`);
    //   console.log(`Withdrawal Amount: 1: ${toReadable(sim1u[3])}  2: ${toReadable(sim2u[3])}  3: ${toReadable(sim3u[3])}`);
      

    //   // console.log(`Current Balance: ${toReadable(sim[0])}`);
    //   // console.log(`Accrued Rewards: ${toReadable(sim[1])}`);
    //   // console.log(`Withdrawal Fee: ${toReadable(sim[2])}`);
    //   // console.log(`Withdrawal Amount: ${toReadable(sim[3])}`);
    //   // console.log(`Deposit2 Amount: ${toReadable(approveAmount)}`);
    //   // console.log(`Current Balance: ${toReadable(sim2[0])}`);
    //   // console.log(`Accrued Rewards: ${toReadable(sim2[1])}`);
    //   // console.log(`Withdrawal Fee: ${toReadable(sim2[2])}`);
    //   // console.log(`Withdrawal Amount: ${toReadable(sim2[3])}`);

    // });
    // it('should handle multiple user deposits with repeats', async () => {
    //   await token.giveMeTokens({ from: accounts[1] });
    //   await token.giveMeTokens({ from: accounts[2] });
    //   let balance1 = await token.balanceOf(accounts[0]);
    //   let balance2 = await token.balanceOf(accounts[1]);
    //   let balance3 = await token.balanceOf(accounts[2]);
    //   assert.equal(toReadable(balance1), toReadable(balance2), toReadable(balance3));

      
    //   let approveAmount = await token.balanceOf(accounts[0]);
    //   await token.giveMeTokens({ from: accounts[1] });
    //   await token.giveMeTokens({ from: accounts[1] });
    //   await token.giveMeTokens({ from: accounts[1] });
    //   await token.giveMeTokens({ from: accounts[1] });
    //   await token.giveMeTokens({ from: accounts[2] });
    //   await token.giveMeTokens({ from: accounts[2] });
    //   await token.giveMeTokens({ from: accounts[2] });
    //   await token.giveMeTokens({ from: accounts[0] });
    //   await token.giveMeTokens({ from: accounts[0] });
    //   await token.approve(instance.address, (approveAmount), { from: accounts[0] });
    //   await token.approve(instance.address, (approveAmount*2), { from: accounts[1] });
    //   await token.approve(instance.address, (approveAmount*3), { from: accounts[2] });
    //   await instance.depositToken(token.address, { from: accounts[0] });
    //   await instance.depositToken(token.address, { from: accounts[1] });
    //   await instance.depositToken(token.address, { from: accounts[2] });
    //   await token.approve(instance.address, (approveAmount), { from: accounts[1] });
    //   await instance.depositToken(token.address, { from: accounts[1] });
    //   await token.approve(instance.address, (approveAmount*2), { from: accounts[1] });
    //   await instance.depositToken(token.address, { from: accounts[1] });

    //   let sim1u = await instance.simulatedWithdrawal(token.address, accounts[0], { from: accounts[0] });
    //   let sim2u = await instance.simulatedWithdrawal(token.address, accounts[1], { from: accounts[1] });
    //   let sim3u = await instance.simulatedWithdrawal(token.address, accounts[2], { from: accounts[2] });

    //   console.log(' ')
    //   console.log('3 Users Deposit 10000, 20000, 30000, respectively')
    //   console.log('Then User2 makes 2 additional deposits of 10000 and 20000')
    //   console.log('----------------------------------------------')
    //   console.log(`Current Balances:  1: ${toReadable(sim1u[0])}  2: ${toReadable(sim2u[0])}  3: ${toReadable(sim3u[0])}`);
    //   console.log(`Accrued Rewards:   1: ${toReadable(sim1u[1])}  2: ${toReadable(sim2u[1])}  3: ${toReadable(sim3u[1])}`);
    //   console.log(`Withdrawal Fee:    1: ${toReadable(sim1u[2])}  2: ${toReadable(sim2u[2])}  3: ${toReadable(sim3u[2])}`);
    //   console.log(`Withdrawal Amount: 1: ${toReadable(sim1u[3])}  2: ${toReadable(sim2u[3])}  3: ${toReadable(sim3u[3])}`);
      
    //   await instance.withdraw(token.address, { from: accounts[2] });
    //   let finalBalance = await token.balanceOf(accounts[2]);
    //   let finalWalletBalance = await instance.tokenBalance(token.address, accounts[2], { from: accounts[2] })
    //   sim1u = await instance.simulatedWithdrawal(token.address, accounts[0], { from: accounts[0] });
    //   sim2u = await instance.simulatedWithdrawal(token.address, accounts[1], { from: accounts[1] });
    //   sim3u = await instance.simulatedWithdrawal(token.address, accounts[2], { from: accounts[2] });

    //   console.log(' ')
    //   console.log('User3 Withdraws')
    //   console.log(toReadable(finalBalance), toReadable(finalWalletBalance));
    //   console.log('----------------------------------------------')
    //   console.log(`Current Balances:  1: ${toReadable(sim1u[0])}  2: ${toReadable(sim2u[0])}  3: ${toReadable(sim3u[0])}`);
    //   console.log(`Accrued Rewards:   1: ${toReadable(sim1u[1])}  2: ${toReadable(sim2u[1])}  3: ${toReadable(sim3u[1])}`);
    //   console.log(`Withdrawal Fee:    1: ${toReadable(sim1u[2])}  2: ${toReadable(sim2u[2])}  3: ${toReadable(sim3u[2])}`);
    //   console.log(`Withdrawal Amount: 1: ${toReadable(sim1u[3])}  2: ${toReadable(sim2u[3])}  3: ${toReadable(sim3u[3])}`);
    //   console.log('----------------------------------------------')

    //   await instance.withdraw(token.address, { from: accounts[1] });
    //   finalBalance = await token.balanceOf(accounts[1]);
    //   finalWalletBalance = await instance.tokenBalance(token.address, accounts[1], { from: accounts[1] })
    //   sim1u = await instance.simulatedWithdrawal(token.address, accounts[0], { from: accounts[0] });
    //   sim2u = await instance.simulatedWithdrawal(token.address, accounts[1], { from: accounts[1] });
    //   sim3u = await instance.simulatedWithdrawal(token.address, accounts[2], { from: accounts[2] });

    //   console.log(' ')
    //   console.log('User2 Withdraws')
    //   console.log(toReadable(finalBalance), toReadable(finalWalletBalance));
    //   console.log('----------------------------------------------')
    //   console.log(`Current Balances:  1: ${toReadable(sim1u[0])}  2: ${toReadable(sim2u[0])}  3: ${toReadable(sim3u[0])}`);
    //   console.log(`Accrued Rewards:   1: ${toReadable(sim1u[1])}  2: ${toReadable(sim2u[1])}  3: ${toReadable(sim3u[1])}`);
    //   console.log(`Withdrawal Fee:    1: ${toReadable(sim1u[2])}  2: ${toReadable(sim2u[2])}  3: ${toReadable(sim3u[2])}`);
    //   console.log(`Withdrawal Amount: 1: ${toReadable(sim1u[3])}  2: ${toReadable(sim2u[3])}  3: ${toReadable(sim3u[3])}`);

    //   await instance.withdraw(token.address, { from: accounts[0] });
    //   finalBalance = await token.balanceOf(accounts[0]);
    //   finalWalletBalance = await instance.tokenBalance(token.address, accounts[0], { from: accounts[0] })
    //   sim1u = await instance.simulatedWithdrawal(token.address, accounts[0], { from: accounts[0] });
    //   sim2u = await instance.simulatedWithdrawal(token.address, accounts[1], { from: accounts[1] });
    //   sim3u = await instance.simulatedWithdrawal(token.address, accounts[2], { from: accounts[2] });

    //   console.log(' ')
    //   console.log('User1 Withdraws (no fee paid)')
    //   console.log(toReadable(finalBalance), toReadable(finalWalletBalance));
    //   console.log('----------------------------------------------')
    //   console.log(`Current Balances:  1: ${toReadable(sim1u[0])}  2: ${toReadable(sim2u[0])}  3: ${toReadable(sim3u[0])}`);
    //   console.log(`Accrued Rewards:   1: ${toReadable(sim1u[1])}  2: ${toReadable(sim2u[1])}  3: ${toReadable(sim3u[1])}`);
    //   console.log(`Withdrawal Fee:    1: ${toReadable(sim1u[2])}  2: ${toReadable(sim2u[2])}  3: ${toReadable(sim3u[2])}`);
    //   console.log(`Withdrawal Amount: 1: ${toReadable(sim1u[3])}  2: ${toReadable(sim2u[3])}  3: ${toReadable(sim3u[3])}`);
