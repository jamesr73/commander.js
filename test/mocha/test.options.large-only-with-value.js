var Command = require('../../').Command
  , program = new Command()
  , should = require('should');

describe('options.large-only-with-value', function () {
  it('assigns value to option with no short alias', function () {
    program
      .version('0.0.1')
      .option('--longflag [value]', 'A long only flag with a value');

    program.parse(['node', 'test', '--longflag', 'something']);
    program.longflag.should.equal('something');
  });
});
