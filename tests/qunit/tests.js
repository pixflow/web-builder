var wp = _ ;
var orginalHtml = document.getElementById('karma-tests').innerHTML ;

//insert default html to karma test
function addHtml() {

	document.getElementById('karma-tests').innerHTML = orginalHtml;

}

//new karma builder models
function RCreateModels() {

	_.each( JSON.parse( builderModels ), function ( model ) {
		karmaBuilder.karmaModels.add( model );
	});
	addHtml();

}

// return existing models in collection
function getModelsAttributes( models ) {

	var karmaTestResult = [];
	_.each( models, function( model ) {
		karmaTestResult.push( model.attributes );
	});
	return karmaTestResult;

}

( function ( $, karmaBuilder ) {

QUnit.test( "changeRowLayout() when the current grid layout is equal the new grid", function ( assert ) {

	karmaBuilder.karmaModels.reset();
	RCreateModels();
	var	newGrid = [ 5, 5, 2 ] ,
		karmaTestResult  ,
		sectionView = new karmaBuilder.section({
			el    : $('[data-element-key="firtstrow_12312"]') ,
			model : karmaBuilder.karmaModels.models[0]
		}) ,
		karmaResult = [
			{
				'element_key' 			: "firtstrow_12312" ,
				'shortcode_name'        : 'karma_section' ,
				'order'                 : 1 ,
				'parent_key'             :  0 ,
				'shortcode_content'     : '' ,
				'shortcode_attributes'  : {
					'space'       : "20"
				} ,
			} ,
			{
				'element_key'			 : "12a12" ,
				'shortcode_name'        : 'karma_column' ,
				'order'                 : 1 ,
				'parent_key'             : 'firtstrow_12312' ,
				'shortcode_content'     : 'test' ,
				'shortcode_attributes'  : {
					lg_size     : 5 ,
					md_size     : 5,
					sm_size     : 5,
					xl_size     : 5,
				} ,
			} ,
			{
				'element_key'			 : "1r312" ,
				'shortcode_name'        : 'karma_column' ,
				'order'                 : 2 ,
				'parent_key'             : 'firtstrow_12312' ,
				'shortcode_content'     : 'test' ,
				'shortcode_attributes'  : {
					lg_size     : 5 ,
					md_size     : 5,
					sm_size     : 5,
					xl_size     : 5,
				} ,
			} ,
			{
				'element_key'			 : "ssssscolumn_12g12" ,
				'shortcode_name'        : 'karma_column' ,
				'order'                 : 3 ,
				'parent_key'             : 'firtstrow_12312' ,
				'shortcode_content'     : 'test' ,
				'shortcode_attributes'  : {
					lg_size     : 2 ,
					md_size     : 2,
					sm_size     : 2,
					xl_size     : 2,
				} ,
			}
		];
	sectionView.changeRowLayout( newGrid );

	_.each( karmaBuilder.karmaModels.models, function( model ) {
			karmaTestResult.push( model.attributes );
	});

	assert.deepEqual( karmaTestResult, karmaResult );

});

QUnit.test( "changeRowLayout() when the current grid layout is bigger the new grid", function ( assert ) {

	karmaBuilder.karmaModels.reset();
	RCreateModels();
	var	newGrid = [ 8, 4 ] ,
		karmaTestResult,
		sectionView = new karmaBuilder.section({
			el    : $('[data-element-key="firtstrow_12312"]') ,
			model : karmaBuilder.karmaModels.models[0]
		}) ,
		karmaResult = [
			{
				'shortcode_name'        : 'karma_section' ,
				'order'                 : 1 ,
				'parent_key'             :  0 ,
				'shortcode_content'     : '' ,
				'shortcode_attributes'  : {
					'space'       : "20"
				} ,
				'element_key'  : "firtstrow_12312"
			} ,
			{
				'shortcode_name'        : 'karma_column' ,
				'order'                 : 1 ,
				'parent_key'             : 1 ,
				'shortcode_content'     : 'test' ,
				'shortcode_attributes'  : {
					lg_size     : 8 ,
					md_size     : 8,
					sm_size     : 8,
					xl_size     : 8,
				} ,
				'element_key'  : "12a12"
			} ,
			{
				'shortcode_name'        : 'karma_column' ,
				'order'                 : 2 ,
				'parent_key'             : 1 ,
				'shortcode_content'     : 'test' ,
				'shortcode_attributes'  : {
					lg_size     : 4 ,
					md_size     : 4,
					sm_size     : 4,
					xl_size     : 4,
				} ,
				'element_key'  : "1r312"
			}
		];

	sectionView.changeRowLayout( newGrid );

	karmaTestResult = getModelsAttributes(karmaBuilder.karmaModels.models);

	assert.deepEqual( karmaTestResult, karmaResult );

});

QUnit.test( "changeRowLayout() when the current grid layout is smaller the new grid", function ( assert ) {

		karmaBuilder.karmaModels.reset();
		RCreateModels();
		var	newGrid = [ 8, 2, 1, 1 ] ,
			karmaTestResult,
			sectionView = new karmaBuilder.section({
				el    : $('[data-element-key="firtstrow_12312"]') ,
				model : karmaBuilder.karmaModels.models[0]
			}) ,
			karmaResult = [
				{
					'element_key'			 : "firtstrow_12312" ,
					'shortcode_name'        : 'karma_section' ,
					'order'                 : 1 ,
					'parent_key'             :  0 ,
					'shortcode_content'     : '' ,
					'shortcode_attributes'  : {
						'space'       : "20"
					} ,
				} ,
				{
					'element_key'			 : "12a12" ,
					'shortcode_name'        : 'karma_column' ,
					'order'                 : 1 ,
					'parent_key'             : 1 ,
					'shortcode_content'     : 'test' ,
					'shortcode_attributes'  : {
						lg_size     : 8 ,
						md_size     : 8,
						sm_size     : 8,
						xl_size     : 8,
					} ,
				} ,
				{
					'element_key'			 : "1r312" ,
					'shortcode_name'        : 'karma_column' ,
					'order'                 : 2 ,
					'parent_key'             : 1 ,
					'shortcode_content'     : 'test' ,
					'shortcode_attributes'  : {
						lg_size     : 2 ,
						md_size     : 2,
						sm_size     : 2,
						xl_size     : 2,
					} ,
				} ,
				{
					'element_key'			 : "ssssscolumn_12g12" ,
					'shortcode_name'        : 'karma_column' ,
					'order'                 : 3 ,
					'parent_key'             : 1 ,
					'shortcode_content'     : 'test' ,
					'shortcode_attributes'  : {
						lg_size     : 1 ,
						md_size     : 1,
						sm_size     : 1,
						xl_size     : 1,
					} ,
				} ,
				{
					'shortcode_name'        : 'karma_column' ,
					'order'                 : 4 ,
					'parent_key'             : 1 ,
					'shortcode_content'     : '' ,
					'shortcode_attributes'  : {
						lg_size     : 1 ,
						md_size     : 1,
						sm_size     : 1,
						xl_size     : 1,
					} ,
				}
			];

		sectionView.changeRowLayout( newGrid );

	karmaTestResult = getModelsAttributes(karmaBuilder.karmaModels.models);
		delete 	karmaTestResult[ karmaTestResult.length - 1 ].shortcode_attributes.element_key ;
		assert.deepEqual( karmaTestResult, karmaResult );

	});

QUnit.test( "changeRowLayout() grid sum should be 12", function ( assert ) {

		karmaBuilder.karmaModels.reset();
		RCreateModels();
		var	newGrid = [ 8, 2, 1, 1, 1 ] ,
			karmaTestResult ,
			sectionView = new karmaBuilder.section({
				el    : $('[data-element-key="firtstrow_12312"]') ,
				model : karmaBuilder.karmaModels.models[0]
			}) ,
			karmaResult = [
				{
					'element_key'			 : "firtstrow_12312" ,
					'shortcode_name'        : 'karma_section' ,
					'order'                 : 1 ,
					'parent_key'             :  0 ,
					'shortcode_content'     : '' ,
					'shortcode_attributes'  : {
						'space'       : "20"
					} ,
				} ,
				{
					'element_key' 			: "12a12" ,
					'shortcode_name'        : 'karma_column' ,
					'order'                 : 2 ,
					'parent_key'             : "firtstrow_12312" ,
					'shortcode_content'     : 'test' ,
					'shortcode_attributes'  : {
						lg_size     : '4' ,
						md_size     : '4',
						sm_size     : '4',
						xl_size     : '4',
					} ,
				} ,
				{
					'element_key'			: "1r312" ,
					'shortcode_name'        : 'karma_column' ,
					'order'                 : 3 ,
					'parent_key'             : "firtstrow_12312" ,
					'shortcode_content'     : 'test' ,
					'shortcode_attributes'  : {
						lg_size     : '4' ,
						md_size     : '4',
						sm_size     : '4',
						xl_size     : '4',
					} ,
				} ,
				{
					'element_key' 			: "ssssscolumn_12g12" ,
					'shortcode_name'        : 'karma_column' ,
					'order'                 : 4 ,
					'parent_key'             : "firtstrow_12312" ,
					'shortcode_content'     : 'test' ,
					'shortcode_attributes'  : {
						lg_size     : '4',
						md_size     : '4',
						sm_size     : '4',
						xl_size     : '4',
					} ,
				}
			];

		sectionView.changeRowLayout( newGrid );
		karmaTestResult = getModelsAttributes(karmaBuilder.karmaModels.models);

		assert.deepEqual( karmaTestResult, karmaResult );

	});

/**
* It is Delete Elements Test
*/
QUnit.test("destroy() Check if model and its child has removed", function (assert) {

	karmaBuilder.karmaModels.reset();
	RCreateModels();
	var karmaTestResult,
		karmaResult = [],
		sectionView = new karmaBuilder.section({
			el    : $('[data-element-key="firtstrow_12312"]') ,
			model : karmaBuilder.karmaModels.models[0]
		}) ;

	sectionView.model.destroy();
	karmaTestResult = getModelsAttributes(karmaBuilder.karmaModels.models);
	assert.deepEqual( karmaTestResult, karmaResult );

});

/**
 * It is Delete Elements Test
 */
QUnit.test("destroy() Check if element and its child has removed", function (assert) {

		karmaBuilder.karmaModels.reset();
		RCreateModels();
		var karmaTestResult,
			karmaResult = 0,
			sectionView = new karmaBuilder.section({
				el    : $('[data-element-key="firtstrow_12312"]') ,
				model : karmaBuilder.karmaModels.models[0]
			}) ;

		sectionView.model.destroy();
		karmaTestResult = document.querySelectorAll('.karma-builder-element').length;
		assert.deepEqual( karmaTestResult, karmaResult );

	});

/**
 * It is Delete Elements Test
 */
QUnit.test("destroy() Check if a child removed its parent still exist", function (assert) {

	karmaBuilder.karmaModels.reset();
	RCreateModels();
	var karmaTestResult,
		karmaResult = [
			{
				'element_key'			 : "firtstrow_12312" ,
				'shortcode_name'        : 'karma_section' ,
				'order'                 : 1 ,
				'parent_key'             :  0 ,
				'shortcode_content'     : '' ,
				'shortcode_attributes'  : {
					'space'       : "20"
				} ,
			} ,
			{
				'element_key'			 : "12a12" ,
				'shortcode_name'        : 'karma_column' ,
				'order'                 : 2 ,
				'parent_key'             : "firtstrow_12312" ,
				'shortcode_content'     : 'test' ,
				'shortcode_attributes'  : {
					lg_size     : "4" ,
					md_size     : "4" ,
					sm_size     : "4" ,
					xl_size     : "4" ,
				} ,
			} ,
			{
				'element_key'			 : "ssssscolumn_12g12" ,
				'shortcode_name'        : 'karma_column' ,
				'order'                 : 4 ,
				'parent_key'             : "firtstrow_12312" ,
				'shortcode_content'     : 'test' ,
				'shortcode_attributes'  : {
					lg_size     : "4" ,
					md_size     : "4" ,
					sm_size     : "4" ,
					xl_size     : "4" ,
				} ,
			} ,
		],
		sectionView = new karmaBuilder.section({
			el    : $('[data-element-key="1r312"]') ,
			model : karmaBuilder.karmaModels.models[2]
		}) ;

	sectionView.model.destroy();
	karmaTestResult = getModelsAttributes(karmaBuilder.karmaModels.models);
	assert.deepEqual( karmaTestResult, karmaResult );

});

/**
 * It is Delete Elements Test
 */
QUnit.test("destroy() Check if a child removed its parent still exist", function (assert) {

	karmaBuilder.karmaModels.reset();
	RCreateModels();
	var karmaTestResult,
		karmaResult = 3,
		sectionView = new karmaBuilder.section({
			el    : $('[data-element-key="1r312"]') ,
			model : karmaBuilder.karmaModels.models[2]
		}) ;

	sectionView.model.destroy();
	karmaTestResult = document.querySelectorAll('.karma-builder-element').length;
	assert.deepEqual( karmaTestResult, karmaResult );

});

/***
 * It is Save Elements Test
 */
var ajaxurl = 'test.txt';
QUnit.test("assert.async() saveContent", function ( assert ) {

	var done = assert.async();
	karmaBuilder.view.prototype.prepareAjax().done( function ( response ) {

		response = JSON.parse(response);
		assert.equal(response.result, "true");

	});
	done();

});

/**
 * It is Update Elements Test
 */

QUnit.test("karmaUpdateModel", function ( assert ) {

	var shortcodes = {};
	for ( var i = 1; i < 5; i++ ) {

		shortcodes[i + '_model'] = new karmaBuilder.model({
			"shortcode_id": i + 10,
			"shortcode_name": "shortcode_test",
			"parent_key": 0,
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
		karmaBuilder.karmaModels.add(shortcodes[i + '_model']);
		shortcodes['sh' + i] = new karmaBuilder.shortcodes({

			template: _.template('<div class="row karma-builder-element delete-element <%= attributes.shortcode_attributes.bg  %>" data-element-id="<%= attributes.shortcode_id %>" ><%= attributes.shortcode_id %></div>'),
			model: shortcodes[i + '_model'],

		});

	}
	$('*[data-element-id="14"]').hover(function (e) {

		e.preventDefault();
		alert(2);

	}, function (e) {

		alert(3);

	});

	delete karmaBuilder.karmaModels.where({'shortcode_id': 12})[0].attributes.shortcode_attributes.element_key;
	assert.deepEqual(karmaBuilder.karmaModels.where({'shortcode_id': 12})[0].attributes, {
		"shortcode_id": 12,
		"shortcode_name": "shortcode_test",
		"parent_id": 0,
		"order": 1,
		"shortcode_attributes": {
			"color": "red",
			"font": "tahoma",
			"bg": "green",
			"style": 'font-family: "sans-serif";',
			"radius": '18',
			"title": 'this is a " title " ',
			"sub_title": "this is a subtitle's test"
		},
		"shortcode_content": ""
	});
	document.querySelector('div[data-element-id="11"]').remove();
	karmaBuilder.karmaModels.reset();

});

/**
 * It is find children of Element Test
 */
QUnit.test("karmaFindChildren", function (assert) {

	karmaBuilder.karmaModels.reset();
	var shortcodes = {};
	for (var i = 1; i < 5; i++) {
		if (i == 2 || i == 3 || i == 4) {
			var parentId = 1;
		} else {
			var parentId = 0;
		}
		shortcodes['model_' + i] = new karmaBuilder.model({
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
		karmaBuilder.karmaModels.add(shortcodes['model_' + i]);

		shortcodes['sh' + i] = new karmaBuilder.section({
			model: shortcodes['model_' + i]
		});
	}
	var expectedResult = [
		shortcodes['model_2'],
		shortcodes['model_3'],
		shortcodes['model_4']
	];

	var testResult = shortcodes.sh1.findChildren();
	assert.deepEqual(testResult, expectedResult);

});

/**
 * test get current grid layout
 */
QUnit.test("karmaCurrentGrid", function ( assert ) {

	karmaBuilder.karmaModels.reset();
	var shortcodes = [];
	for (var i = 1; i < 5; i++) {
		if (i == 2 || i == 3 || i == 4) {
			var parentId = 1;
			var width = 4;
		} else {
			var parentId = 0;
			var width = 0;
		}
		shortcodes['model_' + i] = new karmaBuilder.model({

			"shortcode_name": "shortcode_test",
			"parent_key": parentId,
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
		karmaBuilder.karmaModels.add(shortcodes['model_' + i]);

		shortcodes['sh' + i] = new karmaBuilder.section({
			model: shortcodes['model_' + i]
		});
	}
	var testResult = shortcodes.sh1.currentGrid();
	var expectedResult = [4, 4, 4];
	assert.deepEqual(  testResult, expectedResult );

});

/**
 * test calculate new grid before append new column
 */
QUnit.test("karmaCalculateNewGrid", function (assert) {

	karmaBuilder.karmaModels.reset();
	var shortcodes = [];
	for (var i = 1; i < 5; i++) {
		if (i == 2 || i == 3 || i == 4) {
			var parentId = 1;
			var width = 4;
		} else {
			var parentId = 0;
			var width = 0;
		}
		shortcodes['model_' + i] = new karmaBuilder.model({

			"shortcode_name": "shortcode_test",
			"parent_key": parentId,
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
		karmaBuilder.karmaModels.add(shortcodes['model_' + i]);

		shortcodes['sh' + i] = new karmaBuilder.section({
			model: shortcodes['model_' + i]
		});
	}
	var testResult = shortcodes.sh1.calculateNewGrid();
	var expectedResult = [4, 4, 3, 1];
	assert.deepEqual(testResult, expectedResult);

});

/**
 * Test update element attributes
 */

QUnit.test("setAttribute", function (assert) {

	var elements = {};
	elements['model'] = new karmaBuilder.model({

		"shortcode_name": "shortcode_test",
		"parent_key": 0,
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
	karmaBuilder.karmaModels.add(elements['model']);
	elements['el'] = new karmaBuilder.shortcodes({

		template: _.template('<div class="row karma-builder-element delete-element <%= attributes.shortcode_attributes.bg  %>" data-element-id="<%= attributes.shortcode_id %>" ><%= attributes.shortcode_id %></div>'),
		model: elements['model'],

	});

	elements.el.setAttributes({

		"font": "tahoma",
		"bg": "green",
		"style": 'font-family: "sans-serif";',

	});

	assert.deepEqual(karmaBuilder.karmaModels.where({'shortcode_id': 10})[0].attributes, {

		"shortcode_name": "shortcode_test",
		"parent_key": 0,
		"order": 1,
		"shortcode_attributes": {
			"color": "red",
			"font": "tahoma",
			"bg": "green",
			"style": 'font-family: "sans-serif";',
			"radius": '18',
			"title": 'this is a " title " ',
			"sub_title": "this is a subtitle's test"
		},
		"shortcode_content": ""
	});
	karmaBuilder.karmaModels.reset();

});

} )( jQuery, karmaBuilder );