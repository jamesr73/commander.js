var Command = require('../../').Command
  , program = new Command()
  , should = require('should');

describe('options.bool.no', function() {
  it('sets missing bool undefined and --no bool false', function() {
    program
      .version('0.0.1')
      .option('-p, --pepper', 'add pepper')
      .option('-c|--no-cheese', 'remove cheese');

    program.parse(['node', 'test', '--no-cheese']);
    should.equal(undefined, program.pepper);
    program.cheese.should.be.false;
  });
});
