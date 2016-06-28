var Command = require('../../').Command
  , program = new Command()
  , sinon = require('sinon')
  , should = require('should');

describe('command.name', function() {
  it('should be extracted from description', sinon.test(function() {
    this.stub(process, 'exit');
    this.stub(process.stdout, 'write');
    this.stub(process.stderr, 'write'); // ARGH!! test/run discards stderr!!

    // TODO:
    // fathom the implication of 'unknown option: --help' being written to stderr

    program
      .command('mycommand [options]', 'this is my command');
    program.parse(['node', 'test']);

    program.name.should.be.a.Function;
    program.name().should.equal('test');
    program.commands[0].name().should.equal('mycommand');
    program.commands[1].name().should.equal('help');

    var output = process.stdout.write.args[0];

    output[0].should.containEql([
      '    mycommand [options]  this is my command'
    ].join('\n'));
  }));
});
