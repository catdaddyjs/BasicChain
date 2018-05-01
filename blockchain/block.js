
const SHA256 = require('crypto-js/sha256');

const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {

    constructor(timestamp, prevHash, hash, data, nonce, difficulty) {
        this.timeStamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block - 
            Prev Hash : ${ this.prevHash.substring(0, 10) }
            Hash      : ${ this.hash.substring(0, 10) }
            Nonce     : ${ this.nonce }
            Difficulty: ${ this.difficulty }
            Data      : ${ this.data }
            Timestamp : ${ this.timestamp };
        `;
    }

    static generateGenesisBlock() {
         return new this('Genesis Block', '--------', 'FIRST_BLOCK', [], 0, DIFFICULTY);
    }

    static mineBlock(prevBlock, data) {
        const prevHash = prevBlock.hash;
        let hash, timeStamp;
        let { difficulty } = prevBlock;
        let nonce = 0;

        do {
            nonce++;
            timeStamp = Date.now();
            difficulty = this.adjustDifficulty(prevBlock, timeStamp);
            hash = Block.hash(timeStamp, prevHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timeStamp, prevHash, hash, data, nonce, difficulty);
    }

    static adjustDifficulty(prevBlock, currentTime) {
        let { difficulty } = prevBlock;

        difficulty = prevBlock.timeStamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;

        return difficulty;
    }

    static hash(timeStamp, prevHash, data, nonce, difficulty) {
        return SHA256(`${timeStamp}${prevHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const { timeStamp, prevHash, data, nonce, difficulty } = block;
        return Block.hash(timeStamp, prevHash, data, nonce, difficulty);
    }

}

module.exports = Block;