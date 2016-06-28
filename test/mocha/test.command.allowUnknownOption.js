var Command = require('../../').Command
  , sinon = require('sinon')
  , should = require('should');

var program, sandbox, stubError, stubExit;

describe('command.allowUnknownOption', function() {
  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    stubError = sandbox.stub(console, 'error');
    stubExit = sandbox.stub(process, 'exit');
    program = new Command();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('default false, errors on unknown option', function() {
    program
      .version('0.0.1')
      .option('-p, --pepper', 'add pepper');
    program.parse('node test -m'.split(' '));

    stubError.callCount.should.equal(3);
  });
  it('default false, subcommand errors on unknown option', function() {
    program
      .command('sub')
      .action(function () {
      });
    program.parse('node test sub -m'.split(' '));

    stubError.callCount.should.equal(3);
    stubExit.calledOnce.should.be.true();
  });
  it('set true, allows unknown option', function() {
    program
      .version('0.0.1')
      .option('-p, --pepper', 'add pepper');
    program
      .allowUnknownOption()
      .parse('node test -m'.split(' '));

    stubError.callCount.should.equal(0);
    stubExit.calledOnce.should.be.false();
  });
  it('set true, subcommand allows unknown option', function() {
    program
      .command('sub2')
      .allowUnknownOption()
      .action(function () {
      });
    program.parse('node test sub2 -m'.split(' '));

    stubError.callCount.should.equal(0);
    stubExit.calledOnce.should.be.false();
  });
});
