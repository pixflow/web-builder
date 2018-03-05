var orginalHtml = document.getElementById('karma-tests').innerHTML;

//insert default html to karma test
function addHtml() {

	document.getElementById('karma-tests').innerHTML = orginalHtml;

}

//new karma builder models
function RCreateModels() {

	addHtml();
	init();

}

function init() {

	var model = Backbone.Model.extend({

		defaults: {
			"shortcode_name": "karma_section",
			"shortcode_attributes": {},
			"shortcode_content": "",
			"element_key": 'defaultKey',
			"order": 1,
			"parent_key": 'defaultParentKey'
		}

	});

	var KarmaShortcodesCollection = Backbone.Collection.extend({model: model});

	karmaBuilder.karmaModels = new KarmaShortcodesCollection(JSON.parse(builderModels));
	window.KarmaView = new karmaBuilder.view({collection: karmaBuilder.karmaModels});

}

// return existing models in collection
function getModelsAttributes(models) {

	var karmaTestResult = [];
	_.each(models, function (model) {
		if (model.attributes.shortcode_attributes.changed) {
			delete model.attributes.shortcode_attributes.changed;
		}
		karmaTestResult.push(model.attributes);
	});
	return karmaTestResult;

}

(function ($, karmaBuilder) {

	QUnit.test ( "createNewElement() Create new image element", function (assert) {

		karmaBuilder.karmaModels.reset();
		RCreateModels();
		var model = {
			shortcode_name : 'karma_image',
			shortcode_content : '',
			element_key : KarmaView.createNewElementKey(),
			shortcode_attributes : $( document ).triggerHandler( 'karma/before/createElement/karma_image' ),
			order : 1 ,
			parent_key :  '1r312'
		}
		var CID = karmaBuilder.karmaModels.add( model ).cid;
		$('[data-element-key="1r312"]').html( KarmaView.createBuilderModel( karmaBuilder.karmaModels.get( CID ) ) );
		KarmaView.createNewElement( 'image', karmaBuilder.karmaModels.get( CID ), true );
		assert.equal( document.querySelectorAll('.karma-image').length, 1 );

	});

	QUnit.test ( "duplicateElement() Check the element have been created", function ( assert ) {

		karmaBuilder.karmaModels.reset();
		RCreateModels();
		var model = {
			shortcode_name : 'karma_image',
			shortcode_content : '',
			element_key : KarmaView.createNewElementKey(),
			shortcode_attributes : $( document ).triggerHandler( 'karma/before/createElement/karma_image' ),
			order : 1 ,
			parent_key :  '1r312'
		}
		var CID = karmaBuilder.karmaModels.add( model ).cid;
		$('[data-element-key="1r312"]').html( KarmaView.createBuilderModel( karmaBuilder.karmaModels.get( CID ) ) );
		var view = KarmaView.createNewElement( 'image', karmaBuilder.karmaModels.get( CID ), true );
		view.duplicateElement();
		assert.equal( document.querySelectorAll('.karma-image').length, 2 );

	});


	QUnit.test ( "REOrderElements() check orders", function (assert) {

		karmaBuilder.karmaModels.reset();
		RCreateModels();
		var model = {
			shortcode_name : 'karma_image',
			shortcode_content : '',
			element_key : KarmaView.createNewElementKey(),
			shortcode_attributes : $( document ).triggerHandler( 'karma/before/createElement/karma_image' ),
			order : 5 ,
			parent_key :  '1r312'
		}
		var CID = karmaBuilder.karmaModels.add( model ).cid;
		$('[data-element-key="1r312"]').html( KarmaView.createBuilderModel( karmaBuilder.karmaModels.get( CID ) ) );
		var view = KarmaView.createNewElement( 'image', karmaBuilder.karmaModels.get( CID ), true );
		KarmaView.$el.trigger( 'karma/after/dropElement', [ '1r312' ] );
		assert.equal( view.model.get( 'order' ), 1 );

	});

	QUnit.test("changeRowLayout() when the current grid layout is equal the new grid", function (assert) {

		karmaBuilder.karmaModels.reset();
		RCreateModels();
		var newGrid = [ 5, 5, 2 ],
			model = {
				shortcode_name : 'karma_section',
				shortcode_content : '',
				element_key : KarmaView.createNewElementKey(),
				shortcode_attributes : { structure: "container", space: "200", extraclass: "", columnspace: "0" },
				order : 2 ,
				parent_key :  ''
			};
		var CID = karmaBuilder.karmaModels.add( model ).cid;
		$('[data-element-key="firtstrow_12312"]').after( KarmaView.createBuilderModel( karmaBuilder.karmaModels.get( CID ) ) );
		var view = KarmaView.createNewElement( 'section', karmaBuilder.karmaModels.get( CID ), true );
		view.changeRowLayout( newGrid );
		assert.deepEqual( view.currentGrid(), newGrid );

	});

	QUnit.test("changeRowLayout() when the current grid layout is bigger the new grid", function (assert) {

		karmaBuilder.karmaModels.reset();
		RCreateModels();
		var newGrid = [ 5, 5, 2 ],
			model = {
				shortcode_name : 'karma_section',
				shortcode_content : '',
				element_key : KarmaView.createNewElementKey(),
				shortcode_attributes : { structure: "container", space: "200", extraclass: "", columnspace: "0" },
				order : 2 ,
				parent_key :  ''
			};
		//document.getElementById('karma-tests').innerHTML = '';
		var CID = karmaBuilder.karmaModels.add( model ).cid;
		$('[data-element-key="firtstrow_12312"]').after( KarmaView.createBuilderModel( karmaBuilder.karmaModels.get( CID ) ) );
		var view = KarmaView.createNewElement( 'section', karmaBuilder.karmaModels.get( CID ), true );
		view.changeRowLayout( newGrid );
		view.changeRowLayout( [ 8, 4 ] );
		assert.deepEqual( view.currentGrid(), [ 8, 4 ] );

	});

	QUnit.test("changeRowLayout() when the current grid layout is smaller the new grid", function (assert) {

		karmaBuilder.karmaModels.reset();
		RCreateModels();
		var newGrid = [ 8, 4 ],
			model = {
				shortcode_name : 'karma_section',
				shortcode_content : '',
				element_key : KarmaView.createNewElementKey(),
				shortcode_attributes : { structure: "container", space: "200", extraclass: "", columnspace: "0" },
				order : 2 ,
				parent_key :  ''
			};
		//document.getElementById('karma-tests').innerHTML = '';
		var CID = karmaBuilder.karmaModels.add( model ).cid;
		$('[data-element-key="firtstrow_12312"]').after( KarmaView.createBuilderModel( karmaBuilder.karmaModels.get( CID ) ) );
		var view = KarmaView.createNewElement( 'section', karmaBuilder.karmaModels.get( CID ), true );
		view.changeRowLayout( newGrid );
		view.changeRowLayout( [ 5, 5, 2 ] );
		assert.deepEqual( view.currentGrid(), [ 5, 5, 2 ] );

	});

	QUnit.test("changeRowLayout() grid sum should be 12", function (assert) {

		karmaBuilder.karmaModels.reset();
		RCreateModels();
		var newGrid = [ 8, 12 ],
			model = {
				shortcode_name : 'karma_section',
				shortcode_content : '',
				element_key : KarmaView.createNewElementKey(),
				shortcode_attributes : { structure: "container", space: "200", extraclass: "", columnspace: "0" },
				order : 2 ,
				parent_key :  ''
			};
		//document.getElementById('karma-tests').innerHTML = '';
		var CID = karmaBuilder.karmaModels.add( model ).cid;
		$('[data-element-key="firtstrow_12312"]').after( KarmaView.createBuilderModel( karmaBuilder.karmaModels.get( CID ) ) );
		var view = KarmaView.createNewElement( 'section', karmaBuilder.karmaModels.get( CID ), true );
		view.changeRowLayout( newGrid );
		assert.deepEqual( view.currentGrid(), [] );

	});

	QUnit.test("destroy() Check the parent model has been removed", function (assert) {

		karmaBuilder.karmaModels.reset();
		RCreateModels();
		var newGrid = [ 5, 5, 2 ],
			model = {
				shortcode_name : 'karma_section',
				shortcode_content : '',
				element_key : KarmaView.createNewElementKey(),
				shortcode_attributes : { structure: "container", space: "200", extraclass: "", columnspace: "0" },
				order : 2 ,
				parent_key :  ''
			};
		var CID = karmaBuilder.karmaModels.add( model ).cid;
		$('body').append( KarmaView.createBuilderModel( karmaBuilder.karmaModels.get( CID ) ) );
		var view = KarmaView.createNewElement( 'section', karmaBuilder.karmaModels.get( CID ), true );
		view.changeRowLayout( newGrid );
		var imageModel = {
			shortcode_name : 'karma_image',
			shortcode_content : '',
			element_key : KarmaView.createNewElementKey(),
			shortcode_attributes : $( document ).triggerHandler( 'karma/before/createElement/karma_image' ),
			order : 1 ,
			parent_key :  '1r312'
		}
		var imgCID = karmaBuilder.karmaModels.add( imageModel ).cid;
		view.$el.find('.karma-column-margin').eq(0).html( KarmaView.createBuilderModel( karmaBuilder.karmaModels.get( imgCID  ) ) );
		var imageView = KarmaView.createNewElement( 'image', karmaBuilder.karmaModels.get( imgCID  ), true );
		view.destroy();

		assert.deepEqual( typeof karmaBuilder.karmaModels.get( CID  ), 'undefined'   );


	});

	QUnit.test("destroy() Check if the child model has been removed correctly", function (assert) {

		karmaBuilder.karmaModels.reset();
		RCreateModels();
		var newGrid = [ 5, 5, 2 ],
			model = {
				shortcode_name : 'karma_section',
				shortcode_content : '',
				element_key : KarmaView.createNewElementKey(),
				shortcode_attributes : { structure: "container", space: "200", extraclass: "", columnspace: "0" },
				order : 2 ,
				parent_key :  ''
			};
		var CID = karmaBuilder.karmaModels.add( model ).cid;
		$('body').append( KarmaView.createBuilderModel( karmaBuilder.karmaModels.get( CID ) ) );
		var view = KarmaView.createNewElement( 'section', karmaBuilder.karmaModels.get( CID ), true );
		view.changeRowLayout( newGrid );
		var imageModel = {
			shortcode_name : 'karma_image',
			shortcode_content : '',
			element_key : KarmaView.createNewElementKey(),
			shortcode_attributes : $( document ).triggerHandler( 'karma/before/createElement/karma_image' ),
			order : 1 ,
			parent_key :  '1r312'
		}
		var imgCID = karmaBuilder.karmaModels.add( imageModel ).cid;
		view.$el.find('.karma-column-margin').eq(0).html( KarmaView.createBuilderModel( karmaBuilder.karmaModels.get( imgCID  ) ) );
		var imageView = KarmaView.createNewElement( 'image', karmaBuilder.karmaModels.get( imgCID  ), true );
		view.destroy();


		assert.deepEqual( typeof karmaBuilder.karmaModels.get( imgCID  ), 'undefined'   );


	});

	QUnit.test("destroy() Check if element and its child has removed", function (assert) {

		karmaBuilder.karmaModels.reset();
		RCreateModels();
		var newGrid = [ 5, 5, 2 ],
			model = {
				shortcode_name : 'karma_section',
				shortcode_content : '',
				element_key : KarmaView.createNewElementKey(),
				shortcode_attributes : { structure: "container", space: "200", extraclass: "", columnspace: "0" },
				order : 2 ,
				parent_key :  ''
			};
		var CID = karmaBuilder.karmaModels.add( model ).cid;
		$('body').append( KarmaView.createBuilderModel( karmaBuilder.karmaModels.get( CID ) ) );
		var view = KarmaView.createNewElement( 'section', karmaBuilder.karmaModels.get( CID ), true );
		view.changeRowLayout( newGrid );
		var elementKey = view.model.get('element_key');
		var imageModel = {
			shortcode_name : 'karma_image',
			shortcode_content : '',
			element_key : KarmaView.createNewElementKey(),
			shortcode_attributes : $( document ).triggerHandler( 'karma/before/createElement/karma_image' ),
			order : 1 ,
			parent_key :  '1r312'
		}
		var imgCID = karmaBuilder.karmaModels.add( imageModel ).cid;
		view.$el.find('.karma-column-margin').eq(0).html( KarmaView.createBuilderModel( karmaBuilder.karmaModels.get( imgCID  ) ) );
		KarmaView.createNewElement( 'image', karmaBuilder.karmaModels.get( imgCID  ), true );
		view.destroy();


		assert.deepEqual( document.querySelectorAll('[data-element-key="' + elementKey + '"]').length, 0   );

	});
	

	QUnit.test("createUnsplashURL() Check if url string is correct", function (assert) {

		var unsplash = new window.top.karmaUnsplash(),
			url = unsplash.createUnsplashURL( 'photos', { page : 12 } );

		assert.equal( url, 'https://api.unsplash.com/photos/?client_id=100034b1de5815805647bef611d9ed7575b6c1812daa39730488d32be4461e12&page=12' );

	});

	QUnit.test("cacheTimeExpire() Check for time expire cache in unsplash images", function (assert) {

		var unsplash = new window.top.karmaUnsplash(),
				date = new Date(),
				yesterday = date.setDate( date.getDate() - 1 );

		localStorage.setItem( 'karmaUnsplashImagesTime', yesterday );
		assert.equal( unsplash.cacheTimeExpire(), true );

	});


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
				"element_key": i,
				"shortcode_name": "shortcode_test",
				"parent_key": parentId,
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

	QUnit.test("karmaCurrentGrid", function ( assert ) {

		karmaBuilder.karmaModels.reset();
		karmaBuilder.karmaModels.reset();
		var shortcodes = [];
		for (var i = 1; i < 5; i++) {
			if (i == 2 || i == 3 || i == 4) {
				var parentKey = 1;
				var width = 4;
			} else {
				var parentKey = 0;
				var width = 0;
			}

			shortcodes['model_' + i] = new karmaBuilder.model({
				"element_key": i,
				"shortcode_name": "shortcode_test",
				"parent_key": parentKey,
				"order": 1,
				"shortcode_attributes": {
					"color": "red",
					"font": "arial",
					"bg": "#000fff",
					"sm_size": width,
					"md_size": width,
					"lg_size": width,
					"xl_size": width,
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

	QUnit.test("karmaCalculateNewGrid", function (assert) {

		karmaBuilder.karmaModels.reset();
		var shortcodes = [];
		for (var i = 1; i < 5; i++) {
			if (i == 2 || i == 3 || i == 4) {
				var parentKey = 1;
				var width = 4;
			} else {
				var parentKey = '';
				var width = 0;
			}
			shortcodes['model_' + i] = new karmaBuilder.model({
				"element_key": i,
				"shortcode_name": "shortcode_test",
				"parent_key": parentKey,
				"order": 1,
				"shortcode_attributes": {
					"color": "red",
					"font": "arial",
					"bg": "#000fff",
					"sm_size": width,
					"md_size": width,
					"lg_size": width,
					"xl_size": width,
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

	QUnit.test("setAttribute", function (assert) {

		var elements = {};
		elements['model'] = new karmaBuilder.model({
			"element_key": 10,
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

			template: _.template('<div class="row karma-builder-element delete-element <%= attributes.shortcode_attributes.bg  %>" data-element-id="<%= attributes.element_key %>" ><%= attributes.element_key %></div>'),
			model: elements['model'],

		});

		elements.el.setAttributes({

			"font": "tahoma",
			"bg": "green",
			"style": 'font-family: "sans-serif";',

		});

		assert.deepEqual(karmaBuilder.karmaModels.where({'element_key': 10})[0].attributes, {
			"element_key": 10,
			"shortcode_name": "shortcode_test",
			"parent_key": 0,
			"order": 1,
			"shortcode_attributes": {
				"color": "red",
				"font": "tahoma",
				"bg": "green",
				"changed": {
					"bg": "green",
					"font": "tahoma",
					"style": "font-family: \"sans-serif\";"
				},
				"style": 'font-family: "sans-serif";',
				"radius": '18',
				"title": 'this is a " title " ',
				"sub_title": "this is a subtitle's test"
			},
			"shortcode_content": ""
		});
		karmaBuilder.karmaModels.reset();

	});

	QUnit.done(function( details ) {

		var text = details.failed,
			resultNode = document.createElement( 'div' );

		resultNode.innerText = text;
		resultNode.setAttribute('class', 'karma-final-test-result');
		window.top.document.body.appendChild( resultNode );

	});
} )( jQuery, karmaBuilder );

window.onload = function () {
	
}