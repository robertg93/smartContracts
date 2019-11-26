const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
let compiled = require(`../ethereum/build/Crowdfound.json`);


let accounts;
let factory;
let crwodfoundAddress;
let crowdfound;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
  
    factory = await new web3.eth.Contract(compiled.abi)
        .deploy({data: compiled.bytecode})
        .send({ from: accounts[0], gas: '1000000' });
  
    await factory.methods.createCrowdfound('100').send({
      from: accounts[0],
      gas: '1000000'
    });
  
    [crwodfoundAddress] = await factory.methods.getDeployedCrowdfound().call();
    crowdfound = await new web3.eth.Contract( compiled.interface, crwodfoundAddress);
  });

  describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
      assert.ok(factory.options.address);
      assert.ok(campaign.options.address);
    });
  });

  /*
describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});*/