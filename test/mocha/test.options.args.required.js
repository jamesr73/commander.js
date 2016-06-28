var util = require('util')
  , Command = require('../../').Command
  , program = new Command()
  , sinon = require('sinon')
  , should = require('should');

var sandbox, stubError, stubExit;

describe('options.args.required', function() {
  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    stubError = sandbox.stub(console, 'error');
    stubExit = sandbox.stub(process, 'exit');
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('displays error message when required option is missing', function() {
    program
      .version('0.0.1')
      .option('-c, --cheese <type>', 'optionally specify the type of cheese');

    try {
      program.parse(['node', 'test', '--cheese']);
      // we shouldn't get here, parse should error because we've stubbed process.exit
      'parsed'.should.not.equal('passed');
    } catch(error) {
      stubError.callCount.should.equal(3);
      stubError.args[1].should.deepEqual(
        [ "  error: option `%s' argument missing", '-c, --cheese <type>' ]
      );
    }
  });
});
