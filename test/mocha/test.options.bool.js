var Command = require('../../').Command
  , program = new Command()
  , should = require('should');

describe('options.bool', function() {
  it('set bool true and --no bool false', function() {
    program
      .version('0.0.1')
      .option('-p, --pepper', 'add pepper')
      .option('-c, --no-cheese', 'remove cheese');

    program.parse(['node', 'test', '--pepper']);
    program.pepper.should.be.true;
    program.cheese.should.be.true;
  });
});
