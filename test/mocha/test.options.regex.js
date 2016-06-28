var Command = require('../../').Command
  , program = new Command()
  , should = require('should');

describe('options.regex', function () {
  it('allows option values that match provided regex', function () {
    program
      .version('0.0.1')
      .option('-s, --size <size>', 'Pizza Size', /^(large|medium|small)$/i, 'medium')
      .option('-d, --drink [drink]', 'Drink', /^(Coke|Pepsi|Izze)$/i)

    program.parse('node test -s big -d coke'.split(' '));
    program.size.should.equal('medium');
    program.drink.should.equal('coke');
  });
  it('doesn\'t test option values that do not match provided regex');
});
