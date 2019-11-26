const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compiledFactory = require('../ethereum/build/CrowdfoundFactory.json');
const compiledCrowdfound = require('../ethereum/build/Crowdfound.json');


let accounts;
let factory;
let crwodfoundAddress;
let crowdfound;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
  
    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({data: compiledFactory.bytecode})
        .send({ from: accounts[0], gas: '10000000000' });
  
    await factory.methods.createCrowdfound('100').send({
      from: accounts[0],
      gas: '1000000'
    });
  
    [crwodfoundAddress] = await factory.methods.getDeployedCrowdfound().call();
    crowdfound = await new web3.eth.Contract( compiledCrowdfound.interface, crwodfoundAddress);
  });

  describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
      assert.ok(factory.options.address);
      assert.ok(crowdfound.options.address);
    });
  });
