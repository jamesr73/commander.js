var Command = require('../../').Command
  , program = new Command()
  , should = require('should');

describe('options.large-only', function () {
  it('sets boolean true for long option without alias or value', function () {
    program
      .version('0.0.1')
      .option('--verbose', 'do stuff');

    program.parse(['node', 'test', '--verbose']);
    program.verbose.should.be.true;
  });
});
