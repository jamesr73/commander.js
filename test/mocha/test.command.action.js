var Command = require('../../').Command
  , program = new Command()
  , should = require('should');

describe('command.action', function() {
  it('negates --no option', function() {
    var val = false;
    program
      .command('info [options]')
      .option('-C, --no-color', 'turn off color output')
      .action(function () {
        val = this.color;
      });

    program.parse(['node', 'test', 'info']);

    program.commands[0].color.should.equal(val);
  });
});
