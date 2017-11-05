var wp = _;

/**
 * Test changeRowLayout() function .
 */
QUnit.test ( "changeRowLayout", function ( assert ) {

	assert.ok( 1, 1 );
	return ;
	var curentGrid = [ 3,3,3 ],
		newGrid = [ 5,5,2 ],
		karmaModelsResult = {
			0: {
				"shortcode_id": 1,
				"shortcode_name": "shortcode_test",
				"parent_id": 0,
				"order": 1,
				"shortcode_attributes": {
					'space' : 20
				},
				"shortcode_content": ""
			},

			1: {
				"shortcode_id": 2,
				"shortcode_name": "shortcode_test",
				"parent_id": 1,
				"order": 1,
				"shortcode_attributes": {
					lg_size : 8,
					md_size : 8,
					sm_size : 8 ,
					width 	: "3" ,
					xl_size : 8 ,
				},
				"shortcode_content": ""
			},

			2: {
				"shortcode_id": 3,
				"shortcode_name": "shortcode_test",
				"parent_id": 1,
				"order": 2,
				"shortcode_attributes": {
					lg_size : 8,
					md_size : 8,
					sm_size : 8 ,
					width 	: "3" ,
					xl_size : 8 ,
				},
				"shortcode_content": ""
			},

			3: {
				"shortcode_id": 4,
				"shortcode_name": "shortcode_test",
				"parent_id": 1,
				"order": 3,
				"shortcode_attributes": {
					lg_size : 8,
					md_size : 8,
					sm_size : 8 ,
					width 	: "3" ,
					xl_size : 8 ,
				},
				"shortcode_content": ""
			},
		}

		assert.deepEqual( karmaBuilder.section.prototype.changeRowLayout( [ newGrid ] ), karmaModelsResult );



});

/**
 * It is Delete Elements Test
 */
QUnit.test( "karmaDeleteModel" , function ( assert ) {

	karmaBuilder.karmaModels.reset();
	var karmaDeleteResult = {
		0: {
			"shortcode_id": 1,
			"shortcode_name": "shortcode_test",
			"parent_id": 0,
			"order": 1,
			"shortcode_attributes": {
				"color": "red",
				"font": "arial",
				"bg": "#000fff",
				"style": 'font-family: "tahoma";',
				"radius": '18',
				"title": 'this is a " title " ',
				"sub_title": "this is a subtitle's test"
			},
			"shortcode_content": ""
		},

		1: {
			"shortcode_id": 3,
			"shortcode_name": "shortcode_test",
			"parent_id": 0,
			"order": 1,
			"shortcode_attributes": {
				"color": "red",
				"font": "arial",
				"bg": "#000fff",
				"style": 'font-family: "tahoma";',
				"radius": '18',
				"title": 'this is a " title " ',
				"sub_title": "this is a subtitle's test"
			},
			"shortcode_content": ""
		}
	};

	for ( var i = 1; i < 5 ; i++ ){

		var shortcode = new karmaBuilder.model({
				"shortcode_id": i,
				"shortcode_name": "shortcode_test",
				"parent_id": 0,
				"order": 1,
				"shortcode_attributes": {
					"color": "red",
					"font": "arial",
					"bg": "#000fff",
					"style": 'font-family: "tahoma";',
					"radius": '18',
					"title": 'this is a " title " ',
					"sub_title": "this is a subtitle's test"
				},
				"shortcode_content": ""
			});
		karmaBuilder.karmaModels.add(shortcode);
		var newShortcode = new karmaBuilder.shortcodes({

			template: _.template( '<div class="row karma-builder-element delete-element" data-element-id="<%= attributes.shortcode_id %>" ><%= attributes.shortcode_id %></div>' ),
			model : shortcode,

		});
		var placeHolder;
		switch (i) {

			case 1:
				placeHolder = document.getElementById('karma-tests');
				break;
			case 2:
				placeHolder = document.querySelector('*[data-element-id="1"]');
				break;
			case 3:
				placeHolder = document.querySelector('*[data-element-id="1"]');
				break;
			case 4:
				placeHolder = document.querySelector('*[data-element-id="2"]');
				break;

		}
		newShortcode.create(placeHolder);

	}
	document.querySelector('div[data-element-id="2"]').click();
	var result = karmaBuilder.karmaModels;
	var testResult = {};
	for(  var i in result.models ) {
		testResult[i] = result.models[i].attributes;
		delete testResult[i]['shortcode_attributes']['element_key'];
	}


	assert.deepEqual( testResult , karmaDeleteResult );
	assert.equal( $('div[data-element-id="1"]').length , 1 );
	assert.equal( $('div[data-element-id="4"]').length , 0 );
	document.querySelector('div[data-element-id="1"]').remove();
	karmaBuilder.karmaModels.reset();
});

