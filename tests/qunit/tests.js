var builder = new karmaBuilder();
QUnit.test('karmaCreateModel',function (assert) {

    var kamraModelResult = {
        1 : {
            type : 'shortcode_test',
            parentId : '0',
            attr : 'color:\'red\' font:\'arial\' bg:\'#000fff\''

        }
    }

    var model = {type : 'shortcode_test', parentId : '0', attr : 'color:\'red\' font:\'arial\' bg:\'#000fff\''};
    assert.deepEqual(builder.createShortcode(model),kamraModelResult);

});

//delete test
QUnit.test("karmaDeleteModel",function (assert) {

    var karmaDeleteResult = {
        1 : {
            type : 'shortcode_test',
            parentId : '0',
            attr : 'color:\'red\' font:\'arial\' bg:\'#000fff\''
        }
    };
    builder.karmaModel = {
        1 : {
            type : 'shortcode_test',
            parentId : '0',
            attr : 'color:\'red\' font:\'arial\' bg:\'#000fff\''
        },
       2 : {
           type : 'shortcode_test',
           parentId : '0',
           attr : 'color:\'red\' font:\'arial\' bg:\'#000fff\''
        }
    }

    assert.deepEqual( builder.deleteShortcode( 2 ),karmaDeleteResult );
});


QUnit.test( "karmaSaveContent", function ( assert ) {

	assert.deepEqual( builder.saveContent(),true);

});