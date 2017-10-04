/**
 * It is Create Elements Test
 */

var builder = new karmaBuilder();

QUnit.test ( 'karmaCreateModel', function ( assert ) {

	var kamraModelResult = {
		1 : {
			'type'       : 'shortcode_test',
			'parent_id'  : '0',
			'attr'       : 'color:\'red\' font:\'arial\' bg:\'#000fff\''

		}
	};

	var model = { type : 'shortcode_test', parent_id : '0', attr : 'color:\'red\' font:\'arial\' bg:\'#000fff\'' };
	assert.deepEqual ( builder.createShortcode ( model ), kamraModelResult );

});

/**
 * It is Delete Elements Test
 */

QUnit.test ( "karmaDeleteModel", function ( assert ) {

	var karmaDeleteResult = {
		1 : {
			'type'       : 'shortcode_test',
			'parent_id'  : '0',
			'attr'       : 'color:\'red\' font:\'arial\' bg:\'#000fff\''
		}
	};
	builder.karmaModel = {
		1 : {
			'type'       : 'shortcode_test',
			'parent_id'  : '0',
			'attr'       : 'color:\'red\' font:\'arial\' bg:\'#000fff\''
		},
		2 : {
			'type'       : 'shortcode_test',
			'parent_id'  : '0',
			'attr'       : 'color:\'red\' font:\'arial\' bg:\'#000fff\''
		}
	};

	assert.deepEqual( builder.deleteShortcode( 2 ), karmaDeleteResult );

});

QUnit.test("assert.async() saveContent", function (assert) {

	var done = assert.async();
	builder.prepareAjax().done( function ( response ) {
		response = JSON.parse( response );
		assert.equal( response.result, true );
	})
	done();

});