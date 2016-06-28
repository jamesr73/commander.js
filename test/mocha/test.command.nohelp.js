var Command = require('../../').Command
	, sinon = require('sinon')
  , should = require('should');

var program, sandbox, stubExit, stubOut, stubError;

program = new Command();
program
	.command('mycommand [options]', 'this is my command');
program
	.command('anothercommand [options]')
	.action(function() { return; });
program
	.command('hiddencommand [options]', 'you won\'t see me', { noHelp: true });
program
	.command('hideagain [options]', null, { noHelp: true })
	.action(function() { return; });

describe('command.nohelp', function() {
	beforeEach(function() {
		sandbox = sinon.sandbox.create();
		stubExit = sandbox.stub(process, 'exit');
		stubOut = sandbox.stub(process.stdout, 'write');
		stubError = sandbox.stub(process.stderr, 'write');
	});

	afterEach(function() {
		sandbox.restore();
	})

	it('should set _noHelp for hidden commands', function() {
		program
			.parse(['node', 'test']);
		program.name.should.be.a.Function;
		program.name().should.equal('test');
		program.commands[0].name().should.equal('mycommand');
		program.commands[0]._noHelp.should.be.false();
		program.commands[1].name().should.equal('anothercommand');
		program.commands[1]._noHelp.should.be.false();
		program.commands[2].name().should.equal('hiddencommand');
		program.commands[2]._noHelp.should.be.true;
		program.commands[3].name().should.equal('hideagain');
		program.commands[3]._noHelp.should.be.true();
		program.commands[4].name().should.equal('help');
		stubOut.restore();
	});

	it('should output help without showing hidden commands', function() {
		program.outputHelp();

		process.stdout.write.calledOnce.should.be.true();
		process.stdout.write.args.length.should.equal(1);

		var output = process.stdout.write.args[0];

		var expected = [
			'  Commands:',
			'',
			'    mycommand [options]       this is my command',
			'    anothercommand [options]',
			'    help [cmd]                display help for [cmd]'
		].join('\n');
		output[0].indexOf(expected).should.not.be.equal(-1);

		stubOut.restore();
	});
});
