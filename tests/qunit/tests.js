
/** Create object from builder */
var builder = new karmaBuilder();


/**
 * Test addShortcodeModel
 */

QUnit.test('addShortcodeModel', function ( assert ) {

	var kamraModelResult = {
		1 : {
			"shortcode_id"			: 1,
			"shortcode_name"		: "shortcode_test",
			"parent_id"				: 0,
			"order"                 : 1,
			"shortcode_attributes" : {
				"color"		: "red",
				"font"		: "arial",
				"bg"		: "#000fff",
				"style"		: 'font-family: "tahoma";',
				"radius" 	: '18',
				"title"		: 'this is a " title " ',
				"sub_title"	: "this is a subtitle's test"
			},
			"shortcode_content" : ""
		}
	};

	var model =  {
		"shortcode_id"			: 1,
		"shortcode_name"		: "shortcode_test",
		"parent_id"				: 0,
		"order"                 : 1,
		"shortcode_attributes" : {
			"color"		: "red",
			"font"		: "arial",
			"bg"		: "#000fff",
			"style"		: 'font-family: "tahoma";',
			"radius" 	: '18',
			"title"		: 'this is a " title " ',
			"sub_title"	: "this is a subtitle's test"
		},
		"shortcode_content" : ""
	};
	builder.karmaModel = {};
	assert.deepEqual( builder.addShortcodeModel( model ), kamraModelResult );

});

/**
 * It is Delete Elements Test
 */

QUnit.test( "karmaDeleteModel", function ( assert ) {

	var row = document.createElement( 'div' );
	row.setAttribute( 'data-element-id' , '1' );
	row.setAttribute( 'class' , 'karma-vc-row karma-builder-element' );
	document.body.appendChild( row );

	var column = document.createElement( 'div' );
	column.setAttribute( 'data-element-id' , '2' );
	column.setAttribute( 'class' , 'karma-vc-column karma-builder-element' );
	row.appendChild( column );

	var column2 = document.createElement( 'div' );
	column2.setAttribute( 'data-element-id' , '3' );
	column2.setAttribute( 'class' , 'karma-vc-column karma-builder-element' );
	row.appendChild( column2 );

	var shortcode = document.createElement( 'div' );
	shortcode.setAttribute( 'data-element-id' , '4' );
	shortcode.setAttribute( 'class' , 'shortcode karma-builder-element' );
	column.appendChild( shortcode );

	var karmaDeleteResult = {
		1 : {
			"shortcode_id"          : 1,
			"shortcode_name"        : "shortcode_test",
			"parent_id"             : 0,
			"order"                 : 1,
			"shortcode_attributes" : {
				"color"        	: "red",
				"font"        	: "arial",
				"bg"        	: "#000fff",
				"style"        	: 'font-family: "tahoma";',
				"radius"    	: '18',
				"title"        	: 'this is a " title " ',
				"sub_title"    	: "this is a subtitle's test"
			},
			"shortcode_content" : ""
		},

		3 : {
			"shortcode_id"          : 3,
			"shortcode_name"        : "shortcode_test",
			"parent_id"             : 0,
			"order"                 : 1,
			"shortcode_attributes" : {
				"color"        	: "red",
				"font"        	: "arial",
				"bg"        	: "#000fff",
				"style"        	: 'font-family: "tahoma";',
				"radius"    	: '18',
				"title"        	: 'this is a " title " ',
				"sub_title"    	: "this is a subtitle's test"
			},
			"shortcode_content" : ""
		}
	};

	builder.karmaModel = {
		1: {
			"shortcode_id"          : 1,
			"shortcode_name"        : "shortcode_test",
			"parent_id"             : 0,
			"order"                 : 1,
			"shortcode_attributes" : {
				"color"        	: "red",
				"font"        	: "arial",
				"bg"        	: "#000fff",
				"style"        	: 'font-family: "tahoma";',
				"radius"    	: '18',
				"title"        	: 'this is a " title " ',
				"sub_title"    	: "this is a subtitle's test"
			},
			"shortcode_content" : ""
		},

		2 : {
			"shortcode_id"          : 2,
			"shortcode_name"        : "shortcode_test",
			"parent_id"             : 0,
			"order"                 : 1,
			"shortcode_attributes" : {
				"color"        	: "red",
				"font"        	: "arial",
				"bg"        	: "#000fff",
				"style"        	: 'font-family: "tahoma";',
				"radius"    	: '18',
				"title"        	: 'this is a " title " ',
				"sub_title"    	: "this is a subtitle's test"
			},
			"shortcode_content" : ""
		},

		3 : {
			"shortcode_id"          : 3,
			"shortcode_name"        : "shortcode_test",
			"parent_id"             : 0,
			"order"                 : 1,
			"shortcode_attributes" : {
				"color"        	: "red",
				"font"        	: "arial",
				"bg"        	: "#000fff",
				"style"        	: 'font-family: "tahoma";',
				"radius"    	: '18',
				"title"        	: 'this is a " title " ',
				"sub_title"    	: "this is a subtitle's test"
			},
			"shortcode_content" : ""
		},

		4 :  {
			"shortcode_id"          : 4,
			"shortcode_name"        : "shortcode_test",
			"parent_id"             : 0,
			"order"                 : 1,
			"shortcode_attributes" : {
				"color"        	: "red",
				"font"        	: "arial",
				"bg"        	: "#000fff",
				"style"        	: 'font-family: "tahoma";',
				"radius"    	: '18',
				"title"        	: 'this is a " title " ',
				"sub_title"    	: "this is a subtitle's test"
			},
			"shortcode_content" : ""
		}
	};

	assert.deepEqual( builder.deleteShortcode( 2 ), karmaDeleteResult );
	assert.equal( document.querySelectorAll('.karma-vc-row').length, 1 );
	assert.equal( document.querySelectorAll('.shortcode').length, 0 );

});

