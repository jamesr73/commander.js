var Command = require('../../').Command
  , program = new Command()
  , should = require('should');

describe('options.args.optional.given', function() {
  it('sets optional option', function() {
    program
      .version('0.0.1')
      .option('-c, --cheese [type]', 'optionally specify the type of cheese');

    program.parse(['node', 'test', '--cheese', 'feta']);
    program.cheese.should.equal('feta');
  });
});
