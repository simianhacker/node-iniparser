var assert = require('assert'),
	iniparser = require('../lib/node-iniparser');

module.exports = {
	'async read file': function(){
		iniparser.parse('./files/test.ini', function(err, config){
			assert.equal(err, null);
		});
	},
	'async read non-existing file': function(){
		iniparser.parse('./files/doesnotexists.ini', function(err, config){
			assert.equal(err.errno, 2);
			assert.equal(config, null);
		});
	},
	'sync read file': function(){
		var config = iniparser.parseSync('./files/test.ini');
		assert.notEqual(config, null);
	},
	'sync read non-existing file': function(){
		assert.throws(function(){
			var config = iniparser.parseSync('./files/doesnotexists.ini');
		});
	},
	'async read file and look for variable': function(){
		iniparser.parse('./files/test.ini', function(err, config){
			assert.equal(err, null);
			assert.equal(config.foo, 'bar');
		});
	},
	'async read file and look for section': function(){
		iniparser.parse('./files/test.ini', function(err, config){
			assert.equal(err, null);
			assert.notEqual(config.worlds, null);
			assert.equal(config.worlds.earth, 'awesome');
			assert.notEqual(config.section2, null);
			assert.equal(config.section2.bar, 'foo');
		});
	},
	'sync read file and look for variable': function(){
		var config = iniparser.parseSync('./files/test.ini');
		assert.equal(config.foo, 'bar');
	},
	'sync read file and look for section': function(){
		var config = iniparser.parseSync('./files/test.ini');
		assert.notEqual(config.worlds, null);
		assert.equal(config.worlds.earth, 'awesome');
		assert.notEqual(config.section2, null);
		assert.equal(config.section2.bar, 'foo');
	},
	'varible with space at the end': function () {
		var config = iniparser.parseSync('./files/test.ini');
		assert.notEqual('bar ', config.var_with_space_at_end);
		assert.equal('bar', config.var_with_space_at_end);
	},
  'value with spaces': function () {
    var config = iniparser.parseSync('./files/test.ini');
    assert.notEqual('foo bar ', config.value_with_spaces);
    assert.equal('foo bar', config.value_with_spaces);
  },
  'value with double quotes': function () {
    var config = iniparser.parseSync('./files/test.ini');
    assert.notEqual('"Foo Bar"', config.value_with_double_quotes);
    assert.equal('Foo Bar', config.value_with_double_quotes);
  },
  'value with single quotes': function () {
    var config = iniparser.parseSync('./files/test.ini');
    assert.notEqual("'Foo Bar'", config.value_with_single_quotes);
    assert.equal('Foo Bar', config.value_with_single_quotes);
  },
  'values whith irish names': function () {
    var config = iniparser.parseSync('./files/test.ini');
    assert.notEqual("O", config.value_with_oshea_single_quotes);
    assert.equal('O\'Shea', config.value_with_single_quote_oshea_single_quote);
    assert.equal('O"Shea', config.value_with_double_quote_oshea_single_quote);
    assert.equal('O\'Shea', config.value_with_single_quote_oshea_double_quote);
    assert.equal('O"Shea', config.value_with_double_quote_oshea_double_quote);
    assert.equal('\'""\'', config.value_with_a_varaity_of_quotes);
  }

};
