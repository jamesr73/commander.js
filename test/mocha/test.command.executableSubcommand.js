var exec = require('child_process').exec
  , path = require('path')
  , should = require('should');

var bin = path.join(__dirname, '../fixtures/pm')

describe('command.executableSubcommand', function() {
  it('notifies missing subcommand executable', function(done) {
    exec(bin + ' list', function (error, stdout, stderr) {
      //stderr.should.equal('\n  pm-list(1) does not exist, try --help\n\n');
      // TODO error info are not the same in between <=v0.8 and later version
      should.notEqual(0, stderr.length);
      done();
    });
  });
  it('runs specified subcommand executable', function(done) {
    exec(bin + ' install', function (error, stdout, stderr) {
      stdout.should.equal('install\n');
      done();
    });
  });
  it('runs specified subcommand executable with .js extension', function(done) {
    exec(bin + ' publish', function (error, stdout, stderr) {
      stdout.should.equal('publish\n');
      done();
    });
  });
  it('notifies subcommand executable without sufficient permissions', function(done) {
    exec(bin + ' search', function (error, stdout, stderr) {
      // TODO error info are not the same in between <v0.10 and v0.12
      should.notEqual(0, stderr.length);
      done();
    });
  });
  it('runs specified subcommand executable via symlink (a-la global install)', function(done) {
    bin = path.join(__dirname, '../fixtures/pmlink')
    exec(bin + ' install', function (error, stdout, stderr) {
      stdout.should.equal('install\n');
      done();
    });
  });
});
