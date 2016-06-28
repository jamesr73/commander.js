var Command = require('../../').Command
  , program = new Command()
  , should = require('should');

describe('options.args.optional', function() {
  it('sets option to true if omitted', function() {
    program
      .version('0.0.1')
      .option('-c, --cheese [type]', 'optionally specify the type of cheese');

    program.parse(['node', 'test', '--cheese']);
    program.cheese.should.be.true;
  });
});
