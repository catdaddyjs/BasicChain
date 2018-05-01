
const Block = require('./block');

describe('Block', () => {

    let data, lastBlock, block;

    beforeEach(() => {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it('sets the `data` to match the input', () => {
        expect(block.data).toEqual(data);
    });

    it('sets the `lastHash` to match hash of the last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('lowers the difficulty for slowly mined block', () => {
        expect(Block.adjustDifficulty(block, block.timeStamp + 360000))
            .toEqual(block.difficulty - 1);
    });

    it('raises the difficulty for blocks mined to easily', () => {
        expect(Block.adjustDifficulty(block, block.timeStamp + 1))
            .toEqual(block.difficulty + 1);
    });
});