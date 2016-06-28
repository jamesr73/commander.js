var Command = require('../../').Command
  , program = new Command()
  , should = require('should');

describe('literal.args', function() {
  it('sets args after -- as args not options', function() {
    program
      .version('0.0.1')
      .option('-f, --foo', 'add some foo')
      .option('-b, --bar', 'add some bar');

    program.parse(['node', 'test', '--foo', '--', '--bar', 'baz']);
    program.foo.should.be.true;
    should.equal(undefined, program.bar);
    program.args.should.eql(['--bar', 'baz']);
  });
});
