const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
let compiled = require(`./build/Inbox.json`);

const provider = new HDWalletProvider(
  'kite forward vote broom useless cup wolf quit rigid atom fashion enforce',
  'https://rinkeby.infura.io/v3/a1306d88cae94f458a1b85f17c7686c1'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiled.abi)
    .deploy({ 
        data: '0x' +compiled.bytecode, 
        arguments: ['Hi there!'] })
    .send({from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();