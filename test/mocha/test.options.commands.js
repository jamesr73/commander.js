var Command = require('../../').Command
  , program = new Command()
  , sinon = require('sinon')
  , should = require('should');

program
  .version('0.0.1')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook')

var envValue = "";
var cmdValue = "";
var customHelp = false;

var sandbox, stubExit, stubError, stubOut;

program
  .command('setup [env]')
  .description('run setup commands for all envs')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .option("-o, --host [host]", "Host to use")
  .action(function (env, options) {
    var mode = options.setup_mode || "normal";
    env = env || 'all';

    envValue = env;
  });

program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .option("-t, --target [target]", "Target to use")
  .action(function (cmd, options) {
    cmdValue = cmd;
  }).on("--help", function () {
    customHelp = true;
  });

program
  .command('*')
  .action(function (env) {
    console.log('deploying "%s"', env);
  });

describe('options.commands', function() {
  it('set top level option if command not provided', function() {
    program.parse(['node', 'test', '--config', 'conf']);
    program.config.should.equal("conf");
    program.commands[0].should.not.have.property.setup_mode;
    program.commands[1].should.not.have.property.exec_mode;
    envValue.should.equal("");
    cmdValue.should.equal("");
  });
  it('set top level option and command arg and option', function() {
    program.parse(['node', 'test', '--config', 'conf1', 'setup', '--setup_mode', 'mode3', 'env1']);
    program.config.should.equal("conf1");
    program.commands[0].setup_mode.should.equal("mode3");
    program.commands[0].should.not.have.property.host;
    envValue.should.equal("env1");
  });
  it('set top level option and command arg and options', function() {
    program.parse(['node', 'test', '--config', 'conf2', 'setup', '--setup_mode', 'mode3', '-o', 'host1', 'env2']);
    program.config.should.equal("conf2");
    program.commands[0].setup_mode.should.equal("mode3");
    program.commands[0].host.should.equal("host1");
    envValue.should.equal("env2");
  });
  it('set top level option and command arg and short option', function() {
    program.parse(['node', 'test', '--config', 'conf3', 'setup', '-s', 'mode4', 'env3']);
    program.config.should.equal("conf3");
    program.commands[0].setup_mode.should.equal("mode4");
    envValue.should.equal("env3");
  });
  it('set top level option and command arg and option in different order', function() {
    program.parse(['node', 'test', '--config', 'conf4', 'exec', '--exec_mode', 'mode1', 'exec1']);
    program.config.should.equal("conf4");
    program.commands[1].exec_mode.should.equal("mode1");
    program.commands[1].should.not.have.property.target;
    cmdValue.should.equal("exec1");
  });
  it('set top level option and command arg with short option', function() {
    program.parse(['node', 'test', '--config', 'conf5', 'exec', '-e', 'mode2', 'exec2']);
    program.config.should.equal("conf5");
    program.commands[1].exec_mode.should.equal("mode2");
    cmdValue.should.equal("exec2");
  });
  it('set top level option and command arg with mixed long and short options', function() {
    program.parse(['node', 'test', '--config', 'conf6', 'exec', '--target', 'target1', '-e', 'mode2', 'exec3']);
    program.config.should.equal("conf6");
    program.commands[1].exec_mode.should.equal("mode2");
    program.commands[1].target.should.equal("target1");
    cmdValue.should.equal("exec3");
  });
  it('set top level option and command option via command alias', function() {
    program.parse(['node', 'test', '--config', 'conf7', 'ex', '-e', 'mode3', 'exec4']);
    program.config.should.equal("conf7");
    program.commands[1].exec_mode.should.equal("mode3");
    program.commands[1].should.not.have.property.target;
    cmdValue.should.equal("exec4");
  });
  it('doesn\'t have a test for alias of executable subcommand');
  describe('command help', function() {
    beforeEach(function() {
      sandbox = sinon.sandbox.create();
      stubExit = sandbox.stub(process, 'exit').throws();
      stubError = sandbox.stub(console, 'error');
      stubOut = sandbox.stub(process.stdout, 'write');
    });
    afterEach(function() {
      sandbox.restore();
    });

    it('displays command --help on request', function() {
      try {
        program.parse(['node', 'test', '--config', 'conf6', 'exec', '--help']);
        'should not get here'.should.not.equal('got here');
      } catch (error) {
        program.config.should.equal("conf6");
        customHelp.should.be.true;
        stubOut.firstCall.args[0].should.match(/Usage: exec|ex/);
      } finally {
        stubOut.restore(); // restore stdout to write test result
      }
    });
    it('enforces required command option', function() {
      try {
        program.parse(['node', 'test', '--config', 'conf', 'exec', '-t', 'target1', 'exec1', '-e']);
        'should not get here'.should.not.equal('got here');
      } catch (error) {
        stubError.secondCall.args[0].should.match(/error: option `%s' argument missing/);
      } finally {
        stubOut.restore(); // restore stdout to write test result
      }
    });
  });
});
