QUnit.test('karmaCreateModel',function (assert) {


    var kamraModelResult = {
        1 : {
            type : 'shortcode_test',
            parentId : '0',
            attr : 'color:\'red\' font:\'arial\' bg:\'#000fff\' '

        }

    }

    var model = {type : 'shortcode_test', parentId : '0', attr : 'color:\'red\' font:\'arial\' bg:\'#000fff\''};

	var builder = new karmaBuilder();

    assert.ok(builder.createShortcode(model),kamraModelResult)
})