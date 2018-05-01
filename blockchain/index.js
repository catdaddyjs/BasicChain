const Block = require('./block');

class Blockchain {

    constructor() {
        this.chain = [Block.generateGenesisBlock()];
    }

    addBlock(data) {
        const prevBlock = this.chain[this.chain.length - 1];
        const block = Block.mineBlock(prevBlock, data);
        this.chain.push(block);

        console.log(block);

        return block;
    }

    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.generateGenesisBlock())) return false;

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const prevBlock = chain[i - 1];

            if (block.prevHash !== prevBlock.hash || block.hash !== Block.blockHash(block)) {
                return false;
            }
        }

        return true;
    }

    replaceChain(newChain) {

        if (newChain.length <= this.chain.length) {
            console.log('received chain is not longer than the current chain.');
            return;
        } else if (!this.isValidChain(newChain)) {
            console.log('The received chain is not valid.');
            return;
        }

        console.log('Replacing blockchain with the new chain.');
        this.chain = newChain;

    }

}

module.exports = Blockchain;