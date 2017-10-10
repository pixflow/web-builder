var karmaView = new karmaBuilder.view();
/** Create object from builder */
var shortcode_instance = new karmaBuilder.shortcodes({

	template: _.template( '<div class="row delete-elements" ><%= attributes.shortcode_id %></div>' )

});


/**
 * Test addShortcodeModel
 */
QUnit.test('addShortcodeModel', function ( assert ) {

	var div = document.createElement( 'div' );
	div.setAttribute( 'data-name', 'karma-row' );
	karmaView.dropElement(div,document.getElementById('qunit'));
	assert.deepEqual( document.querySelectorAll( '.row' ).length, 1 );

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

	karmaBuilder.karmaModels.add({1: {
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
	}});
	karmaBuilder.karmaModels.add({2 : {
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
	}});
	karmaBuilder.karmaModels.add({3 : {
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
	}});
	karmaBuilder.karmaModels.add({4 :  {
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
	}});


	var c = shortcode_instance.deleteShortcode( {2 : {
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
	}});
	console.log(c.models)
	var result = {};
	for(  var i in c.models) {
		result[i] = c.models[i].attributes;
	}
	assert.deepEqual( result , karmaDeleteResult );
	assert.equal( document.querySelectorAll('.karma-vc-row').length, 1 );
	assert.equal( document.querySelectorAll('.shortcode').length, 0 );

});

/***
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

QUnit.test ( "karmaUpdateModel", function ( assert ) {

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
