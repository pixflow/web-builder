QUnit.test("parseAttribute", function( assert ) {
    assert.equal(parseAttribute( {'title':'this is a test'}, 'title' ), 'this is a test');
});

QUnit.test("removeFirstChr", function (assert) {
    assert.equal(removeFirstChr("ermia"),"rmia");
});