/**
 * It is Save Elements Test
 */

var ajaxurl = 'test.txt';
QUnit.test("assert.async() saveContent", function (assert) {

	var done = assert.async();
	builder.prepareAjax().done( function ( response ) {
		response = JSON.parse(response);
		assert.equal(response.result, "true");
	});
	done();

});

/**
 * It is Update Elements Test
 */

QUnit.test( "karmaUpdateModel", function ( assert ) {

	builder.karmaModel = {
		1: {
			"shortcode_id"          : 1,
			"shortcode_name"        : "shortcode_test",
			"parent_id"             : 0,
			"order"                 : 1,
			"shortcode_attributes" : {
				"color"        	: "red",
				"font"        	: "arial",
				"bg"        	: "#000fff",
				"style"        	: 'font-family: "tahoma";',
				"radius"    	: '18',
				"title"        	: 'this is a " title " ',
				"sub_title"    	: "this is a subtitle's test"
			},
			"shortcode_content" : ""
		},

		2 : {
			"shortcode_id"          : 2,
			"shortcode_name"        : "shortcode_test",
			"parent_id"             : 0,
			"order"                 : 1,
			"shortcode_attributes" : {
				"color"        	: "red",
				"font"        	: "arial",
				"bg"        	: "#000fff",
				"style"        	: 'font-family: "tahoma";',
				"radius"    	: '18',
				"title"        	: 'this is a " title " ',
				"sub_title"    	: "this is a subtitle's test"
			},
			"shortcode_content" : ""
		},

		3 : {
			"shortcode_id"          : 3,
			"shortcode_name"        : "shortcode_test",
			"parent_id"             : 0,
			"order"                 : 1,
			"shortcode_attributes" : {
				"color"        	: "red",
				"font"        	: "arial",
				"bg"        	: "#000fff",
				"style"        	: 'font-family: "tahoma";',
				"radius"    	: '18',
				"title"        	: 'this is a " title " ',
				"sub_title"    	: "this is a subtitle's test"
			},
			"shortcode_content" : ""
		},

		4 :  {
			"shortcode_id"          : 4,
			"shortcode_name"        : "shortcode_test",
			"parent_id"             : 0,
			"order"                 : 1,
			"shortcode_attributes" : {
				"color"        	: "red",
				"font"        	: "arial",
				"bg"        	: "#000fff",
				"style"        	: 'font-family: "tahoma";',
				"radius"    	: '18',
				"title"        	: 'this is a " title " ',
				"sub_title"    	: "this is a subtitle's test"
			},
			"shortcode_content" : ""
		}
	};
	builder.updateShortcode( 2,{
		"font"			: "tahoma",
		"bg"			: "green",
		"style"        	: 'font-family: "sans-serif";',
	} )

	assert.deepEqual( builder.karmaModel[2], {
		"shortcode_id"          : 2,
		"shortcode_name"        : "shortcode_test",
		"parent_id"             : 0,
		"order"                 : 1,
		"shortcode_attributes" : {
			"color"        	: "red",
			"font"        	: "tahoma",
			"bg"        	: "green",
			"style"        	: 'font-family: "sans-serif";',
			"radius"    	: '18',
			"title"        	: 'this is a " title " ',
			"sub_title"    	: "this is a subtitle's test"
		},
		"shortcode_content" : ""
	} );

});