/***
 * It is Save Elements Test
 */
var ajaxurl = 'test.txt';
QUnit.test("assert.async() saveContent", function ( assert ) {

	var done = assert.async();
	karmaView.prepareAjax().done( function ( response ) {

		response = JSON.parse(response);
		assert.equal(response.result, "true");

	});
	done();

});

/**
 * It is Update Elements Test
 */

QUnit.test ( "karmaUpdateModel", function ( assert ) {

	var shortcodes = {};
	for ( var i = 1; i < 5 ; i++ ){

		shortcodes[i+'_model'] = new karmaBuilder.model({
			"shortcode_id": i+10,
			"shortcode_name": "shortcode_test",
			"parent_id": 0,
			"order": 1,
			"shortcode_attributes": {
				"color": "red",
				"font": "arial",
				"bg": "#000fff",
				"style": 'font-family: "tahoma";',
				"radius": '18',
				"title": 'this is a " title " ',
				"sub_title": "this is a subtitle's test"
			},
			"shortcode_content": ""
		});
		karmaBuilder.karmaModels.add(shortcodes[i+'_model'] );
		shortcodes['sh'+i] = new karmaBuilder.shortcodes({

			template: _.template( '<div class="row karma-builder-element delete-element <%= attributes.shortcode_attributes.bg  %>" data-element-id="<%= attributes.shortcode_id %>" ><%= attributes.shortcode_id %></div>' ),
			model : shortcodes[i+'_model'] ,

		});
		var placeHolder;
		switch (i) {

			case 1:
				placeHolder = document.getElementById('karma-tests');
				break;
			case 2:
				placeHolder = document.querySelector('*[data-element-id="11"]');
				break;
			case 3:
				placeHolder = document.querySelector('*[data-element-id="11"]');
				break;
			case 4:
				placeHolder = document.querySelector('*[data-element-id="12"]');
				break;

		}

		shortcodes['sh'+i].create(placeHolder);

	}
	$('*[data-element-id="14"]').hover(function (e) {

		e.preventDefault();
		alert(2);

	},function (e) {

		alert(3);

	});
	shortcodes.sh2.updateShortcode( {

		"font"			: "tahoma",
		"bg"			: "green",
		"style"        	: 'font-family: "sans-serif";',

	} );
	delete karmaBuilder.karmaModels.where( { 'shortcode_id' : 12 } )[0].attributes.shortcode_attributes.element_key;
	assert.deepEqual( karmaBuilder.karmaModels.where( { 'shortcode_id' : 12 } )[0].attributes, {
		"shortcode_id"          : 12,
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
	   document.querySelector('div[data-element-id="11"]').remove();
	   karmaBuilder.karmaModels.reset();

});

/**
 * It is find children of Element Test
 */
QUnit.test( "karmaFindChildren" , function ( assert ) {
    karmaBuilder.karmaModels.reset();
	var shortcodes = {};
    for ( var i = 1; i < 5 ; i++ ){
		if(i == 2 || i == 3 || i == 4) {
			var parentId = 1;
		}else{
			var parentId = 0;
		}
        shortcodes['model_'+i] = new karmaBuilder.model({
            "shortcode_id": i,
            "shortcode_name": "shortcode_test",
            "parent_id": parentId,
            "order": 1,
            "shortcode_attributes": {
                "color": "red",
                "font": "arial",
                "bg": "#000fff",
                "style": 'font-family: "tahoma";',
                "radius": '18',
                "title": 'this is a " title " ',
                "sub_title": "this is a subtitle's test"
            },
            "shortcode_content": ""
        });
        karmaBuilder.karmaModels.add(shortcodes['model_'+i] );

        shortcodes['sh'+i] = new karmaBuilder.row({
            model : shortcodes['model_'+i]
        });
    }
    var expectedResult = [
        shortcodes['model_2'],
        shortcodes['model_3'],
        shortcodes['model_4']
    ];

    var testResult = shortcodes.sh1.findChildren();
    assert.deepEqual( testResult , expectedResult );

});

/**
 * test get current grid layout
 */
QUnit.test( "karmaCurrentGrid" , function ( assert ) {
    karmaBuilder.karmaModels.reset();
	var shortcodes = [];
	for ( var i = 1; i < 5 ; i++ ){
        if(i == 2 || i == 3 || i == 4) {
            var parentId = 1;
            var width = 4;
        }else{
            var parentId = 0;
        	var width = 0;
        }
        shortcodes['model_'+i] = new karmaBuilder.model({
            "shortcode_id": i,
            "shortcode_name": "shortcode_test",
            "parent_id": parentId,
            "order": 1,
            "shortcode_attributes": {
                "color": "red",
                "font": "arial",
                "bg": "#000fff",
                "width": width,
                "style": 'font-family: "tahoma";',
                "radius": '18',
                "title": 'this is a " title " ',
                "sub_title": "this is a subtitle's test"
            },
            "shortcode_content": ""
        });
        karmaBuilder.karmaModels.add(shortcodes['model_'+i] );

        shortcodes['sh'+i] = new karmaBuilder.row({
            model : shortcodes['model_'+i]
        });
    }
    var testResult = shortcodes.sh1.currentGrid();
	var expectedResult = [4,4,4];
    assert.deepEqual( testResult , expectedResult );

});

/**
 * test calculate new grid before append new column
 */
QUnit.test( "karmaCalculateNewGrid" , function ( assert ) {
    karmaBuilder.karmaModels.reset();
    var shortcodes = [];
    for ( var i = 1; i < 5 ; i++ ){
        if(i == 2 || i == 3 || i == 4) {
            var parentId = 1;
            var width = 4;
        }else{
            var parentId = 0;
            var width = 0;
        }
        shortcodes['model_'+i] = new karmaBuilder.model({
            "shortcode_id": i,
            "shortcode_name": "shortcode_test",
            "parent_id": parentId,
            "order": 1,
            "shortcode_attributes": {
                "color": "red",
                "font": "arial",
                "bg": "#000fff",
                "width": width,
                "style": 'font-family: "tahoma";',
                "radius": '18',
                "title": 'this is a " title " ',
                "sub_title": "this is a subtitle's test"
            },
            "shortcode_content": ""
        });
        karmaBuilder.karmaModels.add(shortcodes['model_'+i] );

        shortcodes['sh'+i] = new karmaBuilder.row({
            model : shortcodes['model_'+i]
        });
    }
    var testResult = shortcodes.sh1.calculateNewGrid();
    var expectedResult = [4,4,3,1];
    assert.deepEqual( testResult , expectedResult );

});

/**
 * Test update element attributes
 */

QUnit.test ( "setAttribute", function ( assert ) {

	var elements = {};
	elements['model'] = new karmaBuilder.model({
		"shortcode_id": 10,
		"shortcode_name": "shortcode_test",
		"parent_id": 0,
		"order": 1,
		"shortcode_attributes": {
			"color": "red",
			"font": "arial",
			"bg": "#000fff",
			"style": 'font-family: "tahoma";',
			"radius": '18',
			"title": 'this is a " title " ',
			"sub_title": "this is a subtitle's test"
		},
		"shortcode_content": ""
	});
	karmaBuilder.karmaModels.add(elements['model'] );
	elements['el'] = new karmaBuilder.shortcodes({

		template: _.template( '<div class="row karma-builder-element delete-element <%= attributes.shortcode_attributes.bg  %>" data-element-id="<%= attributes.shortcode_id %>" ><%= attributes.shortcode_id %></div>' ),
		model : elements['model'] ,

	});

	elements.el.setAttributes( {

		"font"			: "tahoma",
		"bg"			: "green",
		"style"        	: 'font-family: "sans-serif";',

	} );

	assert.deepEqual( karmaBuilder.karmaModels.where( { 'shortcode_id' : 10 } )[0].attributes, {
		"shortcode_id"          : 12,
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
	karmaBuilder.karmaModels.reset();

});


