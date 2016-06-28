var exec = require('child_process').exec
  , path = require('path')
  , should = require('should');


describe('command.executableSubcommandDefault', function() {
  var bin = path.join(__dirname, '../fixtures/pm')

  it('runs default executable when command specified explicity', function(done) {
    exec(bin + ' default', function(error, stdout, stderr) {
      stdout.should.equal('default\n');
      done();
    });
  });
  it('runs default executable when command omitted', function(done) {
    exec(bin, function(error, stdout, stderr) {
      stdout.should.equal('default\n');
      done();
    });
  });

  it('doesn\'t need duplicate tests from command.executableSubcommand');
});
