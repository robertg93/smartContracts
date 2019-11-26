const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const crowdfoundPath = path.resolve(__dirname, 'contracts', 'Crowdfound.sol');
const source = fs.readFileSync(crowdfoundPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Crowdfound.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};
/// @dev Gotta change this either.
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
    console.log(contract);
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace('.sol','') + '.json'),
        output[contract]
    );
}