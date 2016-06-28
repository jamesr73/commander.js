var Command = require('../../').Command
  , program = new Command()
  , sinon = require('sinon').sandbox.create()
  , should = require('should');

describe('command.help', function() {
  it('commandHelp() returns help for specified command', function() {
    program.command('mycommand [options]');
    // program.parse(['node', 'test']);
    program.commandHelp().should.equal('\n  Commands:\n\n    mycommand [options]\n');
  });
});
