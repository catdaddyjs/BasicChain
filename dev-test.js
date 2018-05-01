const Blockchain = require('./blockchain');

const blockchain = new Blockchain();

for (let i = 0; i < 100; i++) {
    console.log(blockchain.addBlock(`New Block ${i}`).toString());
}