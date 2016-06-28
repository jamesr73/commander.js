var Command = require('../../').Command
  , program = new Command()
  , should = require('should');

describe('options.bool.small.combined', function() {
  it('sets bool true and --no bool false with combined short options', function() {
    program
      .version('0.0.1')
      .option('-p, --pepper', 'add pepper')
      .option('-c, --no-cheese', 'remove cheese');

    program.parse(['node', 'test', '-pc']);
    program.pepper.should.be.true;
    program.cheese.should.be.false;
  });
});
